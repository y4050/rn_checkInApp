import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert, View } from "react-native";
import { Image } from "react-native-elements";
import Screen from "../../components/Screen";
import sizing from "../../config/sizing";
import colors from "../../config/colors";
import { connect } from "react-redux";
import store from "../../store/store";
import { LOG_IN, LOG_OUT } from "../../store/actions";

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

function AdminHomeScreen(props) {
  const navigation = props.navigation;

  const validate = (input) => {
    if (input == "2345") {
      input = "";
      store.dispatch(LOG_IN());
    } else {
      Alert.alert("密码错误 Incorrect Passcode", "", [{ text: "OK" }]);
    }
  };

  const promptPass = () => {
    Alert.prompt(
      "输入密码 Enter Passcode",
      null,
      (text) => validate(text),
      "secure-text",
      null,
      "number-pad"
    );
    // Alert.prompt(
    //   "what",
    //   "输入密码 Enter Passcode",
    //   (text) => validate(text),
    //   "",
    //   "",
    //   "number-pad"
    // );
  };

  return (
    <Screen style={styles.box}>
      <Text
        style={{
          fontSize: 5 * sizing.vh,
          fontWeight: "600",
          marginVertical: 3 * sizing.vh,
        }}
      >
        Admin's Page
      </Text>
      {props.isLoggedIn && (
        <View style={{ textAlign: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ClassView")}
          >
            <Text style={styles.text}>课程信息 Class Detail</Text>
          </TouchableOpacity>
          {/* STUDENT LIST */}
          {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("StudentList")}
      >
        <Text style={styles.text}>unfinished</Text>
      </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DailyLimit")}
          >
            <Text style={styles.text}>每日上限 Daily Limit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditNews")}
          >
            <Text style={styles.text}>修改公告 Edit Notice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonB}
            onPress={() => store.dispatch(LOG_OUT())}
          >
            <Text style={styles.textB}>登出 Log Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {props.isLoggedIn == false && (
        <TouchableOpacity style={styles.button} onPress={() => promptPass()}>
          <Text style={styles.text}>登入 Log In</Text>
        </TouchableOpacity>
      )}
      {/* <Button
        title="登出 Log Out"
        onPress={() => navigation.navigate("Lock")}
      /> */}
    </Screen>
  );
}

export default connect(mapStateToProps)(AdminHomeScreen);

const styles = StyleSheet.create({
  box: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    padding: 5 * sizing.vh,
    backgroundColor: "lightgray",
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#DDDDDD",
    backgroundColor: colors.primary,
    paddingHorizontal: 1 * sizing.vh,
    paddingVertical: 2 * sizing.vh,
    margin: 2 * sizing.vh,
    borderRadius: 3 * sizing.vh,
    width: 35 * sizing.vh,
  },
  buttonB: {
    alignItems: "center",
    // backgroundColor: "#DDDDDD",
    backgroundColor: "salmon",
    paddingHorizontal: 1 * sizing.vh,
    paddingVertical: 1.2 * sizing.vh,
    margin: 2 * sizing.vh,
    borderRadius: 3 * sizing.vh,
    width: 35 * sizing.vh,
  },
  text: { textAlign: "center", fontSize: 2 * sizing.vh },
  textB: { textAlign: "center", fontSize: 2 * sizing.vh },
  image: {
    width: 40 * sizing.vh,
    height: 15 * sizing.vh,
    margin: 2 * sizing.vh,
  },
});
