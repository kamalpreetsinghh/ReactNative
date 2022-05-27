import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '../firebaseFirestore';

const LocationMappingScreen = () => {
    const latLongDelta = {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

      const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        ...latLongDelta
      })

      const markers = [{
        latitude: 37.78825,
        longitude: -122.4324,
      }, {
        latitude: 43.6452,
        longitude: -79.3806
      }];

    const navigation = useNavigation();
    const [entryName, setEntryName] = useState('');
    const [location, setUserLocation] = useState();
    const [error, setError] = useState('');
    const [coordinates, setCoordinates] = useState('');
    
    async function GetCurrentLocation () {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission not granted",
                "Allow the app to use location service.",
                [{ text: "OK" }],
                { cancelable: false }
            );
        }

        let { coords, ...others } = await Location.getCurrentPositionAsync();

        if (coords) {
            const { latitude, longitude } = coords;
            setCoordinates({ latitude, longitude });

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            setRegion({
                latitude,
                longitude,
                ...latLongDelta
            })

            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                setUserLocation(address);
            }
    }
  };

  const handleSaveLocation = () => {
    if(entryName.length < 8) {
        setError('Name cannot be less than 8 characters');
    } else {
        setError('');
        const docRef = addDoc(collection(db, "location"), {
            name: entryName,
            userID: auth.currentUser.uid,
            coordinates: coordinates,
            createdAt: new Date().toLocaleString(),
          });
          Alert.alert('Location Saved');
          navigation.replace("MappedLocations");
    }
  }

    return (
        <View style={[styles.container, styles.viewMarginBottom]}>
            
            <View style={[styles.inputContainer]}>
                <TextInput
                    placeholder="Entry Name"
                    value={entryName}
                    onChangeText={text => setEntryName(text)}
                    style={styles.input}
                />
            </View>
            <Text style={{color: 'red'}}>{error}</Text>
            <Text style={styles.textMargin}>{location}</Text>
            <MapView style={styles.map} region={region}>
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    pinColor={"black"}
                >
                <Callout>
                    <Text>{"Hey how are you ?"}</Text>
                </Callout>
                </Marker>
                <Circle center={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                }} radius={1000}>
                </Circle>
            </MapView>
            <View style={[styles.buttonContainer, styles.inputMarginTop]}>
               
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={GetCurrentLocation}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Get Location</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSaveLocation}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Save Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '75%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    map: {
        width: '100%',
        height: '70%',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
      },
      button: {
        backgroundColor: 'black',
        width: '35%',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      viewMarginBottom: {
          marginBottom: '15%'
      },
      textMargin: {
          marginTop: '3%',
          marginBottom: '3%'
      },
      inputMarginTop: {
          marginTop: '4%'
      }
})

export default LocationMappingScreen;