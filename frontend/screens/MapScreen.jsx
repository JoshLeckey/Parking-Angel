import React, { useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MapComponent from "../components/MapComponent";
import SearchComponent from "../components/SearchComponent";
import ContributeComponent from "../components/ContributeComponent";
import DetailsComponent from "../components/DetailsComponent";
import NavigationToggleButton from '../components/misc_components/NavigationToggleButton';

const OverlayComponent = ({ activeOverlay }) => {
  switch (activeOverlay) {
    case 'Search':
      return <SearchComponent />;
    case 'Contribute':
      return <ContributeComponent />;
    case 'Details':
      return <DetailsComponent />;
    default:
      return null; // No overlay  
  }
};

const MapScreenComponent = () => {
  const [activeOverlay, setActiveOverlay] = useState('');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showParkingPoints, setShowParkingPoints] = useState(false);

  // Function to handle the toggling of overlays
  const handleOverlayToggle = (overlayName) => {
    // If the same button is pressed again, close the overlay, otherwise open the new one
    setActiveOverlay(activeOverlay === overlayName ? '' : overlayName);
  };
  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
  };

  const toggleParkingPoints = () => {
    setShowParkingPoints(!showParkingPoints);
  };

  //TODO: create global stylesheet
  return (
    <View style={styles.container}>

      <MapComponent showHeatmap={showHeatmap} showParkingPoints={showParkingPoints} />
      <View style={[styles.overlay, activeOverlay ? styles.overlayVisible : {}]}>
        <OverlayComponent activeOverlay={activeOverlay} />
      </View>
      <View style={styles.bottomBar}>
        <NavigationToggleButton iconName='home-outline' label='Home' onPress={() => handleOverlayToggle('')} />
        <NavigationToggleButton iconName='search-outline' label='Search' onPress={() => handleOverlayToggle('Search')} />
        <NavigationToggleButton iconName='add-circle-outline' label='Contribute' onPress={() => handleOverlayToggle('Contribute')} />
        <NavigationToggleButton iconName='information-circle-outline' label='Details' onPress={() => handleOverlayToggle('Details')} />
      </View>
      <View style={styles.windowPanel}>
        <TouchableOpacity style={styles.panelButton} onPress={toggleHeatmap}>
          <Text>Toggle Heatmap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={toggleParkingPoints}>
          <Text>Toggle Parking Points</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function MapScreen() {
  return (
      <MapScreenComponent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0, // Adjust this value as needed
    left: 0,
    right: 0,
    zIndex: 10, // Makes sure the overlay is above other components
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
  },
  overlayVisible: {
    // Make sure the overlay is visible when activeOverlay is set
    display: 'flex',
  },
  windowPanel: {
    position: 'absolute',
    top: 50, // Adjust position as needed
    right: 10,
    zIndex: 10000,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
  },
  panelButton: {
    marginVertical: 5,
  }
});
