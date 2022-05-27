import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MenuItems from '../components/MenuItems';

const HomeScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [menuData, setMenuData] = useState([]);
    const [menuListData, setMenuListData] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('lessPrice');
    const [items, setItems] = useState([
      {label: 'Price Less Than', value: 'lessPrice'},
      {label: 'Price Greater Than', value: 'morePrice'},
      {label: 'Is Available', value: 'isAvailable'},
      {label: 'Not Available', value: 'notAvailable'},
      {label: 'Ratings Less Than', value: 'lessRatings'},
      {label: 'Ratings Greater Than', value: 'moreRatings'},
      {label: 'Remove Filter', value: 'remove'},
    ]);

    useEffect( () => {getMenuItems()}, []);

    const getMenuItems = () => {
      const apiURL = `https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json`;

      return fetch(apiURL)
      .then( (response) => response.json().then( (json) => { setMenuData(json); setMenuListData(json)})
      .catch( (error) => {console.error(error); })
      .finally( () => {} )
      );
  }

    const handleSearch = () => {
      let data = menuListData;

        if(value == 'isAvailable') {
          const filteredData = data.filter((item) => item['Available'] > 0);
              setMenuData(filteredData);
        } 
        else if (value == 'notAvailable') {
          const filteredData = data.filter((item) => item['Available'] == 0);
              setMenuData(filteredData);
        }
        else if (value == 'remove') {
              setMenuData(data);
        } 
        else if(search.length > 0) {
          if (value == 'lessPrice') {
            let price = parseInt(search)
            if(price != NaN) {
              const filteredData = data.filter((item) => item['Price'] < price);
              setMenuData(filteredData);
            }
          } 
          else if (value == 'morePrice'){
            let price = parseInt(search)
            if(price != NaN) {
              const filteredData = data.filter((item) => item['Price'] > price);
              setMenuData(filteredData);
            }
          }
          if (value == 'lessRatings') {
            let ratings = parseInt(search)
            if(ratings != NaN) {
              const filteredData = data.filter((item) => item['Ratings'] < ratings);
              setMenuData(filteredData);
            }
          } 
          else if (value == 'moreRatings'){
            let ratings = parseInt(search)
            if(ratings != NaN) {
              const filteredData = data.filter((item) => item['Ratings'] > ratings);
              setMenuData(filteredData);
            }
          }
        }
    }
    
    return(
        <SafeAreaView>
           <View style={styles.searchContainer}>
            <TextInput
                placeholder="Search"
                value={search}
                onChangeText={text => setSearch(text)}
                style={styles.input} />
                <TouchableOpacity
                    onPress={handleSearch}
                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
           </View>
           <DropDownPicker style={styles.dropdown}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
           <View>
                <MenuItems navigation={navigation} menuItems={menuData} />
           </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
      backgroundColor: 'white',
      padding: 12,
      borderRadius: 5,
      marginTop: 5,
      width: '70%'
    },
    button: {
      marginLeft:12,
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    picker: {
      alignSelf: 'center',
      height: 150, 
      width: 250,
      marginTop: -40
    },
    dropdown: {
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 20
    }
  })

export default HomeScreen;