import React from "react";
import {
  StyleSheet,
  Text,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import Screen from "../../components/Screen";
import { Form, FormField, SubmitButton } from "../../components/forms";
import store from "../../store/store";
import sizing from "../../config/sizing";

import { CHECK_IN } from "../../store/actions";

export default function RegisterClassScreen({ route, navigation }) {
  const classID = route.params.id;
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + "-" + month + "-" + date;
    //format: yyyy-mm-dd
  };
  const theDailyLimit = store.getState().dailyLimit;
  const checking = (inputCode) => {
    let targetClass = store
      .getState()
      .classes.filter((i) => i.id == route.params.id);
    let theList = targetClass[0].checkedIn;
    let alreadyCheckedIn = false;
    for (const item of theList) {
      if (item == inputCode) {
        alreadyCheckedIn = true;
      }
    }
    return alreadyCheckedIn;
  };

  // Check daily limit
  const checkLimit = (inputCode) => {
    const classesToday = store
      .getState()
      .classes.filter((i) => i.date == getCurrentDate());
    let matched = [];
    let reachedLimit = false;
    const checkedIns = classesToday.map((theClass) => {
      // for matched classes
      for (let code of theClass.checkedIn) {
        if (inputCode == code) {
          // getting matched class ID
          matched.push(theClass.id);
        }
      }
      if (matched.length >= theDailyLimit) {
        reachedLimit = true;
      }
    });
    return reachedLimit;
  };
  const getNumberRegistered = (inputCode) => {
    const classesToday = store
      .getState()
      .classes.filter((i) => i.date == getCurrentDate());
    let matched = [];
    const checkedIns = classesToday.map((theClass) => {
      // for matched classes
      for (let code of theClass.checkedIn) {
        if (inputCode == code) {
          // getting matched class ID
          matched.push(theClass.id);
        }
      }
    });
    return matched.length;
  };
  // const addingTo = (inputCode) => {
  //   let targetClass = store
  //     .getState()
  //     .classes.filter((i) => i.id == route.params.id);
  //   let Updating = (targetClass[0].checkedIn = [
  //     ...targetClass[0].checkedIn,
  //     inputCode,
  //   ]);
  //   navigation.navigate("Home");
  //   Alert.alert("???????????????\n Registered!", "", [{ text: "OK" }]);
  // };
  const theLimit = store.getState().dailyLimit;
  const addingTo = (inputCode) => {
    store.dispatch(CHECK_IN(classID, inputCode));
    navigation.navigate("Home");
    Alert.alert(
      "???????????????\n Registered!" +
        "\n" +
        "?????????????????? Today's Registration Limit:" +
        "\n" +
        (theLimit - getNumberRegistered(inputCode)) +
        "/" +
        theLimit,
      "",
      [{ text: "OK" }]
    );
  };

  const addOrNot = (inputCode) => {
    if (inputCode == "") {
      Alert.alert("??????????????? \n Please enter your code", "", [{ text: "OK" }]);
    } else if (checking(inputCode)) {
      navigation.navigate("Home");
      Alert.alert("????????????\n Already Registered!", "", [{ text: "OK" }]);
    } else if (checkLimit(inputCode)) {
      Alert.alert("???????????????????????????\n At max registration!", "", [
        { text: "OK" },
      ]);
    } else {
      addingTo(inputCode);
    }
  };

  return (
    <Screen style={styles.box}>
      <Form
        initialValues={{
          studentCode: "",
        }}
        onSubmit={(values) => addOrNot(values.studentCode)}
      >
        <FormField
          style={styles.input}
          name="studentCode"
          autoCapitalize="none"
          autoCorrect={false}
          icon="ticket-confirmation"
          keyboardType="number-pad"
          placeholder="???????????? Enter Code"
          textContentType="none"
        />
        <Text></Text>
        <SubmitButton title="?????? Confirm" />
        <Text></Text>
      </Form>
      <Button title="?????? Return" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    padding: 10 * sizing.vh,
    paddingTop: 20 * sizing.vh,
    backgroundColor: "lightgray",
  },
  input: {
    fontSize: 2 * sizing.vh,
    paddingHorizontal: 2 * sizing.vw,
    width: 30 * sizing.vw,
  },
  text: { textAlign: "center", fontSize: 3 * sizing.vh },
});
