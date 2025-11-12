package api

import (
	"backend/storage"
	"errors"
	"log"
	"net/http"
	"os"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/form3tech-oss/jwt-go"
	"github.com/gorilla/mux"
)

type APIServer struct {
	listenAddr  string
	store       storage.MongoStorage
	authAPI     *AuthAPI
	userAPI     *UserAPI
	parkingAPI  *ParkingAPI
	externalAPI *ExternalAPI
	crimeAPI    *CrimeAPI
}

func NewApiServer(listenAddr string, store storage.MongoStorage) *APIServer {
	return &APIServer{
		listenAddr:  listenAddr,
		store:       store,
		authAPI:     &AuthAPI{store: store},
		userAPI:     &UserAPI{store: store},
		parkingAPI:  &ParkingAPI{store: store},
		externalAPI: &ExternalAPI{store: store},
		crimeAPI:    &CrimeAPI{store: store},
	}
}

func (s *APIServer) Run() {
	// Main router for the API
	mainRouter := mux.NewRouter()

	// Router for routes that require JWT authentication
	protectedRouter := mainRouter.PathPrefix("/").Subrouter()
	s.RegisterMiddleware(protectedRouter)

	mainRouter.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		writer.Write([]byte("welcome to the Backend"))
	}).Methods("GET")
	//Example of locked vs unlocked pathing:
	mainRouter.HandleFunc("/stuff", func(writer http.ResponseWriter, request *http.Request) {
		writer.Write([]byte("stuff path"))
	}).Methods("GET")

	protectedRouter.HandleFunc("/stuff/locked", func(writer http.ResponseWriter, request *http.Request) {
		writer.Write([]byte("locked path"))
	}).Methods("GET")

	s.authAPI.RegisterRoutes(mainRouter, protectedRouter)
	s.userAPI.RegisterRoutes(mainRouter)
	s.externalAPI.RegisterRoutes(mainRouter)

	s.parkingAPI.Start(mainRouter)
	s.crimeAPI.Start(mainRouter)

	log.Println("API running on port: ", s.listenAddr)
	http.ListenAndServe(s.listenAddr, mainRouter)
}

// jwtMiddleware function creates a new JWT middleware to verify JWT tokens.
func jwtMiddleware() *jwtmiddleware.JWTMiddleware {
	return jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			// Check the signing method
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("Unexpected signing method")
			}

			// Use the same secret as when you created the token
			secret := os.Getenv("AUTH0_SECRET")
			return []byte(secret), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})
}

// RegisterMiddleware function registers the JWT middleware to protect your routes.
func (s *APIServer) RegisterMiddleware(router *mux.Router) {
	router.Use(jwtMiddleware().Handler)
}
