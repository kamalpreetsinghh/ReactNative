import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signOut, deleteUser } from "firebase/auth";
import { collection, query, where, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from '../firebase';

const ProfileScreen = ({navigation}) => {
    const [profileDetails, setProfileDetails] = useState('');
    useEffect(() => {
        const q = query(collection(db, "users"), where("userID", "==", auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let profileData = [];
            querySnapshot.forEach((doc) => {
                let data = {};
                data = doc.data();
                data['docID'] = doc.id;
                console.log(data);
                profileData.push(data);
            });

            setProfileDetails(profileData[0]);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Signout successfully');
            navigation.navigate('Login');
          }).catch((error) => {
            console.log('Signout Failed');
          });
    }

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account', 
            'Are you sure you want to delete your account?', 
            [
                {
                    text: 'Cancel', 
                    onPress: console.log('cancel Pressed'),
                    style: "cancel"
                },
                {
                    text: 'Ok',
                    onPress: () => deleteAccount()
                }
            ]
        );
    }

    const deleteAccount = () => {
        deleteUser(auth.currentUser).then(() => {
            Alert.alert('Account Deleted', '', () => navigation.navigate('Login'));
            // navigation.navigate('Login');
        }).catch((error) => {
            Alert.alert(error);
        });
    }

    const handleUpdateAccount = () => {
        console.log('Handle Update Screen');
        navigation.navigate('UpdateProfile', {
            profileDetails: profileDetails
        });
    }

    return(
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/man.png')}
                style={styles.imageSize} 
                />
            <View>
                <Text style={[styles.profileInfoStyle, styles.greyText]}>Account Details</Text>
                <Text style={styles.profileInfoStyle}>Name: {profileDetails['firstName']} {profileDetails['lastName']}</Text>
                <Text style={styles.profileInfoStyle}>Email: {profileDetails['email']}</Text>
                <Text style={styles.profileInfoStyle}>Contact Number: {profileDetails['contact']}</Text>
                <Text style={styles.profileInfoStyle}>Address: {profileDetails['address']}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={[styles.button, styles.buttonBlack]}
                >
                <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleUpdateAccount}
                    style={[styles.button, styles.buttonGreen]}
                >
                <Text style={styles.buttonText}>Update Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleDeleteAccount}
                    style={[styles.button, styles.buttonRed]}
                >
                <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
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
    buttonContainer: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    imageSize: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 40
    },
    buttonBlack: {
        backgroundColor: 'black'
    },
    buttonRed: {
        backgroundColor: 'red'
    },
    buttonGreen: {
        backgroundColor: 'green'
    },
    profileInfoStyle: {
        fontSize: 16,
        marginBottom: 20,
        fontWeight: '700',
    }
    ,greyText: {
        color: 'gray'
    }
  })
  

export default ProfileScreen;