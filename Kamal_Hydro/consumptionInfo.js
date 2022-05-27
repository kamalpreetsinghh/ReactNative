import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from "react";

const ConsumptionInfo = (props) => {
    const [onPeakOutage, setOnPeakOutage] = useState('');
    const [midPeakOutage, setMidPeakOutage] = useState('');
    const [offPeakOutage, setOffPeakOutage] = useState('');

    let newConsumptionInfo = {
        onPeakOutage: onPeakOutage,
        midPeakOutage: midPeakOutage,
        offPeakOutage: offPeakOutage
    }
    return(
        <View>
            <Text>Hydro Consumption Details</Text>
            <TextInput
                style={styles.input}
                placeholder="On-Peak Usage (kWh)"
                keyboardType="numeric"
                onChangeText={setOnPeakOutage}
            />
            <TextInput
                style={styles.input}
                placeholder="Mid-Peak Usage (kWh)"
                onChangeText={setMidPeakOutage}
            />
            <TextInput
                style={styles.input}
                placeholder="Off-Peak Usage (kWh)"
                onChangeText={setOffPeakOutage}
            />
            <View>
                <Button
                    title="Calculate Bill"
                    onPress={() => props.onCalculateBill(newConsumptionInfo)}
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
      padding: 10,
      borderColor: 'red'
    },
  });

export { ConsumptionInfo }