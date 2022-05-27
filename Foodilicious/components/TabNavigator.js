import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuDetailScreen from '../screens/MenuDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import PurchaseHistoryScreen from '../screens/PurchaseHistoryScreen';
import PaymentScreen from '../screens/PaymentScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const StackHome = createNativeStackNavigator();

export const HomeStack = () => {
  return(
    <StackHome.Navigator>
      <StackHome.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
      <StackHome.Screen options={{ headerShown: false }} name='MenuDetail' component={MenuDetailScreen} />
    </StackHome.Navigator>
  )
}

const StackCart = createNativeStackNavigator();

export const CartStack = () => {
  return(
    <StackCart.Navigator>
      <StackCart.Screen options={{ headerShown: false }} name='CartScreen' component={CartScreen} />
      <StackCart.Screen options={{ headerShown: false }} name='Payment' component={PaymentScreen} />
    </StackCart.Navigator>
  )
}

const StackProfile = createNativeStackNavigator();

export const ProfileStack = () => {
  return(
    <StackProfile.Navigator>
      <StackProfile.Screen options={{ headerShown: false }} name='ProfileScreen' component={ProfileScreen} />
      <StackProfile.Screen options={{ headerShown: false }} name='UpdateProfile' component={UpdateProfileScreen} />
    </StackProfile.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused
              ? 'md-fast-food'
              : 'md-fast-food-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'PurchaseHistory') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen options={{ headerShown: false, tabBarLabel: 'Home', }} name="HomeStack" component={HomeStack} />
      <Tab.Screen options={{ headerShown: false, tabBarLabel: 'Cart', }} name="Cart" component={CartStack} />
      <Tab.Screen options={{ headerShown: false, tabBarLabel: 'My Orders', }} name="PurchaseHistory" component={PurchaseHistoryScreen} />
      <Tab.Screen options={{ headerShown: false, tabBarLabel: 'Profile', }} name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  )
}

export default TabNavigator;