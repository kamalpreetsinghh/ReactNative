import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { StackActions } from '@react-navigation/native';
import { collection, query, where, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const PaymentScreen = ({route, navigation}) => {
    const { cartItems } = route.params; 
    const cartItemsNames = [];
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameError, setNameError] = useState('');
    const [contactError, setContactError] = useState('');
    const [billingAddressError, setBillingAddressError] = useState('');
    const [shippingAddressError, setShippingAddressError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expiryDateError, setExpiryDateError] = useState('');
    const [cvvError, setCvvError] = useState('');

    useEffect(() => {
        calculatePrice();
    })

    const calculatePrice = () => {
        let price = 0;
        let discount = 0;
        if (cartItems != undefined && cartItems.length > 0) {
            cartItems.forEach((cartItem) => {
                price = price + cartItem['price']*cartItem['numberOfItems'];
                cartItemsNames.push(cartItem['title']);
            });
            if(price > 100) {
                discount = price*0.3;
            } else if (price > 80) {
                discount = price*0.2;
            } else {
                discount = price*0.05;
            }
            setTotalPrice(price);
            setDiscountPrice(discount);
        }
    }

    const handlePayment = () => {
        if(validateDetails()) {
            addDoc(collection(db, "purchaseHistory"), {
                name: name,
                contact: contact,
                shippingAddress: shippingAddress,
                date: new Date().toLocaleString(),
                userID: auth.currentUser.uid,
                price: totalPrice,
                discountPrice: discountPrice,
                title: cartItemsNames
            }).then(() => {
                handleClearCart();
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const validateDetails = () => {
        let isValidAccountDetails = true;
        clearErrorMessages();

        if(name.length == 0) {
            setNameError('First Name cannot be blank');
            isValidAccountDetails = false;
        }

        if(contact.length == 0) {
            setContactError('Contact cannot be blank');
            isValidAccountDetails = false;
        }

        if(shippingAddress.length == 0) {
            setShippingAddressError('Address cannot be blank');
            isValidAccountDetails = false;
        }

        if(billingAddress.length == 0) {
            setBillingAddressError('Address cannot be blank');
            isValidAccountDetails = false;
        }

        if(cardNumber.length == 0) {
            setCardNumberError('Card Number cannot be blank');
            isValidAccountDetails = false;
        } else if (cardNumber.length != 16){
            setCardNumberError('Invalid Card Number');
            isValidAccountDetails = false;
        }

        if(cvv.length == 0) {
            setCvvError('CVV cannot be blank');
            isValidAccountDetails = false;
        } else if (cvv.length > 16){
            setCvvError('Invalid CVV');
            isValidAccountDetails = false;
        }

        let dateComponents = expiryDate.split('/');
        let expiryDateFormatted = new Date(`20${dateComponents[1]}`, dateComponents[0]);
        let dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        
        if(expiryDateFormatted.getTime() < new Date().getTime()){
            setExpiryDateError("Invalid Expiry Date");
            isValidAccountDetails = false;
        } else if(!dateRegex.test(expiryDate)) {
            setExpiryDateError('Invalid Date(MM/YY)')
            isValidAccountDetails = false;
        }

        return isValidAccountDetails;
    }

    const handleClearCart = async () => {
        const q = query(collection(db, "cart"), where("userID", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        Alert.alert('Order Placed');
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('Home');
    }

    const clearErrorMessages = () => {
        setNameError('');
        setContactError('');
        setBillingAddressError('');
        setShippingAddressError('');
        setCardNumberError('');
        setExpiryDateError('');
        setCvvError('');
    }

    return(
        <SafeAreaView>
            <View style={styles.priceContainer}>
                <Text style={styles.priceItem}>Item Total Price: {totalPrice}$</Text>
                <Text style={styles.priceItem}>Discount: {discountPrice}$</Text>
                <Text style={styles.priceItem}>Your Total Amount: {totalPrice-discountPrice}$</Text>
            </View>
            <KeyboardAvoidingView>
            <View style={[styles.inputContainer, styles.container]}>
            <Text>Please enter the following details.</Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <Text style={{color: 'red'}}>{nameError}</Text>
                <TextInput
                    placeholder="Contact Number"
                    value={contact}
                    onChangeText={text => setContact(text)}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <Text style={{color: 'red'}}>{contactError}</Text>
                <TextInput
                    placeholder="Billig Address"
                    value={billingAddress}
                    onChangeText={text => setBillingAddress(text)}
                    style={styles.input}
                />
                <Text style={{color: 'red'}}>{billingAddressError}</Text>
                <TextInput
                    placeholder="Shipping Address"
                    value={shippingAddress}
                    onChangeText={text => setShippingAddress(text)}
                    style={styles.input}
                />
                <Text style={{color: 'red'}}>{shippingAddressError}</Text>
                <TextInput
                    placeholder="Card Number"
                    value={cardNumber}
                    onChangeText={text => setCardNumber(text)}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <Text style={{color: 'red'}}>{cardNumberError}</Text>
                <TextInput
                    placeholder="Expiry Date(MM/YY)"
                    value={expiryDate}
                    onChangeText={text => setExpiryDate(text)}
                    style={styles.input}
                />
                <Text style={{color: 'red'}}>{expiryDateError}</Text>
                <TextInput
                    placeholder="CVV"
                    value={cvv}
                    onChangeText={text => setCvv(text)}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <Text style={{color: 'red'}}>{cvvError}</Text>
            </View>
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handlePayment}
                    style={styles.button}
                >
                <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceContainer: {
        marginVertical: 60,
    },
    inputContainer: {
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: '75%'
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'black',
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
    priceItem: {
        fontSize: 20,
        marginLeft: 50,
        marginTop: 10,
        color: '#4f4f4f'
    }
  });

export default PaymentScreen;