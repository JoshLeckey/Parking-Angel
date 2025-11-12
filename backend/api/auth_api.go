package api

import (
	"backend/storage"
	"backend/types"
	"backend/util"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

type AuthAPI struct {
	store storage.MongoStorage
}

func (s *AuthAPI) RegisterRoutes(mainRouter *mux.Router, protectedRouter *mux.Router) {
	mainRouter.HandleFunc("/register", util.MakeHttpHandleFunc(s.handleUserCreate)).Methods("POST")
	mainRouter.HandleFunc("/login", util.MakeHttpHandleFunc(s.handleUserLogin)).Methods("POST")
	mainRouter.HandleFunc("/forgotpassword", util.MakeHttpHandleFunc(s.handleForgotPassword)).Methods("POST")
	mainRouter.HandleFunc("/forgotpassword/token", util.MakeHttpHandleFunc(s.handleResetKeyValidation)).Methods("POST")
	mainRouter.HandleFunc("/forgotpassword/reset", util.MakeHttpHandleFunc(s.handlePasswordReset)).Methods("POST")
}

func (s *AuthAPI) handleUserCreate(w http.ResponseWriter, r *http.Request) error {
	var user types.User
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	if util.CheckError(err, "error occurred while decoding json from body") != nil {
		return err
	}

	// Validate the user struct
	err = util.ValidateUser(&user)
	if util.CheckError(err, "error occurred while validating user info") != nil {
		return err
	}

	// Hash the user's password
	hashedPassword, err := util.HashPassword(user.Password)
	if util.CheckError(err, "error occurred while hashing password") != nil {
		return err
	}
	user.Password = hashedPassword

	//Create User
	err = s.store.CreateUser(&user)
	if util.CheckError(err, "error occurred while saving to storage") != nil {
		return err
	}
	util.WriteJSON(w, http.StatusCreated, user)
	return nil
}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (s *AuthAPI) handleUserLogin(w http.ResponseWriter, r *http.Request) error {
	var loginReq loginRequest
	err := json.NewDecoder(r.Body).Decode(&loginReq)
	if util.CheckError(err, "Username or password not provided") != nil {
		return err
	}

	user, err := s.store.GetUserByName(loginReq.Username)
	if util.CheckError(err, "User not found when logging in") != nil {
		return err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginReq.Password)); err != nil {
		return errors.New("password not matching")
		//w.WriteHeader(status)
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"exp":      time.Now().Add(time.Minute * 1000).Unix(), // 1000 minutes token expiration for now
	})
	secret := os.Getenv("AUTH0_SECRET")
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return err
	}

	util.WriteJSON(w, http.StatusOK, map[string]string{"token": tokenString})
	return nil
}

type forgotPasswordRequest struct {
	Username string `json:"username"`
}

type resetPasswordRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	ResetKey string `json:"token"`
}

type resetKeyRequest struct {
	ResetKey string `json:"token"`
	Username string `json:"username"`
}

func (s *AuthAPI) handleResetKeyValidation(w http.ResponseWriter, r *http.Request) error {
	var resetKeyRequest resetKeyRequest
	err := json.NewDecoder(r.Body).Decode(&resetKeyRequest)
	if util.CheckError(err, "No Token provided") != nil {
		return err
	}
	//Checking if the key exists. if no error then return nil (nil == success)
	if err := s.store.CheckResetKey(resetKeyRequest.ResetKey, resetKeyRequest.Username, "NaN"); err != nil {
		return err
	}
	util.WriteJSON(w, http.StatusOK, map[string]string{"message": "Token validated"})
	return nil
}

func (s *AuthAPI) handlePasswordReset(w http.ResponseWriter, r *http.Request) error {
	var resetPasswordRequest resetPasswordRequest
	err := json.NewDecoder(r.Body).Decode(&resetPasswordRequest)
	if util.CheckError(err, "Username not provided") != nil {
		return err
	}
	if util.CheckError(err, "No Password Provided") != nil {
		return err
	}
	resetPasswordRequest.Password, err = util.HashPassword(resetPasswordRequest.Password)
	if util.CheckError(err, "error occurred while hashing password") != nil {
		return err
	}
	if err := s.store.StoreNewPassword(resetPasswordRequest.Username, resetPasswordRequest.Password, resetPasswordRequest.ResetKey); err != nil {
		return err
	}
	util.WriteJSON(w, http.StatusOK, map[string]string{"message": "Password reset successful"})
	return nil
}

func (s *AuthAPI) handleForgotPassword(w http.ResponseWriter, r *http.Request) error {
	var forgotPasswordReq forgotPasswordRequest
	err := json.NewDecoder(r.Body).Decode(&forgotPasswordReq)
	if util.CheckError(err, "Username not provided") != nil {
		return err
	}

	user, err := s.store.GetUserByName(forgotPasswordReq.Username)
	if util.CheckError(err, "User not found") != nil {
		return err
	}

	resetKey := util.GenerateResetKey()
	err = s.store.StoreResetKey(user.Username, resetKey, user.Email)
	if util.CheckError(err, "Error occurred while storing reset key") != nil {
		return err
	}

	err = util.SendEmail(user.Email, "Password Reset", "<H1> Parking Angel </h1> <br><h2>Password Reset</h2><br> Hi "+forgotPasswordReq.Username+" <br> We have recieved a request to reset the password for your account. <br> <br> Your code to reset your password is <br> <br> <h2>"+resetKey+"</h2> <br><br>Thank you the parking angel team. <h3> Parking Angel </h3>")
	if util.CheckError(err, "Error occurred while sending email") != nil {
		return err
	}

	util.WriteJSON(w, http.StatusOK, map[string]string{"message": "Reset key has been sent to your email address"})
	return nil
}
