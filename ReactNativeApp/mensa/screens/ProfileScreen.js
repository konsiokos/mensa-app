import React from "react";

import {
  View,
  Button,
  StatusBar,
  StyleSheet,
  SafeAreaView
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
} from "react-native-paper";
import { AuthContext } from "../components/Context";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import getUser from "../routes_app";
import COLORS from "../consts/colors";

const ProfileScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  const [user, setUser] = useState([])

  useEffect(() => {
    async function getuser() {
      const u = await getUser()
      setUser(u)
    }
    getuser()
  }, [])

  return (
    <SafeAreaView backgroundColor="black">
      <View backgroundColor="white" height={"120%"}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.mainText}>Profile</Text>
          </View>

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <View style={{ paddingTop: 25 }}>
              <View style={styles.mainInfoSection}>
                <View style={{ flexDirection: "column", justifyContent: "center" }}>
                  <View style={{backgroundColor: COLORS.grey, width: 150, height: 150, borderRadius: 100}}></View>
                  <View>
                    <Title
                      style={[
                        styles.title,
                        {
                          marginTop: 15,
                          marginBottom: 5
                        }
                      ]}
                    >
                      {user["FirstName"]} {user["LastName"]}
                    </Title>
                    <Caption style={styles.caption}>#{user["UserID"]}</Caption>
                  </View>
                </View>
              </View>

              <View style={styles.subInfoSection}>
                <View style={styles.row}>
                  <Icon name="map-marker-radius" color="#777777" size={20} />
                  <Text style={{ color: "#777777", marginLeft: 20 }}>
                    Location
                  </Text>
                </View>
                <View style={styles.row}>
                  <Icon name="phone" color="#777777" size={20} />
                  <Text style={{ color: "#777777", marginLeft: 20 }}>
                    +447895433228
                  </Text>
                </View>
                <View style={styles.row}>
                  <Icon name="email" color="#777777" size={20} />
                  <Text style={{ color: "#777777", marginLeft: 20 }}>
                    {user["Email"]}
                  </Text>
                </View>
              </View>

              <Button
                title="Sign Out"
                onPress={() => {
                  signOut();
                }}
              />
            </View>
          </Animatable.View>

          <StatusBar style="light" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
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
    width: "100%"
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 65,
    fontFamily: "Optima-Bold",
    color: "white"
  },
  mainInfoSection: {
    paddingHorizontal: 15,
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  subInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  caption: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "500",
    alignContent: "center"
  },
  row: {
    flexDirection: "row",
    marginBottom: 10
  }
});
