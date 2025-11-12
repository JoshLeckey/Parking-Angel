package util

import (
	"log"
)

func CheckError(err error, message string) error {
	if err != nil {
		log.Printf("%s: %v", message, err)
		return err
	}
	return nil
}
