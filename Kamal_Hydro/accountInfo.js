import React from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from "react";

const AccountInfo = (props) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountAddress, setAccountAddress] = useState('');

    let newAccountInfo = {
        accountNumber: accountNumber,
        accountName: accountName,
        accountAddress: accountAddress
    }

    return(
        <View>
            <Text>Account Info</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Account Number"
                keyboardType="numeric"
                onChangeText={setAccountNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Account Holder's Name"
                onChangeText={setAccountName}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Address"
                onChangeText={setAccountAddress}
            />
            <View>
                <Button
                    title="Save Account Info"
                    onPress={() => Alert.alert('Account Info Saved')}
                />
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderColor: 'red',
      padding: 10,
    },
  });

export { AccountInfo }