import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useState } from 'react';
import { AccountInfo } from './accountInfo';
import { ConsumptionInfo } from './consumptionInfo';

const HomeScreen = ({navigation}) => {
    const [updatedAccountInfo, setUpdatedAccountInfo] = useState({});

    const handleAccountInfoSave = (accountInformation) => {
        setUpdatedAccountInfo(accountInformation);
        console.log("Handle Account Info");
        () => Alert.alert('Account Info Saved');
    }

    const handleCalculateBill = (hydroInfo) => {
        () => navigation.navigate("BillDetails", {hydroInfo: hydroInfo, accountDetails: updatedAccountInfo});
    }

    return(
        <SafeAreaView style={styles.container}>
            <AccountInfo onAccountInfoSave={handleAccountInfoSave} />
            <ConsumptionInfo onCalculateBill={handleCalculateBill} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin: '5%'
    },
  });

  export { HomeScreen }
  