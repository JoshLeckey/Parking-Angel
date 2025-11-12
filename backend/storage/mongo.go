package storage

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoStorage struct {
	db mongo.Database
}

func NewMongoStore(connUri string) (*MongoStorage, error) {
	// Set client options
	clientOptions := options.Client().ApplyURI(connUri)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		return nil, err
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		return nil, err
	}

	log.Println("Connected to MongoDB!")
	return &MongoStorage{
		db: *client.Database("golangAPI"),
	}, nil
}
