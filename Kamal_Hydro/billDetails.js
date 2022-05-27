import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

const BillDetails = ({ route, navigation }) => {
    const { hydroInfo, accountDetails } = route.params;
    let bill = 0.0;
    const calculateBill = () => {
        let totalConsumptionCharges = onPeakOutage*0.132 + midPeakOutage*0.065 + offPeakOutage*0.094;
        let hst = totalConsumptionCharges*0.13;
        let provincialRebate = totalConsumptionCharges*0.08;
        bill = totalConsumptionCharges + hst - provincialRebate;
    }

    React.useEffect(() => {
        calculateBill();
      }, []);
    
    
    return(
        <View>
            <Text>Your Hydro Bill is : </Text>
            <View>
            <Text>{bill}</Text>
            </View>
        </View>
    )
}

export { BillDetails }