import React from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FriendScreen from "../screens/FriendScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookingScreen from "../screens/BookingScreen";
import HomeStackScreen from "../screens/HomeScreenStack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "black",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 90
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          title: "MENSA",
          headerStyle: {
            backgroundColor: "white"
          },
          headerTitleStyle: {
            fontWeight: "bold"
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10
              }}
            >
              <Image
                source={require("../assets/icons/homeIcon.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#FF00FF" : "white"
                }}
              />
              <Text
                style={{ color: focused ? "#FF00FF" : "white", fontSize: 12 }}
              >
                HOME
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10
              }}
            >
              <Image
                source={require("../assets/icons/bookingIcon.png")}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 35,
                  tintColor: focused ? "#FF00FF" : "white"
                }}
              />
              <Text
                style={{ color: focused ? "#FF00FF" : "white", fontSize: 12 }}
              >
                BOOKINGS
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10
              }}
            >
              <Image
                source={require("../assets/icons/friendIcon.png")}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? "#FF00FF" : "white"
                }}
              />
              <Text
                style={{ color: focused ? "#FF00FF" : "white", fontSize: 12 }}
              >
                FRIENDS
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10
              }}
            >
              <Image
                source={require("../assets/icons/profileIcon.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#FF00FF" : "white"
                }}
              />
              <Text
                style={{ color: focused ? "#FF00FF" : "white", fontSize: 12 }}
              >
                PROFILE
              </Text>
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
