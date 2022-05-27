import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, ScrollView, FlatList, View } from 'react-native';
import MenuItem from './MenuItem';

const MenuItems = ({menuItems, navigation}) => {
    // console.log(menuItems);
    return(
        <View style={styles.container}>
            <FlatList
                data={menuItems}
                renderItem={({item}) => <MenuItem navigation={navigation} menuItem={item} 
                keyExtractor={item => item['Id']} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
     paddingTop: 10,
    }
  });

export default MenuItems;