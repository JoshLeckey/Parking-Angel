package types

type IncomingCrimeData []struct {
	Category     string `json:"category"`
	LocationType string `json:"location_type"`
	Location     struct {
		Latitude string `json:"latitude"`
		Street   struct {
			ID   int    `json:"id"`
			Name string `json:"name"`
		} `json:"street"`
		Longitude string `json:"longitude"`
	} `json:"location"`
	Context       string `json:"context"`
	OutcomeStatus struct {
		Category string `json:"category"`
		Date     string `json:"date"`
	} `json:"outcome_status"`
	PersistentID    string `json:"persistent_id"`
	ID              int    `json:"id"`
	LocationSubtype string `json:"location_subtype"`
	Month           string `json:"month"`
}

type CrimeFile struct {
	LastUpdated   string                  `json:"last_updated"`
	MissingMonths []string                `json:"missing_months"`
	Months        map[string][]CrimePoint `json:"months"`
}

type OutgoingCrimeData struct {
	LastUpdated   string    `json:"last_updated"`
	MissingMonths []string  `json:"missing_months"`
	Data          []Feature `json:"data"`
}

type Feature struct {
	Type     string     `json:"type"`
	Geometry CrimePoint `json:"geometry"`
}

type CrimePoint struct {
	Coordinates [2]float64 `json:"coordinates"`
	Month       string     `json:"month"`
	Type        string     `json:"type"`
}
