import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Config from 'react-native-config';
import HeatmapComponent from "./HeatmapComponent";
import { fetchHeatmapData, fetchParkingData } from "../clients/MapClient";
import ParkingPointsComponent from "./ParkingLotsComponent";

MapboxGL.setAccessToken(Config.MAPBOX_TOKEN);

const MapComponent = ({ showHeatmap, showParkingPoints }) => {
  const [coordinates,] = useState([-6, 54]);
  const [heatmapData, setHeatmapData] = useState({ "type": "FeatureCollection", "features": [] });
  const [parkingData, setParkingData] = useState({ "type": "FeatureCollection", "features": [] });

  // runs after initial render
  useEffect(() => {
    // get and set heatmap data
    fetchHeatmapData().then(data => setHeatmapData(data));
    // get and set parking data
    fetchParkingData({ lat: 54.589816240139584, long: -5.932722404636753 }).then(data => setParkingData(data));
  }, []);


  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={6}
            centerCoordinate={coordinates} />
          {showParkingPoints && <ParkingPointsComponent data={parkingData} />}
          {showHeatmap && <HeatmapComponent data={heatmapData} />}
        </MapboxGL.MapView>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: '#AAAAAA',
  },
});
export default MapComponent;
