package util

import (
	"backend/types"
	"encoding/base64"
	"math/rand"
	"strconv"
	"time"
)

func ValidateUser(*types.User) error {
	//validation logic etc
	return nil
}
func GenerateResetKey() string {
	rand.Seed(time.Now().UnixNano())
	code := rand.Intn(900000) + 100000
	return strconv.Itoa(code)
}

func GeneratePasswordToken() string {
	key := make([]byte, 32)
	rand.Read(key)
	return base64.URLEncoding.EncodeToString(key)
}
