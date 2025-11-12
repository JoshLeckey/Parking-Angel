# Parking Angel

Parking Angel is a mobile app designed for those who experience "parking anxiety" when parking in cities or places they are not familiar with, giving them the options of safe and secure parking, wherever they may be. Using statistics and data to provide users with safety related data to make informed parking decisions.

## Contents

1.  [Features](#features)
2.  [Requirements](#requirements)
3.  [Setup](#setup)
4.  [Build and Run](#build-and-run)
5.  [License](#license)

## Features

* 📍 Parking location markers
* 🗺️ List of available/nearby parking locations
* 🚨 Vehicle crime heatmap overlay
* ⭐ Favourites list for saved parking locations
* ℹ️ Website, Phone and Directions for parking locations
* 📝 User reporting, allows users to add markers were an incident occurred

## Requirements

You will need the following dependencies to build and run the app:

* [Node.js](https://nodejs.org/)
* [Java SE Development Kit](https://www.oracle.com/java/technologies/javase-downloads.html) (Android Only)
* [Android Studio](https://developer.android.com/studio) (Android Only)
* [Xcode](https://developer.apple.com/xcode/) (iOS only)

*Note: React Native only [supports](https://reactnative.dev/docs/environment-setup) building for iOS on MacOS*

### Optional - (Running backend locally)

* [Go](https://go.dev/)

---

## Setup

Once you have installed the [required dependencies](#requirements), you can go ahead and install and set up the project.

1.  Clone this repo by running:
    ```sh
    git clone [https://github.com/JoshLeckey/Parking-Angel.git](https://github.com/JoshLeckey/Parking-Angel.git)
    ```
2.  Navigate to the frontend directory:
    ```sh
    cd Parking-Angel/frontend
    ```
3.  Run `npm install` to install the Node.js packages. This may take a few seconds.
4.  Create a `.env` file in the `/frontend` directory and add the following:

    ```.env
    MAPBOX_TOKEN=<REPLACE WITH MAPBOX SECRET KEY>
    
    # This URL points to the hosted backend.
    # If running the backend locally, change this to http://localhost:8080
    BACKEND=http://yourserver.com
    ```

### OPTIONAL - Running Backend Locally

The backend is currently being hosted externally, but you can also host a local instance for the backend and route the app to use it instead. This is a more complex process and will require you to have installed [Go](https://go.dev/).

1.  First, create a `.env` file inside the backend directory (`/backend/.env`).

2.  Add the following variables, filling in your local database details. (This project uses **PostgreSQL**).

    ```.env
    # .env file for backend
    
    # --- Database Connection (PostgreSQL) ---
    DB_USER=your_postgres_username
    DB_PASS=your_secret_password
    DB_NAME=your_database_name
    DB_HOST=localhost
    DB_PORT=5432
    
    # --- Server ---
    PORT=8080
    ```

3.  From the `/backend` directory, run the server:
    ```sh
    go run .
    ```
4.  Finally, you **must** update the `BACKEND` variable in your `/frontend/.env` file to point to your local server:
    ```.env
    # In /frontend/.env
    BACKEND=http://localhost:8080
    ```

---

## Build and Run

To build and run the app in an emulator, simply run `npm start` in the `frontend` directory. This should bring up metro; simply enter `a` if your running an android emulator or `i` for an iOS emulator. Note that to do this, you must have either Android Studio or Xcode installed correctly. This may take a few minutes while the app builds and launches.

### Physical Device (Android Only)

If you want to launch the app on a physical android device, first you must enable the **Developer options** in the physical device's settings. Once enabled you will need to enable **USB Debugging**. Once this is done, connect the device to your machine via USB.

Once this is done, simply connect the device to your machine via USB and run `npm start` and enter `a` to launch on your android device. This may take a few minutes while the app builds and installs on the device.

## License

Parking Angel is [MIT licensed](https://opensource.org/licenses/MIT).
