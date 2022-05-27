import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const UpdateProfile = ({profileDetails, modalVisible, onHideModal}) => {
    const [firstName, setFirstName] = useState(profileDetails['firstName']);
    const [lastName, setLastName] = useState(profileDetails['lastName']);
    const [contact, setContact] = useState(profileDetails['contact']);
    const [address, setAddress] = useState(profileDetails['address']);
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [contactError, setContactError] = useState('');
    const [addressError, setAddressError] = useState('');

    useEffect(() => {
        console.log(profileDetails);
    }, []);

    const handleUpdateAccount = () => {
        if(validateAccountDetails()) {
            const updateDocRef = doc(db, "users", profileDetails['docID']);
                updateDoc(updateDocRef, {
                firstName: firstName,
                lastName: lastName,
                contact: contact,
                address: address,
            });
        }
        
        onHideModal();
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

    return(
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
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
                        onPress={()=> onHideModal()}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleUpdateAccount}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Update Account</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
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
        backgroundColor: 'black',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },
  });

export default UpdateProfile;