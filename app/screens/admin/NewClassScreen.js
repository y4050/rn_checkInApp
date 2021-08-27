import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import Screen from "../../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  FormFieldDate,
  SubmitButton,
} from "../../components/forms";

import colors from "../../config/colors";
import sizing from "../../config/sizing";

import moment from "moment";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";

// redux
import store from "../../store/store";

// actions
import { ADD_CLASS, ADD_ID } from "../../store/actions";

// form validations
const digitsOnly = (value) => /^\d+$/.test(value);
const validationSchemaA = Yup.object().shape({
  date: Yup.string().required("Required"),
  className: Yup.string().required("Required"),
  // time: Yup.string().required("Required"),
  capacity: Yup.string()
    .required("Required")
    .test("Digits only", "请输入数字", digitsOnly),
});

const allClasses = () => {
  return store.getState().classes;
};

export default function NewClassScreen({ navigation }) {
  // const colorScheme = useColorScheme();
  ////
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + "-" + month + "-" + date;
    //format: yyyy-mm-dd
  };
  const today = new Date();
  const timeNow = () => today.getHours() + ":" + today.getMinutes();

  const [classes, setClasses] = useState(allClasses());
  // for date picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [timeShow, setTimeShow] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [aDate, setADate] = useState("选择日期 Set Date");
  const [aTime, setATime] = useState("选择时间 Set Time");

  // Dropdown List
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("None");
  const [items, setItems] = useState([
    { label: "基础 Entry", value: "基础 Entry" },
    { label: "初级 Beginner", value: "初级 Beginner" },
    { label: "中级 Intermediate", value: "中级 Intermediate" },
    { label: "高级 Advanced", value: "高级 Advanced" },
    { label: "专业 Professional", value: "专业 Professional" },
    { label: "大师 Master", value: "大师 Master" },
  ]);

  const showMode = (currentMode) => {
    setShow;
    setMode(currentMode);
  };
  const showDatepicker = () => {
    setShow(true);
    setTimeShow(false);
    setHide(true);
  };

  const showTimepicker = () => {
    setTimeShow(true);
    setShow(false);
    setHide2(true);
  };

  const hideAll = () => {
    setShow(false);
    setTimeShow(false);
    setHide(false);
    setHide2(false);
    if (show && aDate == "选择日期 Set Date") {
      setADate(getCurrentDate());
    }
    if (timeShow && aTime == "选择时间 Set Time") {
      setATime(timeNow());
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === "ios");
    setDate(currentDate);
    let theDate = moment(currentDate).format("YYYY-MM-DD").toString();
    setADate(theDate);
  };

  const timeOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === "ios");
    setDate(currentDate);
    let theTime = moment(currentDate).format("HH:mm").toString();
    setATime(theTime);
  };

  const theDate = getCurrentDate();
  const theTime = timeNow();
  const createClass = (values) => {
    // console.log(values);
    let lastId = store.getState().lastId;
    store.dispatch(
      ADD_CLASS(
        lastId,
        "",
        aDate,
        aTime,
        values.className,
        values.teacher,
        value,
        values.duration,
        values.capacity,
        values.note
      ),
      store.dispatch(ADD_ID())
    ),
      navigation.goBack();
    // navigation.navigate("AdminHome");

    Alert.alert("新增成功! \n Class added!", "", [{ text: "OK" }]);
  };
  // style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}
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
      <Text></Text>
      <ScrollView>
        <View style={{ paddingHorizontal: 10 * sizing.vw }}>
          <Form
            initialValues={{
              day: "",
              date: theDate,
              time: theTime,
              className: "",
              teacher: "",
              level: "",
              duration: "",
              capacity: "",
              note: "",
            }}
            validationSchema={validationSchemaA}
            onSubmit={(values) => createClass(values)}
          >
            {/* <Button onPress={showDatepicker} title={aDate} />
        <Button onPress={showTimepicker} title={aTime} /> */}

            <TouchableOpacity
              onPress={showDatepicker}
              style={{
                height: 5 * sizing.vh,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10 * sizing.vw,
                marginVertical: 1 * sizing.vh,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 2 * sizing.vh, fontWeight: "400" }}>
                {aDate}
              </Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                themeVariant="light"
                name="date"
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={onChange}
              />
            )}
            {/* Hide Button */}
            {hide && <Button onPress={hideAll} title="确认" />}

            <TouchableOpacity
              onPress={showTimepicker}
              style={{
                height: 5 * sizing.vh,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10 * sizing.vw,
                marginVertical: 1 * sizing.vh,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 2 * sizing.vh, fontWeight: "400" }}>
                {aTime}
              </Text>
            </TouchableOpacity>
            {/* <FormField
          name="date"
          autoCapitalize="words"
          autoCorrect={false}
          icon="calendar-range"
          keyboardType="default"
          placeholder={theDate}
          textContentType="none"
          value={date}
        /> */}

            {/* <FormField
          name="time"
          autoCapitalize="none"
          autoCorrect={false}
          icon="clock"
          keyboardType="number-pad"
          placeholder="Time"
          textContentType="none"
        /> */}
            {timeShow && (
              <DateTimePicker
                themeVariant="light"
                testID="dateTimePicker"
                value={date}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={timeOnChange}
              />
            )}
            {/* Hide Button */}
            {hide2 && <Button onPress={hideAll} title="确认" />}

            <FormField
              name="className"
              autoCapitalize="words"
              autoCorrect={false}
              icon="tag"
              keyboardType="default"
              placeholder="课名 Class Name"
              textContentType="name"
            />
            <FormField
              name="teacher"
              autoCapitalize="words"
              autoCorrect={false}
              icon="account"
              keyboardType="default"
              placeholder="老师 Teacher"
              textContentType="name"
            />
            <DropDownPicker
              placeholder="选择等级 Choose Level"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                borderRadius: 100,
              }}
              textStyle={{
                fontSize: 2 * sizing.vh,
                textAlign: "center",
              }}
            />
            {/* <FormField
              name="level"
              autoCapitalize="words"
              autoCorrect={false}
              icon="tag"
              keyboardType="default"
              placeholder="等级 Level"
              textContentType="none"
            /> */}

            <FormField
              name="duration"
              autoCapitalize="none"
              autoCorrect={false}
              icon="clock-time-five-outline"
              keyboardType="default"
              placeholder="时长 Class Duration"
              textContentType="none"
            />
            <FormField
              name="capacity"
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              keyboardType="number-pad"
              placeholder="上限 Capacity"
              textContentType="none"
            />
            <FormField
              name="note"
              autoCapitalize="none"
              autoCorrect={true}
              icon="note-text"
              keyboardType="default"
              placeholder="注意事项 Note"
              textContentType="none"
            />
            <SubmitButton title="确认 Submit" />
          </Form>
          <Button title="返回 Go back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 10,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    display: "flex",
    flexGrow: 1,
    marginHorizontal: 5 * sizing.vh,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
});
