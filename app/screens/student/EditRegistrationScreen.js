import React from "react";
import { StyleSheet, Button, Alert } from "react-native";
import { Text } from "react-native-elements";
import Screen from "../../components/Screen";
import { Form, FormField, SubmitButton } from "../../components/forms";
import store from "../../store/store";
import sizing from "../../config/sizing";
import colors from "../../config/colors";

export default function EditRegistrationScreen({ route, navigation }) {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + "-" + month + "-" + date;
    //format: yyyy-mm-dd
  };
  const theClasses = store
    .getState()
    .classes.filter((aClass) => aClass.date == getCurrentDate());
  const checkRegistration = (value) => {
    let hasMatch = false;
    let matched = [];
    const aClass = theClasses.map((theClass) => {
      // for matched classes
      for (let code of theClass.checkedIn) {
        if (value == code) {
          hasMatch = true;
          // getting matched class ID
          matched.push(theClass.id);
        }
      }
      return matched;
    });
    if (hasMatch) {
      navigation.navigate("CancelSelection", { matched, studentCode: value });
    } else if (value == "") {
      Alert.alert("请输入代码 \n Please enter your code", "", [{ text: "OK" }]);
    } else {
      Alert.alert("今天还未报课! \n No registration yet!", "", [
        { text: "OK" },
      ]);
    }
  };
  return (
    <Screen style={styles.box}>
      <Form
        initialValues={{
          studentCode: "",
        }}
        onSubmit={(input) => checkRegistration(input.studentCode)}
      >
        <FormField
          style={styles.input}
          name="studentCode"
          autoCapitalize="none"
          autoCorrect={false}
          icon="ticket-confirmation"
          keyboardType="number-pad"
          placeholder="输入代号 Enter Code"
          textContentType="none"
        />
        <Text></Text>
        <SubmitButton title="确认 Confirm" />
      </Form>
      <Text></Text>
      <Button title="返回 Return" onPress={() => navigation.goBack()} />
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
