import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { auth, db } from '../firebaseFirestore';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import SavedLocation from './SavedLocation';
import { IconButton, Colors } from 'react-native-paper';

const MappedLocationsScreen = () => {
    const [locationDetails, setLocationDetails] = useState([]);

    useEffect(() => {
      const q = query(collection(db, "location"), where("userID", "==", auth.currentUser.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let locationData = [];
          querySnapshot.forEach((doc) => {
              let data = {};
              data = doc.data();
              data['docID'] = doc.id;
              locationData.push(data);
          });

          setLocationDetails(locationData);
      });

      return () => {
          unsubscribe();
      }
  }, [])

    const navigation = useNavigation();

    const handleCreateLocation = () => {
        navigation.replace("LocationMapping")
    }

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleCreateLocation}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Create Location</Text>
            </TouchableOpacity>
        </View>
        <View>
          {locationDetails.map((location) => 
            <SavedLocation locationDetails={location} />)}
        </View>
      </View>
    )   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    buttonContainer: {
      width: '50%',
      marginTop: 40,
    },
    button: {
      backgroundColor: 'black',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  })

export default MappedLocationsScreen;