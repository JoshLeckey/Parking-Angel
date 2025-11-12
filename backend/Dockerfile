FROM golang:1.21.4
WORKDIR /app
COPY api/ api/
COPY  storage/ storage/
COPY types/ types/
COPY util/ util/
COPY .env go.mod go.sum main.go ./
RUN go mod download
CMD ["go","run","main.go"]
