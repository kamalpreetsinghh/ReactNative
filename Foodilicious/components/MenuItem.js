import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"

const MenuItem = ({menuItem, navigation}) => {

    const openMenuDetail = () => {
        navigation.push('MenuDetail', {
            menuItem: menuItem
        });
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity
                key={menuItem['Id']}
                activeOpacity={1}
                onPress={openMenuDetail}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: menuItem['Image']}}
                        style={styles.imageSize}
                    />
                </View>
                <View style={styles.menuInfo}>
                    <View>
                        <Text style={styles.item}>{menuItem['Title']}</Text>
                        <Text style={styles.deliveryTime}>30-45 • min</Text>
                    </View>
                    <View style={styles.ratings}>
                        <Text>{menuItem['Ratings']}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
    },
    imageContainer: {
        marginTop: 10, 
        padding: 15, 
        paddingBottom: 7,
        backgroundColor: "white"
    },
    imageSize: {
        width: 400, 
        height: 180
    },
    item: {
        fontSize: 18,
        fontWeight: 'bold',
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: 10
    }
  });

export default MenuItem;