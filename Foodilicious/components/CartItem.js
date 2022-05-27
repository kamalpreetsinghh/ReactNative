import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native"
import { IconButton, Colors } from 'react-native-paper';
import { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

const CartItem = ({cartItem, navigation}) => {

    const deleteItem = async () => {
        await deleteDoc(doc(db,'cart', cartItem['docID']));
        Alert.alert('Item Removed');
    }

    return(
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    key={cartItem['id']}
                    activeOpacity={1}
                    onPress={()=> {}}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: cartItem['imageUrl']}}
                            style={styles.imageSize}
                        />
                    </View>
                    <View style={styles.menuInfo}>
                        <Text style={styles.item}>{cartItem['title']}</Text>
                        <Text style={styles.itemPrice}>Price: {cartItem['price']}$</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <IconButton style={styles.deleteIcon}
                icon="delete"
                color={Colors.red500}
                size={50}
                onPress={() => deleteItem()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    imageContainer: {
        marginTop: 10, 
        padding: 15, 
        paddingBottom: 7,
    },
    imageSize: {
        width: 200, 
        height: 80
    },
    item: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '500'
    },
    ratings: {
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    deliveryTime: {
        fontSize: 15, 
        color: "gray"
    },
    menuInfo: {
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    deleteIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

export default CartItem;