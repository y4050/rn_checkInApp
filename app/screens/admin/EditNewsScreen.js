import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from "react-native";
import {
  ErrorMessage,
  Form,
  FormField,
  DateField,
  FormFieldDate,
  SubmitButton,
} from "../../components/forms";
import { Formik } from "formik";
import colors from "../../config/colors";
import sizing from "../../config/sizing";
import Screen from "../../components/Screen";

import { UPDATE_NEWS } from "../../store/actions";

// redux
import store from "../../store/store";
// import returnStoreAndPersistor from "./app/store/store";
// const { store, persistor } = returnStoreAndPersistor();

let getNews = () => {
  return store.getState().news;
};
const theNews = getNews();
const news = getNews();
export default function EditNewsScreen({ route, navigation }) {
  const editNews = (values) => {
    // store.getState().news = values;
    // console.log(values);
    store.dispatch(UPDATE_NEWS(values));
    navigation.navigate("AdminHome");
    Alert.alert("修改完成! \n Edited! \n", "", [{ text: "OK" }]);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "lightgray",
      }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
      behavior="padding"
    >
      <ScrollView
        style={{
          paddingHorizontal: 10 * sizing.vw,
          paddingVertical: 15 * sizing.vh,
        }}
      >
        <Text></Text>
        <Form
          initialValues={{
            text: theNews,
          }}
          onSubmit={(values) => editNews(values.text)}
        >
          <FormField
            name="text"
            autoCapitalize="none"
            autoCorrect={false}
            icon="tag"
            keyboardType="default"
            placeholder="公告 Notice"
            defaultValue={getNews()}
          />
          <SubmitButton title="确认 Submit" />
        </Form>
        <Button title="返回 Go back" onPress={() => navigation.goBack()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
