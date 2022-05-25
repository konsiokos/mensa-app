import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground
} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;
  return (
    <SafeAreaView backgroundColor="black">
      <ScrollView backgroundColor="white" height={"90%"}>
        <StatusBar style="light" />
        <ImageBackground
          style={styles.headerImage}
          source={{ uri: "data:image/png;base64," + item.Image1 }}
        >
          <View style={styles.header}>
            <Icon
              name="arrow-back-ios"
              size={28}
              color={COLORS.white}
              onPress={navigation.goBack}
            />
          </View>
        </ImageBackground>
        <View>
          <View style={styles.iconContainer}>
            <Icon name="place" color={COLORS.white} size={28} />
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 34, fontWeight: "bold" }}>
              {item.Name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: COLORS.darkgrey,
                marginTop: 5
              }}
            >
              {item.Address1}, {item.Address2}, {item.PostCode}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                lineHeight: 20,
                color: COLORS.darkgrey,
                paddingLeft: 20,
                paddingRight: 20
              }}
            >
              {item.Details}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 20,
              alignItems: "center",
              marginBottom: 65
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Starting from
            </Text>
            <View style={styles.priceTag}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
                £{item.MinPrice}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("MakeBookingScreen", item)}
          >
            <View style={styles.button}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                Make a Booking
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: 370,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden"
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row"
  },
  button: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10
  }
});

export default DetailsScreen;
