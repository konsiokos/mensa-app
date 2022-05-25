import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  ScrollView
} from "react-native";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../components/Context";



const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    error_message: ""
  });
  const { signUp } = React.useContext(AuthContext);
  function handleSubmit() {
    if (data.username != "" && data.first_name != "" && data.last_name != "" && data.password == data.confirm_password) {
      signUp(data.username, data.password, data.first_name, data.last_name).then((response) => {
        if (response == true) {
          navigation.goBack()
        }
      })
    }
    if (data.password != data.confirm_password) {
      setData({
        ...data,
        error_message: "Passwords do not match"
      })
    }
    if (data.username == "" || data.first_name == "" || data.last_name == "") {
      setData({
        ...data,
        error_message: "Please fill in all fields"
      })
    }
  }

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


  const handleNameChange = val => {
    setData({
      ...data,
      first_name: val
    });
  };
  const handleSurnameChange = val => {
    setData({
      ...data,
      last_name: val
    });
  };
  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val
    });
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#26142a" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
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
        <Text style={styles.text_footer}>First Name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => handleNameChange(val)}
          />
        </View>
        <Text style={styles.text_footer}>Last Name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Last Name"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => handleSurnameChange(val)}
          />
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

        <Text style={[styles.text_footer, { marginTop: 10 }]}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Confirm Your Password"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ alignContent:"center", justifyContent:"center"}}>

          <Text style={styles.errorMsg}>{data.error_message}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.signIn,
              {
                backgroundColor: "#26142a",
                borderColor: "#26142a",
                borderWidth: 1
              }
            ]}
          >
            <Text style={styles.signInText}> Sign Up </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.signIn,
              {
                borderColor: "#26142a",
                borderWidth: 1,
                marginTop: 15
              }
            ]}
          >
            <Text style={styles.textSign}> Sign In </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingVertical: 100,
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
    paddingVertical: 30,
    paddingBottom:100
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
    paddingBottom: 5,
    marginVertical: 20
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
    fontSize: 16,
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
