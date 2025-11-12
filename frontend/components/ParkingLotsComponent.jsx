import React, { useState } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const ParkingPointsComponent = ({ data }) => {
  const [selectedAnnotation, setSelectedAnnotation] = useState(null); // State to keep track of the selected annotation
  const handleAnnotationSelect = (index) => {
    setSelectedAnnotation(index);
  };

  return (
    data.features.map((feature, index) => (
      <MapboxGL.PointAnnotation
        key={index}
        id={`pointAnnotation${index}`}
        coordinate={feature.geometry.coordinates}
        onSelected={() => handleAnnotationSelect(index)}
      >
        {selectedAnnotation !== null && <MapboxGL.Callout style={styles.calloutContent}>
          <View>
            <Text>Parking</Text>
            <Text>Location: {data.features[selectedAnnotation].geometry.location}</Text>
            <Text>Longitude: {data.features[selectedAnnotation].geometry.coordinates[0]}</Text>
            <Text>Latitude: {data.features[selectedAnnotation].geometry.coordinates[1]}</Text>
          </View>
        </MapboxGL.Callout>}
      </MapboxGL.PointAnnotation>
    ))
  );
};

const styles = StyleSheet.create({
  calloutContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  }
});

export default ParkingPointsComponent;