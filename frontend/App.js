/**
 StAuth10244: I Kyungwon Lee, 000865096 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomeScreen from './Screen/HomeScreen';
import MathGame from './Screen/MathGame';
import SignUp from './Screen/SignUp';
import GameResult from './Screen/GameResult';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Log in' ,headerBackVisible: false }}/>
        <Stack.Screen name="MathGame" component={MathGame} options={{ title: 'Math Game', headerBackVisible: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up'}}/>
        <Stack.Screen name="GameResult" component={GameResult} options={{ title: 'Result', headerBackVisible: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;
