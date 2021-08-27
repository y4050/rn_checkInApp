import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import store from "../../store/store";
// import returnStoreAndPersistor from "../../store/reduxPersist";
// const { store, persistor } = returnStoreAndPersistor();

import { ADD_LIMIT, REDUCE_LIMIT } from "../../store/actions";
import { useSelector } from "react-redux";
import sizing from "../../config/sizing";
import colors from "../../config/colors";

export default function DailyLimitScreen({ navigation }) {
  const reducing = () => {
    if (store.getState().dailyLimit > 1) {
      store.dispatch(REDUCE_LIMIT());
    } else {
      Alert.alert("最少1节课 At least 1", "", [
        // { text: "OK", onPress: () => console.log("OK Pressed") },
        { text: "OK" },
      ]);
    }
  };
  const counter = useSelector((state) => state.dailyLimit);
  return (
    <View style={styles.main}>
      <View style={{ backgroundColor: "black", height: 1 }} />
      <Text style={styles.text}>当前设置 Current Setting :</Text>

      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 6 * sizing.vw,
          paddingVertical: 1 * sizing.vw,
          borderRadius: 3 * sizing.vh,
          marginVertical: 8 * sizing.vh,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 3 * sizing.vh }}>
          {counter}
        </Text>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.button} onPress={() => reducing()}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 3 * sizing.vh,
              color: "red",
              fontWeight: "600",
            }}
          >
            -
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => store.dispatch(ADD_LIMIT())}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 3 * sizing.vh,
              color: "red",
              fontWeight: "600",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 2 * sizing.vh }} />
      <Button title="返回 Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    padding: 10 * sizing.vh,
    paddingTop: 15 * sizing.vh,
    backgroundColor: "lightgray",
  },
  box: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10 * sizing.vh,
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#DDDDDD",
    backgroundColor: colors.primary,
    paddingVertical: 1 * sizing.vh,
    marginHorizontal: 2 * sizing.vh,
    marginVertical: 1 * sizing.vh,
    borderRadius: 2 * sizing.vh,
    width: 15 * sizing.vh,
  },
  text: {
    textAlign: "center",
    fontSize: 2 * sizing.vh,
  },
  textB: {
    textAlign: "center",
    fontSize: 4 * sizing.vh,
  },
});
