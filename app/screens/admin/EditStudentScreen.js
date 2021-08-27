import React from "react";
import { StyleSheet, Text, Button } from "react-native";
import Screen from "../../components/Screen";

export default function EditStudentScreen({ navigation }) {
  return (
    <Screen>
      <Text>Edit students' information screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

const styles = StyleSheet.create({});
