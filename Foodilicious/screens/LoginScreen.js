import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = () => {
    clearFields();
    navigation.navigate('Register');
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log('Signed in with:', userCredential.user.email);   
        clearFields(); 
        navigation.navigate("TabNavigator");
      })
    .catch((error) => {
        const errorMessage = error.message;
        console.log(`LoginScreen: ${errorMessage}`);
        setPasswordError('Wrong Email or Password');
    });
  }

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <Image
        source={require('../assets/foodiliciousIcon.png')}
        style={styles.imageSize} 
        />
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
          onPress={handleLogin}
          style={[styles.button, styles.redButton]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.blackButton]}
        >
          <Text style={styles.buttonText}>Register</Text>
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
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  redButton: {
    backgroundColor: 'red'
  },
  blackButton: {
    backgroundColor: 'black'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  errorText: {
    color: '#550202',
    fontSize: 16
  },
  imageSize: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 40
  }
})

export default LoginScreen

