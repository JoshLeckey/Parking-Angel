package types

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id       primitive.ObjectID `Json:"id,omitempty"`
	Username string             `json:"username,omitempty"`
	Password string             `json:"password,omitempty"`
	Email    string             `json:"email,omitempty"`
}

type Password struct {
	Token     string `json:"token,omitempty"`
	Username  string `json:"username,omitempty"`
	Email     string `json:"email,omitempty"`
	CreatedAt string `json:"createdAt,omitempty"`
}

type UserResponse struct {
	Status  int                    `json:"status"` 
	Message string                 `json:"message"`
	Data    map[string]interface{} `json:"data"`
}
