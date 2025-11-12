package api

import (
	"backend/storage"
	"backend/types"
	"backend/util"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"slices"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

type CrimeAPI struct {
	store             storage.MongoStorage
	filePath          string
	crimeData         types.CrimeFile
	outgoingFilePath  string
	outgoingCrimeData types.OutgoingCrimeData
}

func (s *CrimeAPI) Start(router *mux.Router) {
	// read data/crimeDataRaw.json
	s.filePath = "data/crimeData.json"
	fileBytes, _ := s.readCrimeJSON(s.filePath)
	json.Unmarshal(fileBytes, &s.crimeData)

	// read data/crimeData.json
	s.outgoingFilePath = "data/outgoingCrimeData.json"
	outgoingFileBytes, _ := s.readCrimeJSON(s.outgoingFilePath)
	json.Unmarshal(outgoingFileBytes, &s.outgoingCrimeData)

	// pull down and update local copies of our crime data set
	s.updateCrimeDataSet()

	// register api route
	router.HandleFunc("/crime", util.MakeHttpHandleFunc(s.getAllCrimePoints)).Methods("GET")
}

func (s *CrimeAPI) getAllCrimePoints(w http.ResponseWriter, r *http.Request) error {
	// write JSON response
	util.WriteJSON(w, http.StatusCreated, s.outgoingCrimeData)
	return nil
}

func (s *CrimeAPI) readCrimeJSON(name string) ([]byte, error) {
	// create file if it doesn't exist
	if _, err := os.Stat(name); err != nil {
		temp, e := os.Create(name)
		if e != nil {
			log.Fatal(e)
		}
		temp.Close()
		os.WriteFile(name, []byte("{\"last_updated\": \"\", \"missing_months\": [], \"months\":[]}"), 0644)
		fmt.Println("Created " + name)
	}

	// open file
	jsonFile, err := os.Open(name)
	if util.CheckError(err, "error occurred while opening json file") != nil {
		return []byte{}, err
	}

	// read file
	byteValue, err := io.ReadAll(jsonFile)
	if util.CheckError(err, "error occurred while reading json file") != nil {
		return []byte{}, err
	}

	return byteValue, err
}

func (s *CrimeAPI) fetchMonthlyCrimeData(date string) error {
	// url to get vehicle crime data in northern ireland in a given month
	url := "https://data.police.uk/api/crimes-street/vehicle-crime?poly=55.378818,-8.694856:55.128060,-5.675658:53.939770,-5.000217:54.012510,-9.130820&date=" + date

	// make request to external api to update our local crime data files
	response, err := http.Get(url)
	if util.CheckError(err, "error occurred while trying to fetch data for: "+date) != nil {
		return err
	}

	// decode vehicle crime data from given month
	var incomingCrimeList types.IncomingCrimeData
	decoder := json.NewDecoder(response.Body)
	decoder.Decode(&incomingCrimeList)

	if err != nil {
		// if external api doesn't return expected format log message
		s.crimeData.MissingMonths = append(s.crimeData.MissingMonths, date)
		return nil
	}

	// detect if no crime data was found and flag it
	if len(incomingCrimeList) == 0 {
		fmt.Println("No vehicle crime data found on: ", date)

		// add date to missing_months
		if !slices.Contains(s.crimeData.MissingMonths, date) {
			s.crimeData.MissingMonths = append(s.crimeData.MissingMonths, date)
		}
	} else {
		// remove date from missing_months
		if slices.Contains(s.crimeData.MissingMonths, date) {
			for i, v := range s.crimeData.MissingMonths {
				if v == date {
					s.crimeData.MissingMonths = append(s.crimeData.MissingMonths[:i], s.crimeData.MissingMonths[i+1:]...)
					break
				}
			}
		}

		// loop through the elements extracting the coords and mapping them to a valid geoJSON format
		for i := 0; i < len(incomingCrimeList); i++ {
			var point types.CrimePoint

			// get latitude
			var latitude, err1 = strconv.ParseFloat(incomingCrimeList[i].Location.Latitude, 64)
			if err1 != nil {
				log.Fatal(err)
			}

			// get longitude
			var longitude, err2 = strconv.ParseFloat(incomingCrimeList[i].Location.Longitude, 64)
			if err2 != nil {
				log.Fatal(err)
			}

			point.Coordinates = [2]float64{longitude, latitude}
			point.Month = date
			point.Type = "Point"

			// add point to list
			s.crimeData.Months[date] = append(s.crimeData.Months[date], point)
		}
	}

	return err
}

func (s *CrimeAPI) updateCrimeDataSet() error {
	// get the current year and month
	now := time.Now()
	currentYear, currentMonth, _ := now.Date()

	// if map is empty allocate memory
	if s.crimeData.Months == nil {
		s.crimeData.Months = make(map[string][]types.CrimePoint)
	}

	// recheck for missing data from previous fetches
	for i := 0; i < len(s.crimeData.MissingMonths); i++ {
		s.fetchMonthlyCrimeData(s.crimeData.MissingMonths[i])
	}

	months := 24 // default to checking 2 years back
	if s.crimeData.LastUpdated != "" {
		// parse the date string
		lastUpdate, err := time.Parse("2006-01", s.crimeData.LastUpdated)
		if err != nil {
			fmt.Println("Error parsing date:", err)
		}

		// get number of months since last update
		months = (currentYear-lastUpdate.Year())*12 + int(currentMonth-lastUpdate.Month()) + 1
	}

	// loop backwards through each month for the next 5 years
	for i := 0; i < months; i++ {
		// store the current date being checked in a yyyy-mm format
		date := fmt.Sprintf("%d-%02d", currentYear, currentMonth)

		// fetch data for given month
		s.fetchMonthlyCrimeData(date)

		// move to the previous month
		if currentMonth == 1 {
			// if the current month is January, go to December of the previous year
			currentMonth = 12
			currentYear--
		} else {
			// otherwise, go to the previous month of the same year
			currentMonth--
		}
	}

	// update last_updated property
	s.crimeData.LastUpdated = fmt.Sprintf("%d-%02d", now.Year(), int(now.Month()))

	// update the crimeData.json
	localJSON, _ := json.MarshalIndent(s.crimeData, "", " ")
	os.WriteFile(s.filePath, localJSON, 0644)

	// generate the new outgoingCrimeData.json
	s.outgoingCrimeData.LastUpdated = s.crimeData.LastUpdated
	s.outgoingCrimeData.MissingMonths = s.crimeData.MissingMonths
	s.outgoingCrimeData.Data = []types.Feature{}
	for _, v := range s.crimeData.Months {
		for i := 0; i < len(v); i++ {
			s.outgoingCrimeData.Data = append(s.outgoingCrimeData.Data, types.Feature{
				Type:     "Feature",
				Geometry: v[i],
			})
		}
	}
	outgoingJSON, _ := json.MarshalIndent(s.outgoingCrimeData, "", " ")
	os.WriteFile(s.outgoingFilePath, outgoingJSON, 0644)

	fmt.Println("Updated our crime api data sets")
	return nil
}
