import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, StyleSheet } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from '../firebase';
import PurchaseHistoryItem from "../components/PurchaseHistoryItem";

const PurchaseHistoryScreen = ({navigation}) => {
    const [purchaseHistoryItems, setPurchaseHistoryItems] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "purchaseHistory"), where("userID", "==", auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let purchaseItems = [];
            querySnapshot.forEach((doc) => {
                let data = {};
                data = doc.data();
                data['docID'] = doc.id;
                purchaseItems.push(data);
            });

            setPurchaseHistoryItems(purchaseItems);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    return(
        <SafeAreaView>
            <Text style={styles.header}>Past Orders</Text>
            <FlatList
                data={purchaseHistoryItems}
                renderItem={({item}) => <PurchaseHistoryItem navigation={navigation} purchaseHistoryItem={item} 
                keyExtractor={item => item['Id']} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray',
        alignSelf: 'center',
        marginVertical: 20
    },
})

export default PurchaseHistoryScreen;