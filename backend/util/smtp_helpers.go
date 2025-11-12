package util

import (
	"os"
	"strconv"

	"gopkg.in/gomail.v2"
)

func SendEmail(to string, subject string, body string) error {
	from := os.Getenv("SMTP_USERNAME")
	server := os.Getenv("SMTP_SERVER")
	port, _ := strconv.Atoi(os.Getenv("SMTP_PORT"))
	username := os.Getenv("SMTP_USERNAME")
	password := os.Getenv("SMTP_PASSWORD")

	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)

	d := gomail.NewDialer(server, port, username, password)

	err := d.DialAndSend(m)
	if err != nil {
		return err
	}
	return nil
}
