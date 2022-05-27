import React, { useEffect } from 'react';
import { LogBox, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TabNavigator from './components/TabNavigator';

const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <TabNavigator />
//     </NavigationContainer>
//   );
// }

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  })
  return (
    <NavigationContainer>
      { auth.currentUser != null ? <TabNavigator /> : 
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerTintColor: 'black', headerStyle: { backgroundColor: '#317873' }, }} name='Register' component={RegisterScreen} />
          <Stack.Screen options={{ headerShown: false }} name='TabNavigator' component={TabNavigator} />
      </Stack.Navigator> 
      }
    </NavigationContainer>
  );
}
