import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'; // Import Location module from expo-location
import axios from 'axios';

const Route = () => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [startCoords, setStartCoords] = useState(null); // Lifted state
  const [endCoords, setEndCoords] = useState(null);

  useEffect(() => {
    requestLocationPermission(); // Request location permissions when component mounts
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission denied');
      // Handle permission denied case here
    }
  };

  const calculateDistance = async (startLat, startLng, endLat, endLng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${startLat},${startLng}&destinations=${endLat},${endLng}&key=AIzaSyBpGCBBmtRGOpYgNiaT8JGgoCVbBkDauv4`
      );

      const distance = response.data.rows[0].elements[0].distance.text;
      const duration = response.data.rows[0].elements[0].duration.text;

      return { distance, duration };
    } catch (error) {
      console.error('Error calculating distance:', error);
      return null;
    }
  };

  const handleCalculateDistance = async () => {
    if (startLocation && endLocation) {
      const startResponse = await Location.geocodeAsync(startLocation);
      const endResponse = await Location.geocodeAsync(endLocation);

      if (startResponse.length > 0 && endResponse.length > 0) {
        const startCoords = startResponse[0];
        const endCoords = endResponse[0];

        setStartCoords(startCoords); // Update the lifted state
        setEndCoords(endCoords); // Update the lifted state

        const { distance, duration } = await calculateDistance(
          startCoords.latitude,
          startCoords.longitude,
          endCoords.latitude,
          endCoords.longitude
        );

        if (distance && duration) {
          setDistance(distance);
          setDuration(duration);


        }
      }
    }
    // Inside your handleCalculateDistance function, after setting distance and duration



  };


  return (
    <View style={styles.container}>

      <View style={styles.autocompleteContainer}>
        <GooglePlacesAutocomplete
          placeholder="Start location"
          onPress={(data, details = null) => {
            setStartLocation(data.description);
          }}

          query={{
            key: 'AIzaSyBpGCBBmtRGOpYgNiaT8JGgoCVbBkDauv4',
            language: 'en',
          }}

          styles={{
            textInputContainer: {
              width: Dimensions.get('window').width - 22, // Adjust as needed
              backgroundColor: 'white',
              borderTopWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 50,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: 'red',
            },
          }}
        />



        <GooglePlacesAutocomplete
          placeholder="End location"
          onPress={(data, details = null) => {
            setEndLocation(data.description);
          }}
          query={{
            key: 'AIzaSyBpGCBBmtRGOpYgNiaT8JGgoCVbBkDauv4',
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              width: Dimensions.get('window').width - 22, // Adjust as needed
              backgroundColor: 'white',
              borderTopWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 50,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: 'red',
            },
          }}
        />
      
      <Button title="Calculate Distance" onPress={handleCalculateDistance} />
      
      {distance !== null && (
        <Text>Distance: {distance}</Text>
      )}

      {duration !== null && (
        <Text>Duration: {duration}</Text>
      )}
      
      </View>

      
      <View style={styles.mapContainer}>
        <MapView
          style={{ width: '100%', height: '100%' }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 31.5497,
            longitude: 74.3436,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {startCoords && (
            <Marker
              coordinate={{
                latitude: startCoords.latitude,
                longitude: startCoords.longitude,
              }}
              title="Start Location"
            />
          )}
          {endCoords && (
            <Marker
              coordinate={{
                latitude: endCoords.latitude,
                longitude: endCoords.longitude,
              }}
              title="End Location"
            />
          )}
        </MapView>
        
      </View>
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  mapContainer: {
    flex: 1,
    marginTop: 200,
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent black
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Make sure it's above the overlay
    paddingHorizontal: 16,
    paddingTop: 16, // Adjust as needed
  },

});



export default Route;