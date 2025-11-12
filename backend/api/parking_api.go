package api

import (
	"backend/storage"
	"backend/types"
	"backend/util"
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

type ParkingAPI struct {
	store                    storage.MongoStorage
	incomingParkingLocations types.IncomingParkingData
}

func (s *ParkingAPI) Start(router *mux.Router) {
	// register api route
	router.HandleFunc("/parking/nearby", util.MakeHttpHandleFunc(s.getNearbyParkingLot)).Methods("GET")
}

func (s *ParkingAPI) getNearbyParkingLot(w http.ResponseWriter, r *http.Request) error {
	latitude := r.URL.Query().Get("latitude")
	longitude := r.URL.Query().Get("longitude")
	radius := r.URL.Query().Get("radius")

	s.fetchParkingLots(latitude, longitude, radius)

	// write JSON response
	util.WriteJSON(w, http.StatusCreated, s.incomingParkingLocations.Features)

	return nil
}

func (s *ParkingAPI) fetchParkingLots(latitude string, longitude string, radius string) error {
	s.incomingParkingLocations = types.IncomingParkingData{}

	// construct url to get parking lot data from mapbox
	baseURL := "https://api.mapbox.com/search/searchbox/v1/category/parking_lot?limit=25"
	url := baseURL + "&proximity=" + longitude + "," + latitude + "&access_token=" + os.Getenv("MAPBOX_TOKEN")

	// make request to mapbox api to get parking lots
	response, err := http.Get(url)
	if util.CheckError(err, "error occurred while trying to fetch data for") != nil {
		return nil
	}

	// decode JSON parking lot data
	decoder := json.NewDecoder(response.Body)
	decoder.Decode(&s.incomingParkingLocations)

	// if radius param is set then filter by radius, otherwise return 25 best results
	if radius != "" {
		// convert request params to 64 bit floats
		currentLong, _ := strconv.ParseFloat(longitude, 64)
		currentLat, _ := strconv.ParseFloat(latitude, 64)
		r, _ := strconv.ParseFloat(radius, 64)
		r /= 1000.0

		// loop through parking lot locations and filter then out if they're outside the radius
		for i := 0; i < len(s.incomingParkingLocations.Features); i++ {
			point := s.incomingParkingLocations.Features[i]
			parkingLong := point.Geometry.Coordinates[0]
			parkingLat := point.Geometry.Coordinates[1]

			if util.DistanceBetween(currentLat, currentLong, parkingLat, parkingLong) > r {
				// remove s.incomingParkingLocations.Features[i] from array
				s.incomingParkingLocations.Features = append(s.incomingParkingLocations.Features[:i], s.incomingParkingLocations.Features[i+1:]...)
				// adjust the loop counter to account for the removed element
				i--
			}
		}
	}

	return nil
}
