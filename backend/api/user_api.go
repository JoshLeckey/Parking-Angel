package api

import (
	"backend/storage"

	"github.com/gorilla/mux"
)

type UserAPI struct {
	store storage.MongoStorage
}

func (s *UserAPI) RegisterRoutes(router *mux.Router) {

}
