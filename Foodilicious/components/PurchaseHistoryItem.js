import React from "react";
import { Text, View, StyleSheet } from "react-native";

const PurchaseHistoryItem = ({purchaseHistoryItem, navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>Name: {purchaseHistoryItem['name']}</Text>
            <Text style={styles.textStyle}>Price: {purchaseHistoryItem['price']-purchaseHistoryItem['discountPrice']}$</Text>
            <Text style={styles.textStyle}>Date: {purchaseHistoryItem['date']}</Text>
            <Text style={styles.textStyle}>Address: {purchaseHistoryItem['shippingAddress']}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderColor: '#c9c9c9'
    },
    textStyle: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 40,
        fontWeight: '400',
    }
  })

export default PurchaseHistoryItem;