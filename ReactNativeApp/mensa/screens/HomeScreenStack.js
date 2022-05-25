import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import MakeBookingScreen from "./MakeBookingScreen";
import ConfirmedScreen from "./ConfirmedScreen";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="DetailsScreen" component={DetailsScreen} />
    <HomeStack.Screen name="MakeBookingScreen" component={MakeBookingScreen} />
    <HomeStack.Screen name="ConfirmedScreen" component={ConfirmedScreen} options={{ gestureEnabled: false }}/>
  </HomeStack.Navigator>
);

export default HomeStackScreen;
