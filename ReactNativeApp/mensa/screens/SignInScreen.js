import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar
} from "react-native";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { AuthContext } from "../components/Context";

const SignInScreen = ({ navigation }) => {
  console.log("hi")
  const [data, setData] = React.useState({
    username: "",
    password: "",
    error_message: "",
    check_textInputChange: false,
    secureTextEntry: true
  });

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  };

  const setErrorMessage = (val) => {
    setData({
      ...data,
      error_message: val
    });
  }

  const loginHandle = (username, password) => {
    if (username == "" || password == "") {
      setErrorMessage("please complete all fields")
      return
    }
    signIn(username, password).then((response) => {
      if (response == false) {
        setErrorMessage("incorrect email or password")
      }
    })
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#26142a" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.errorMsg}>
            {data.error_message}
          </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
            style={[
              styles.signIn,
              {
                backgroundColor: "#26142a",
                borderColor: "#26142a",
                borderWidth: 1
              }
            ]}
          >
            <Text style={styles.signInText}> Sign In </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[
              styles.signIn,
              {
                borderColor: "#26142a",
                borderWidth: 1,
                marginTop: 15
              }
            ]}
          >
            <Text style={styles.textSign}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#26142a"
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a"
  },
  errorMsg: {
    color: "red",
    fontSize: 16
  },
  button: {
    alignItems: "center",
    marginTop: 50
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold"
  },
  signInText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  }
});
