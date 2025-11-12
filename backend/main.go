package main

import (
	"backend/api"
	"backend/storage"
	"log"
	"os"

	//this is our router system :
	"github.com/joho/godotenv"
)

func main() {
	/*r := mux.NewRouter().StrictSlash(true)
	//configs.ConnectDB()
	routes.UserRoute(r)

	http.ListenAndServe(":8080", r)*/
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file", err.Error())
	}

	dbUri := os.Getenv("MONGOURI")
	port := os.Getenv("PORT")

	log.Println("dbUri: ", dbUri)
	mongo, err := storage.NewMongoStore(dbUri)
	if err != nil {
		log.Fatal(err)
	}

	server := api.NewApiServer(":"+port, *mongo)
	server.Run()

}
