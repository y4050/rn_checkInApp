import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./app/navigation/AppNavigator";

// Testing orientation
import * as ScreenOrientation from "expo-screen-orientation";
ScreenOrientation.unlockAsync();

// redux
import { Provider } from "react-redux";
import store from "./app/store/store";
import { persistor } from "./app/store/store";
// import returnStoreAndPersistor from "./app/store/reduxPersist";
// const { store, persistor } = returnStoreAndPersistor();

// Redux Persist
import { PersistGate } from "redux-persist/integration/react";

const Stack = createNativeStackNavigator();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

// console.log("***App.js*** >>>store.getState() > ", store.getState());

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
