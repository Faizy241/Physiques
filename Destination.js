import { useEffect, useState } from 'react';
import { Image, Button, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, moderateScale } from 'react-native-size-matters';
import { Text } from './TextStyles';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'; // Import Location module from expo-location
import axios from 'axios';
//Width Percentage = (Design Width / Screen Width) * 100
//Width Percentage = (150 / 375) * 100 = 40%

const Destination = () => {
    const froms = ['IteM 1', 'Item 2', 'Item 3', 'Item 4'];
    const destinations = ['Make 1', 'Make 2', 'Make 3', 'Make 4']; // Replace with your own items

    const [isFromOpen, setIsFromOpen] = useState(true);
    const [isDestinationOpen, setIsDestinationOpen] = useState(false);
    const [fromSearchText, setFromSearchText] = useState('');
    const [destinationSearchText, setDestinationSearchText] = useState('');
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);

    const toggleDropdown = (dropdownName) => {
        setIsFromOpen(dropdownName === 'from' ? !isFromOpen : false);
        setIsDestinationOpen(dropdownName === 'destination' ? !isDestinationOpen : false);
        setFromSearchText('');
        setDestinationSearchText('');
    };

    const handleSearch = (text, dropdownName) => {
        if (dropdownName === 'from') {
            setFromSearchText(text);
        } else if (dropdownName === 'destination') {
            setDestinationSearchText(text);
        }
    };

    const handleSelectItem = (item, dropdownName) => {
        if (dropdownName === 'from') {
            setSelectedFrom(item);
        } else if (dropdownName === 'destination') {
            setSelectedDestination(item);
        }
        toggleDropdown(dropdownName);
    };

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
    }




    return (
        
        <View style={styles.container}>



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
   

            <Text style={styles.HeaderText}>Plan journey and estimate fuel costs</Text>

          
            <View style={styles.destination}>
           

                <View style={styles.autocompleteContainer }>

                    <View style={styles.view1}>
                  
                   { /*{(isFromOpen ) && <View style={styles.overlay} />} */}
                   
                   
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
                               
                                marginTop: 0,
                                backgroundColor: 'white',
                                borderWidth: 0,

                                marginBottom: 8,

                            },
                            textInput: {
                                
                                marginLeft: 0,
                                marginRight: 0,
                                height: 37,
                                color: '#5d5d5d',
                                fontSize: 12,

                            },
                            predefinedPlacesDescription: {
                                color: 'red',
                            },
                        }}
                    />

            </View>
           

            

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
                                marginTop: 0,
                                backgroundColor: 'white',
                                borderWidth: 0,
                            },
                            textInput: {

                                marginLeft: 0,
                                marginRight: 0,
                                height: 37,
                                color: '#5d5d5d',
                                fontSize: 12,
                            },
                            predefinedPlacesDescription: {
                                color: 'red',
                            },
                        }}
                    />

                </View>

                <View style={{ flexDirection: 'column' }}>

                    <TouchableOpacity style={[styles.block, { borderBottomWidth: scale(0.5) }]} >
                        <Image style={styles.location}
                            source={require('./assets/images/start-location.png')} />



                    </TouchableOpacity>


                    <TouchableOpacity style={styles.block} >
                        <Image style={styles.location}
                            source={require('./assets/images/destination.png')} />





                    </TouchableOpacity>



                </View>
                <TouchableOpacity>
                    <Image style={styles.arrow}
                        source={require('./assets/images/arrow.png')} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.selectModel}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.carIcon}
                            source={require('./assets/images/car.png')} />
                        <Text style={styles.selectModelText}>Select Model</Text>
                    </View>
                    <Image style={styles.arrowRight}
                        source={require('./assets/images/arrow-left.png')} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.calculateButton} onPress={handleCalculateDistance} >
                <Text style={styles.calculateText}>Calculate</Text>
            </TouchableOpacity>


            {distance !== null && (
        <Text>Distance: {distance}</Text>
      )}

      {duration !== null && (
        <Text>Duration: {duration}</Text>
      )}
      
     





     
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF;',
        marginHorizontal: wp("4.26%"),
    },
    mapContainer: {
        flex: 0.70,
        marginTop: 50,
        backgroundColor:'grreen'
    
        
      },
    HeaderText: {
        fontSize: moderateScale(26),
        lineHeight: moderateScale(36),
        fontFamily: 'Roboto',
        marginTop:30,
        fontWeight: '500',
        color: 'black',
    },
    destination: {
        height: hp("12.31%"),
        width: wp("91.4%"),
        borderWidth: scale(0.5),
        marginTop: hp("2.83%"),
        marginBottom: hp("4.92%"),
        borderColor: '#CBD0D6',
        backgroundColor: 'white',
        borderRadius: scale(10),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      

    },
    block: {
        height: hp("5.8%"),
        width: wp("78.6%"),
        borderColor: '#CBD0D6',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectModel: {
        height: hp("6.15%"),
        width: wp("91.46%"),
        borderColor: '#CBD0D6',
        borderRadius: scale(10),
        borderWidth: scale(0.5),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: hp("2.95%"),
    },
    calculateButton: {
        height: hp("6.77%"),
        width: wp("91.46%"),
        borderRadius: scale(12),
        backgroundColor: '#6FBFC2',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    location: {
        height: hp("2.46%"),
        width: wp("5.33%"),
        borderRadius: scale(100),
        marginRight: wp("2.13%"),
    },
    carIcon: {
        width: wp("5%"),
        height: hp("2.41%"),
        marginLeft: wp('3.26%'),
        marginTop: hp('1.85%'),
    },
    arrow: {
        width: wp("5.53%"),
        height: hp("2.94%"),
        borderRadius: scale(100),
    },
    arrowRight: {
        width: wp("1.52%"),
        height: hp("1.97%"),
        marginTop: hp('2.58%'),
        marginRight: wp('3.27%'),
    },
    selectModelText: {
        fontSize: moderateScale(12),
        lineHeight: moderateScale(19.03),
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#9CA3AF',
        paddingLeft: wp('3.2%'),
        paddingTop: hp('1.81%'),
    },
    locationText: {
        fontSize: moderateScale(12),
        lineHeight: moderateScale(19.03),
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#9CA3AF',
        height: hp("5.8%"),
        width: wp("78.6%"),
    },
    calculateText: {
        fontSize: moderateScale(14),
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
        color: 'white',
    },
    autocompleteContainer: {
       position:'absolute',
        top: 0,
        left: 35,
        right: 35,
        zIndex: 1, // Make sure it's above the overlay
        paddingTop: 0, // Adjust as needed

    },
  
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
    },

});
export default Destination;

//375 width
//812 height