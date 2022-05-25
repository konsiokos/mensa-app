import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect} from "react"
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import ClubCard from "../components/ClubCard";
import { getAllClubs } from "../routes_app";



const HomeScreen = ({ navigation }) => {
  var [clubs, setClubs] = useState([])


  useEffect(() => {
    async function getClubs() {
      const clubsList = await getAllClubs()
      setClubs(clubsList)
    }
    getClubs()    
    
  }, [])
  const cardList = clubs.map((club) => <ClubCard club={club} navigation={navigation} key={club.ClubID} />)
  return (
    <SafeAreaView backgroundColor="black" style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.mainText}>Explore Your Options</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <View style={{ padding: 20, paddingTop: 25 }}>{cardList}</View>
          </Animatable.View>
          <StatusBar style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%"
  },
  header: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 25
  },
  footer: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    minWidth: "100%"
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 65,
    fontFamily: "Optima-Bold",
    color: "white"
  },
});
