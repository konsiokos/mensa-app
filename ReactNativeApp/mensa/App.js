import React, { useEffect, useCallback } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import login from "./routes_auth";
import { registerUser } from "./routes_auth";
import * as SecureStore from "expo-secure-store";

import { AuthContext } from "./components/Context";
import RootStackScreen from "./screens/RootStackScreen";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}
async function clearValueFor(key) {
  let result = await SecureStore.deleteItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    isLoggedIn: false
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          isLoading: false,
          isLoggedIn: true
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          isLoggedIn: false,
          isLoading: false
        };
      case "LOADING":
        return {
          ...prevState,
          isLoading: action.load
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        const response = await login(userName, password);
        if (response != false) {
          await save("accessToken", response.accessToken);
          await save("refreshToken", response.refreshToken);
          await save("userName", userName);
          dispatch({ type: "LOGIN", id: userName });
          return true;
        } else {
          return false;
        }
      },
      signOut: async () => {
        await clearValueFor("accessToken");
        await clearValueFor("refreshToken");
        await clearValueFor("userName");
        dispatch({ type: "LOGOUT" });
      },
      setLoading: val => {
        dispatch({ type: "LOADING", load: val });
      },
      signUp: async (userName, password, firstName, lastName) => {
        const response = await registerUser(
          userName,
          password,
          firstName,
          lastName
        );
        if (response == "success") {
          return true;
        }
        return false;
      }
    }),
    []
  );

  const getTokens = useCallback(async () => {
    const username = await getValueFor("userName");
    if (username != null) {
      dispatch({ type: "LOGIN", id: username });
    }
  });

  useEffect(async () => {
    await getTokens();
    dispatch({ type: "LOADING", load: false });
  }, []);


  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.isLoggedIn ? <Tabs /> : <RootStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
