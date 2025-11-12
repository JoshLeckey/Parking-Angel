package storage

import (
	"backend/types"
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func (s *MongoStorage) CreateUser(user *types.User) error {
	collection := s.db.Collection("users")
	insertResult, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		return err
	}

	log.Println("Inserted a new User with ID : ", insertResult)
	return nil

}

func (s *MongoStorage) GetUserByName(username string) (*types.User, error) {
	collection := s.db.Collection("users")

	// Create a filter to query the collection
	filter := bson.M{"username": username}

	// Create a User instance to store the result
	var result types.User

	// Query the collection
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		// Username not found
		if err == mongo.ErrNoDocuments {
			return nil, err
		}
		// other errors
		return nil, err
	}

	return &result, nil
}

func (s *MongoStorage) StoreResetKey(username string, resetKey string, email string) error {
	collection := s.db.Collection("resetTokens")
	newToken := types.Password{
		Token:     resetKey,
		CreatedAt: time.Now().String(),
		Email:     email,
		Username:  username,
	}

	_, err := collection.InsertOne(context.Background(), newToken)
	if err != nil {
		log.Printf("Error inserting new token: %v\n", err)
		return err
	}

	return nil
}

func (s *MongoStorage) StoreNewPassword(username string, newpass string, token string) error {
	//hoping to delete this line below. double execution
	err := s.CheckResetKey(token, username, "del")
	if err != nil {
		return err
	}
	//Selecting the user collection
	collection := s.db.Collection("users")
	//creating a filter to select the correct user
	filter := bson.M{"username": username}
	//Update query
	update := bson.M{"$set": bson.M{"password": newpass}}
	//updating the selected item using the update query
	_, errr := collection.UpdateOne(context.TODO(), filter, update)
	//error checking
	if errr != nil {
		return err
	}
	return nil
}

func (s *MongoStorage) CheckResetKey(resetkey string, username string, command string) error {
	//selecing the resetToken Selection
	collection := s.db.Collection("resetTokens")
	filter := bson.M{"token": resetkey, "username": username}
	var results types.Password
	//Quering the collection
	err := collection.FindOne(context.TODO(), filter).Decode(&results)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return err
		}
		return err
	}
	//removing the token from the database if command = del
	if command == "del" {
		_, err := collection.DeleteOne(context.TODO(), filter)
		if err != nil {
			return err
		}
	}
	return nil
}
