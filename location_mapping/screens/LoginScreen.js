import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, Button, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseFirestore';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();

  // useEffect(() => {
  //   // const unsubscribe = auth.onAuthStateChanged(user => {
  //   //   if (user) {
  //   //     navigation.replace("MappedLocations")
  //   //   }
  //   // })

  //   // return unsubscribe;
  //   if(isSignIn) {
  //     navigation.replace("MappedLocations");
  //   }
  // }, []);

  const handleSignUp = () => {
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    if(password.length < 8) {
      setPasswordError('Password cannot be less than 8 characters');
    } else if(!passwordRegex.test(password)) {
      setPasswordError('Password should contain altleast 1 uppercase and 1 digit');
    }  
    else {
      setPasswordError('');
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          setPasswordError('Account created. Please log in now');
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setPasswordError('Email already in use');
      });
    }
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('Signed in with:', user.email);    
        navigation.replace("MappedLocations");
      })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setPasswordError('Wrong Email or Password');
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Text style={{color: 'red'}}>{emailError}</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text style={{color: 'red'}}>{passwordError}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
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
})

export default LoginScreen

