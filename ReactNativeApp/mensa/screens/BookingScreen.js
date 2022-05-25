import { StatusBar } from "expo-status-bar";
import {React, useState, useEffect} from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { getUserBookings } from "../routes_app";
import BookingCard from "../components/BookingCard";


const BookingScreen = ({ navigation }) => {
  var [bookings, setBookings] = useState([])

  useEffect(() => {
    async function getBookings() {
      const books = await getUserBookings()
      setBookings(books)
    }
    getBookings()
  }, [])
  const cardList = bookings.map((booking) => <BookingCard booking={booking} navigation={navigation} key={booking.info.BookingID} />)

  return (
    <SafeAreaView backgroundColor="black" style={{flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.mainText}>Bookings</Text>
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

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    minHeight:"100%"
  },
  header: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 25,
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    width: "100%",
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 65,
    fontFamily: "Optima-Bold",
    color: "white"
  },
  title: {
    backgroundColor: "white",
    padding: 10
  },
});
