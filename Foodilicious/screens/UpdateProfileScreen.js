import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

const UpdateProfileScreen = ({route, navigation}) => {
    const { profileDetails } = route.params;
    const [firstName, setFirstName] = useState(profileDetails['firstName']);
    const [lastName, setLastName] = useState(profileDetails['lastName']);
    const [contact, setContact] = useState(profileDetails['contact']);
    const [address, setAddress] = useState(profileDetails['address']);
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [contactError, setContactError] = useState('');
    const [addressError, setAddressError] = useState('');

    useEffect(() => {
        clearErrorMessages();
    }, []);

    const handleUpdateAccount = () => {
        Alert.alert(
            'Update', 
            'Are you sure you want to update your account?', 
            [
                {
                    text: 'Cancel', 
                    onPress: () => console.log('Cancel Pressed'),
                    style: "cancel"
                },
                {
                    text: 'Ok',
                    onPress: () => updateAccount()
                }
            ]
        );
    }

    const updateAccount = () => {
        if(validateAccountDetails()) {
            const updateDocRef = doc(db, "users", profileDetails['docID']);
                updateDoc(updateDocRef, {
                firstName: firstName,
                lastName: lastName,
                contact: contact,
                address: address,
            }).then(() => {
                Alert.alert('Account Updated', '', ()=> {
                    navigation.goBack();
                });
            }).catch((error) => {
                console.log(`UpdateProfileScreen: ${error}`);
            });
        }        
    }

    const validateAccountDetails = () => {
        let isValidAccountDetails = true;
        clearErrorMessages();

        if(firstName.length == 0) {
            setFirstNameError('First Name cannot be blank');
            isValidAccountDetails = false;
        }

        if(lastName.length == 0) {
            setLastNameError('First Name cannot be blank');
            isValidAccountDetails = false;
        }

        if(contact.length == 0) {
            setContactError('Contact cannot be blank');
            isValidAccountDetails = false;
        }

        if(address.length == 0) {
            setAddressError('Address cannot be blank');
            isValidAccountDetails = false;
        }

        return isValidAccountDetails;
    }

    const clearErrorMessages = () => {
        setFirstNameError('');
        setLastNameError('');
        setContactError('');
        setAddressError('');
    }

    const handleCancelUpdate = () => {
        Alert.alert(
            'Cancel', 
            'Are you sure you want to cancel update account?', 
            [
                {
                    text: 'Cancel', 
                    onPress: () => console.log('Cancel Pressed'),
                    style: "cancel"
                },
                {
                    text: 'Ok',
                    onPress: () => navigation.goBack()
                }
            ]
        );
    }

    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    style={styles.input}
                />
                <Text style={{color: 'red'}}>{firstNameError}</Text>
                <TextInput
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                    style={styles.input}
                />
                <Text style={{color: 'red'}}>{lastNameError}</Text>
                <TextInput
                    placeholder="Contact Number"
                    value={contact}
                    onChangeText={text => setContact(text)}
                    style={styles.input}
                />
                <Text style={{color: 'red'}}>{contactError}</Text>
                <TextInput
                    placeholder="Address"
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={styles.input}
                />
                <Text style={{color: 'red'}}>{addressError}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleUpdateAccount}
                    style={[styles.button, styles.buttonBlack]}
                >
                <Text style={styles.buttonText}>Update Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleCancelUpdate}
                    style={[styles.button, styles.buttonRed]}
                >
                <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(229,229,234)'
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
    buttonBlack: {
        backgroundColor: 'black'
    },
    buttonRed: {
        backgroundColor: 'red'
    }
  });

export default UpdateProfileScreen;