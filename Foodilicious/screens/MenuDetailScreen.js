import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, Image, View, TouchableOpacity, Alert } from "react-native";
import { collection, addDoc, query, where, onSnapshot, } from "firebase/firestore";
import { auth, db } from '../firebase';

const MenuDetailScreen = ({route, navigation}) => {
    const { menuItem } = route.params; 
    const [isInCart, setIsInCart] = useState(false);

    const formatAvailability = (itemsAvailable) => {
        if(itemsAvailable == '0'){
            return 'Not Available';
        }
        return `Items Available: ${itemsAvailable}`;
    }

    // useEffect(() => {
    //     const q = query(collection(db, "cart"),  
    //                 where("id", "==", menuItem['Id']));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         let inCart = false;
    //         querySnapshot.forEach((doc) => {
    //             inCart = true;
    //         });

    //         setIsInCart(inCart);
    //         console.log(isInCart);
    //     });

    //     return () => {
    //         unsubscribe();
    //     }
    // }, [])

    const addToCart = () => {
        addDoc(collection(db, "cart"), {
            title: menuItem['Title'],
            category: menuItem['Category'],
            price: menuItem['Price'],
            imageUrl: menuItem['Image'],
            numberOfItems: menuItem['Available'],
            ratings: menuItem['Ratings'],
            userID: auth.currentUser.uid,
            id: menuItem['Id']
          }).then(() => {
              Alert.alert('Item added to cart');
          }).catch((error) => {
              console.log(error);
          });
    }


    return(
        <SafeAreaView>
            <Image
            source={{ uri: menuItem['Image'] }}
            style={styles.imageSize}/>
            <View style={styles.menuInfo}>
                <Text style={styles.item}>{menuItem['Title']}</Text>
                <Text style={styles.itemCategory}>{menuItem['Category']}</Text>
                <Text style={styles.itemCategory}>Price: {menuItem['Price']}$</Text>
                <Text style={styles.itemCategory}>{formatAvailability(menuItem['Available'])}</Text>
                <Text style={styles.itemCategory}>Ratings: {menuItem['Ratings']}</Text>
                <Text style={styles.itemDeliveryTime}>30-45 • min</Text>
                <Text style={styles.itemDescription}>{menuItem['Description']}</Text>
            </View>
            {menuItem['Available'] > 0 &&
                 <View style={styles.buttonContainer}>
                 <TouchableOpacity
                     onPress={addToCart}
                     style={styles.button}
                 >
                     <Text style={styles.buttonText}>Add To Cart</Text>
                 </TouchableOpacity>
             </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
    },
    imageContainer: {
        marginTop: 10, 
        padding: 15, 
        backgroundColor: "white"
    },
    imageSize: {
        width: '100%', 
        height: '40%'
    },
    item: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    itemCategory: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10
    },
    itemDescription: {
        fontSize: 16,
        marginTop: 10
    },
    itemDeliveryTime: {
        marginTop: 10,
        fontSize: 15, 
        color: "gray"
    },
    ratings: {
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    menuInfo: {
        padding: 15,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: 'red',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
  });

export default MenuDetailScreen;