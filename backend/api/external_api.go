package api

import (
	"backend/storage"

	"github.com/gorilla/mux"
)

type ExternalAPI struct {
	store storage.MongoStorage
}

func (s *ExternalAPI) RegisterRoutes(router *mux.Router) {

}
