import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { collection, query, where, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase';
import CartItem from '../components/CartItem';

const CartScreen = ({navigation}) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const q = query(collection(db, "cart"), where("userID", "==", auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let cartData = [];
            querySnapshot.forEach((doc) => {
                let data = {};
                data = doc.data();
                data['docID'] = doc.id;
                cartData.push(data);
            });

            setCartItems(cartData);
            calculatePrice();
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const calculatePrice = () => {
        let price = 0;
        if (cartItems != undefined && cartItems.length > 0) {
            cartItems.forEach((cartItem) => {
                price = price + cartItem['price']*cartItem['numberOfItems'];
            });
            setTotalPrice(price);
        }
    }

    const handleClearCart = async () => {
        const q = query(collection(db, "cart"), where("userID", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
        Alert.alert('Cart cleared');
    }

    const handleCheckout = () => {
        navigation.push('Payment', {
            cartItems: cartItems
        });
    }

    return(
        <SafeAreaView style={styles.container}>
           {cartItems.length > 0 && 
                <View style={styles.rightButtonContainer}>
                    <TouchableOpacity
                    onPress={() => handleClearCart()}
                    style={[styles.rightButton, styles.redButton]}
                    >
                    <Text style={styles.buttonText}>Clear Cart</Text>
                    </TouchableOpacity>
                </View>
           }
           {cartItems.length == 0 && 
                <Text style={styles.emptyCartFontStyle}>Cart is Empty</Text>
           }
           <FlatList
                data={cartItems}
                renderItem={({item}) => <CartItem navigation={navigation} cartItem={item} 
                keyExtractor={item => item['Id']} />}
            />
            {cartItems.length > 0 &&
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    onPress={handleCheckout}
                    style={[styles.button, styles.blackButton]}
                    >
                    <Text style={styles.buttonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rightButtonContainer: {
        marginTop: 20,
        marginRight: 30,
        alignItems: 'flex-end'
    },
    rightButton: {
        width: '30%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    container: {
        flex: 1
    },
    button: {
      width: '50%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20
    },
    redButton: {
      backgroundColor: 'red'
    },
    blackButton: {
      backgroundColor: 'black'
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    totalPrice: {
        alignSelf: 'center',
        fontSize: 18,
    },
    emptyCartFontStyle: {
        fontSize: 36,
        alignSelf: 'center',
        marginTop: 400
    }
  })

export default CartScreen;