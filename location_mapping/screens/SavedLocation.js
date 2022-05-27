import { View, Text, StyleSheet } from "react-native"
import { useEffect } from "react";
import { IconButton, Colors } from 'react-native-paper';
import { auth, db } from '../firebaseFirestore';
import { collection, doc, deleteDoc } from "firebase/firestore";

const SavedLocation = ({locationDetails}) => {
    // useEffect(() => {
    //     console.log('Component Did Mount');
    //     console.log(locationDetails);
    // }, []);

    const deleteLocation = async () => {
        await deleteDoc(doc(db,'location', locationDetails['docID']));
    }

    const updateLocation = () => {

    }

    return(
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.boldBigFont}>
                    Name: {locationDetails['name']}
                </Text>
                <Text style={styles.boldBigFont}>
                    Coordinates: latitude: {locationDetails['coordinates']['latitude']}
                </Text>
                <Text style={styles.boldBigFont}>Create At: {locationDetails['createdAt']}</Text>
                
            </View>
            <IconButton style={{justifyContent: 'center'}}
              icon="delete"
              color={Colors.red500}
              size={40}
              onPress={() => deleteLocation()}
            />
            {/* <IconButton style={{justifyContent: 'center'}}
              icon="pencil"
              color={Colors.black}
              size={40}
              onPress={() => updateLocation()}
            /> */}
        </View>
        
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        flexDirection: 'row'
      },
    container: {
      alignItems: 'center',
      backgroundColor: '#e3e6e5',
      marginTop: 20,
      padding: '4%',
      borderRadius: 10,
    },
    boldBigFont: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
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

export default SavedLocation;