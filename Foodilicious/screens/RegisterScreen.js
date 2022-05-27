import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import * as Location from 'expo-location';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [contactError, setContactError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        GetCurrentLocation();
    }, []);

    const handleCreateAccount = () => {
        if(validateAccountDetails()) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const docRef = addDoc(collection(db, "users"), {
                    firstName: firstName,
                    lastName: lastName,
                    contact: contact,
                    address: address,
                    email: email,
                    userID: auth.currentUser.uid
                }).then(() => {
                Alert.alert(
                    'Account Created', 
                    'Please login now', 
                    [
                        {
                            text: 'OK', 
                            onPress: () => navigation.navigate('Login')}
                    ]);
                });
            })
            .catch((error) => {
                console.log(`RegisterScreen: ${error}`);
                setPasswordError('Email already in use');
            });
        }
    }

    const validateAccountDetails = () => {
        let isValidAccountDetails = true;
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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

        if(!emailRegex.test(email)) {
            setEmailError('Invalid Email Address');
            isValidAccountDetails = false;
        }

        if(!passwordRegex.test(password)) {
            setPasswordError('Password should contain altleast 1 uppercase letter and 1 digit');
            isValidAccountDetails = false;
        } else if (password.length < 8) {
            setPasswordError('Password cannot be less than 8 characters');
            isValidAccountDetails = false;
        }

        return isValidAccountDetails;
    }

    const clearErrorMessages = () => {
        setFirstNameError('');
        setLastNameError('');
        setContactError('');
        setAddressError('');
        setEmailError('');
        setPasswordError('');
    }

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

        let { coords } = await Location.getCurrentPositionAsync();

        if (coords) {
            const { latitude, longitude } = coords;

            const response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                setAddress(address);
            }
    }
  };


    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="First Name"
                placeholderTextColor="#939393" 
                value={firstName}
                onChangeText={text => setFirstName(text)}
                style={styles.input}
            />
            <Text style={styles.errorText}>{firstNameError}</Text>
            <TextInput
                placeholder="Last Name"
                placeholderTextColor="#939393" 
                value={lastName}
                onChangeText={text => setLastName(text)}
                style={styles.input}
            />
            <Text style={styles.errorText}>{lastNameError}</Text>
            <TextInput
                placeholder="Contact Number"
                placeholderTextColor="#939393" 
                value={contact}
                onChangeText={text => setContact(text)}
                style={styles.input}
            />
            <Text style={styles.errorText}>{contactError}</Text>
            <TextInput
                placeholder="Address"
                placeholderTextColor="#939393" 
                value={address}
                onChangeText={text => setAddress(text)}
                style={styles.input}
            />
            <Text style={styles.errorText}>{addressError}</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#939393" 
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <Text style={styles.errorText}>{emailError}</Text>
            <TextInput
                placeholder="Password"
                placeholderTextColor="#939393" 
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
            <Text style={styles.errorText}>{passwordError}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleCreateAccount}
                style={styles.button}
            >
            <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#317873'
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
    errorText: {
        color: '#550202',
        fontSize: 16
      }
})

export default RegisterScreen;