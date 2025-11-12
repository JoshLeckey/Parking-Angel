package types

type IncomingParkingData struct {
	Type     string `json:"type"`
	Features []struct {
		Type     string `json:"type"`
		Geometry struct {
			Coordinates []float64 `json:"coordinates"`
			Type        string    `json:"type"`
		} `json:"geometry"`
		Properties struct {
			Name           string `json:"name"`
			MapboxID       string `json:"mapbox_id"`
			FeatureType    string `json:"feature_type"`
			Address        string `json:"address"`
			FullAddress    string `json:"full_address"`
			PlaceFormatted string `json:"place_formatted"`
			Context        struct {
				Country struct {
					Name              string `json:"name"`
					CountryCode       string `json:"country_code"`
					CountryCodeAlpha3 string `json:"country_code_alpha_3"`
				} `json:"country"`
				Postcode struct {
					ID   string `json:"id"`
					Name string `json:"name"`
				} `json:"postcode"`
				Place struct {
					ID   string `json:"id"`
					Name string `json:"name"`
				} `json:"place"`
				Locality struct {
					ID   string `json:"id"`
					Name string `json:"name"`
				} `json:"locality"`
				Address struct {
					Name          string `json:"name"`
					AddressNumber string `json:"address_number"`
					StreetName    string `json:"street_name"`
				} `json:"address"`
				Street struct {
					Name string `json:"name"`
				} `json:"street"`
			} `json:"context"`
			Coordinates struct {
				Latitude       float64 `json:"latitude"`
				Longitude      float64 `json:"longitude"`
				RoutablePoints []struct {
					Name      string  `json:"name"`
					Latitude  float64 `json:"latitude"`
					Longitude float64 `json:"longitude"`
				} `json:"routable_points"`
			} `json:"coordinates"`
			Language       string   `json:"language"`
			Maki           string   `json:"maki"`
			PoiCategory    []string `json:"poi_category"`
			PoiCategoryIds []string `json:"poi_category_ids"`
			ExternalIds    struct {
				Safegraph  string `json:"safegraph"`
				Foursquare string `json:"foursquare"`
			} `json:"external_ids"`
			Metadata struct {
				Phone     string `json:"phone"`
				Website   string `json:"website"`
				OpenHours struct {
					Periods []struct {
						Open struct {
							Day  int    `json:"day"`
							Time string `json:"time"`
						} `json:"open"`
						Close struct {
							Day  int    `json:"day"`
							Time string `json:"time"`
						} `json:"close"`
					} `json:"periods"`
				} `json:"open_hours"`
			} `json:"metadata"`
		} `json:"properties"`
	} `json:"features"`
	Attribution string `json:"attribution"`
}

type OutgoingParkingData []struct {
	Type     string `json:"type"`
	Geometry struct {
		Coordinates []float64 `json:"coordinates"`
		Type        string    `json:"type"`
	} `json:"geometry"`
	Properties struct {
		Name           string `json:"name"`
		MapboxID       string `json:"mapbox_id"`
		FeatureType    string `json:"feature_type"`
		Address        string `json:"address"`
		FullAddress    string `json:"full_address"`
		PlaceFormatted string `json:"place_formatted"`
		Context        struct {
			Country struct {
				Name              string `json:"name"`
				CountryCode       string `json:"country_code"`
				CountryCodeAlpha3 string `json:"country_code_alpha_3"`
			} `json:"country"`
			Postcode struct {
				ID   string `json:"id"`
				Name string `json:"name"`
			} `json:"postcode"`
			Place struct {
				ID   string `json:"id"`
				Name string `json:"name"`
			} `json:"place"`
			Locality struct {
				ID   string `json:"id"`
				Name string `json:"name"`
			} `json:"locality"`
			Address struct {
				Name          string `json:"name"`
				AddressNumber string `json:"address_number"`
				StreetName    string `json:"street_name"`
			} `json:"address"`
			Street struct {
				Name string `json:"name"`
			} `json:"street"`
		} `json:"context"`
		Coordinates struct {
			Latitude       float64 `json:"latitude"`
			Longitude      float64 `json:"longitude"`
			RoutablePoints []struct {
				Name      string  `json:"name"`
				Latitude  float64 `json:"latitude"`
				Longitude float64 `json:"longitude"`
			} `json:"routable_points"`
		} `json:"coordinates"`
		Language       string   `json:"language"`
		Maki           string   `json:"maki"`
		PoiCategory    []string `json:"poi_category"`
		PoiCategoryIds []string `json:"poi_category_ids"`
		ExternalIds    struct {
			Safegraph  string `json:"safegraph"`
			Foursquare string `json:"foursquare"`
		} `json:"external_ids"`
		Metadata struct {
			Phone     string `json:"phone"`
			Website   string `json:"website"`
			OpenHours struct {
				Periods []struct {
					Open struct {
						Day  int    `json:"day"`
						Time string `json:"time"`
					} `json:"open"`
					Close struct {
						Day  int    `json:"day"`
						Time string `json:"time"`
					} `json:"close"`
				} `json:"periods"`
			} `json:"open_hours"`
		} `json:"metadata"`
	} `json:"properties"`
}
