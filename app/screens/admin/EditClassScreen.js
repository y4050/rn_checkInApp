import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import {
  ErrorMessage,
  Form,
  FormField,
  FormFieldDate,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/colors";
import sizing from "../../config/sizing";
import Screen from "../../components/Screen";
import moment from "moment";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
// actions
import { EDIT_CLASS } from "../../store/actions";
// redux
import store from "../../store/store";
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

export default function EditClassScreen({ route, navigation }) {
  // Route
  const selectedClass = route.params.selectedClass;
  // States
  const [classes, setClasses] = useState(allClasses());
  const [name, onChangeText] = React.useState(selectedClass.className);
  const [teacher, setTeacher] = React.useState(selectedClass.teacher);
  const [level, setLevel] = React.useState(selectedClass.level);
  const [duration, setDuration] = React.useState(selectedClass.duration);
  const [capacity, setCapacity] = React.useState(selectedClass.capacity);
  const [note, setNote] = React.useState(selectedClass.note);

  // for date picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [timeShow, setTimeShow] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [aDate, setADate] = useState(selectedClass.date);
  const [aTime, setATime] = useState(selectedClass.time);

  // Dropdown List
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(level);
  const [items, setItems] = useState([
    { label: "基础 Entry", value: "基础 Entry" },
    { label: "初级 Beginner", value: "初级 Beginner" },
    { label: "中级 Intermediate", value: "中级 Intermediate" },
    { label: "高级 Advanced", value: "高级 Advanced" },
    { label: "专业 Professional", value: "专业 Professional" },
    { label: "大师 Master", value: "大师 Master" },
  ]);

  // ******
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
    if (show && aDate == "选择日期") {
      setADate(getCurrentDate());
    }
    if (timeShow && aTime == "选择时间") {
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

  const editClass = (values) => {
    // console.log(values);
    store.dispatch(
      EDIT_CLASS(
        values.id,
        aDate,
        aTime,
        values.className,
        values.teacher,
        value,
        values.duration,
        values.capacity,
        values.note
      )
    );
    navigation.navigate("ClassView");
    Alert.alert("修改成功! \n Class Edited!", "", [{ text: "OK" }]);
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
      <Text></Text>
      <ScrollView>
        <View style={{ paddingHorizontal: 10 * sizing.vw }}>
          <Form
            initialValues={{
              id: selectedClass.id,
              date: selectedClass.date,
              time: selectedClass.time,
              className: selectedClass.className,
              teacher: selectedClass.teacher,
              level: selectedClass.level,
              duration: selectedClass.duration,
              capacity: selectedClass.capacity,
              note: selectedClass.note,
            }}
            validationSchema={validationSchemaA}
            onSubmit={(values) => editClass(values)}
          >
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
              <Text
                style={{
                  fontSize: 2 * sizing.vh,
                  fontWeight: "400",
                }}
              >
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

            {hide && <Button onPress={hideAll} title="确认" />}
            <View style={styles.separator} />
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

            {hide2 && <Button onPress={hideAll} title="确认" />}
            {/* <FormField
            name="date"
            autoCapitalize="words"
            autoCorrect={false}
            icon="calendar"
            keyboardType="default"
            placeholder="date"
            textContentType="name"
            defaultValue={aDate}
          />
          <FormField
            name="time"
            autoCapitalize="none"
            autoCorrect={false}
            icon="clock-time-five"
            keyboardType="default"
            placeholder="time"
            textContentType="none"
            defaultValue={aTime}
          /> */}
            <FormField
              name="className"
              autoCapitalize="words"
              autoCorrect={false}
              icon="tag"
              keyboardType="default"
              placeholder="课名 Class Name"
              textContentType="name"
              defaultValue={name}
            />
            <FormField
              name="teacher"
              autoCapitalize="words"
              autoCorrect={false}
              icon="account"
              keyboardType="default"
              placeholder="老师 Teacher"
              textContentType="name"
              defaultValue={teacher}
            />
            <DropDownPicker
              placeholder={level}
              open={open}
              value={value}
              defaultValue={level}
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
              defaultValue={level}
            /> */}
            <FormField
              name="duration"
              autoCapitalize="none"
              autoCorrect={false}
              icon="clock-time-five-outline"
              keyboardType="default"
              placeholder="时长 Class Duration"
              textContentType="none"
              defaultValue={duration}
            />
            <FormField
              name="capacity"
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              keyboardType="number-pad"
              placeholder="上限 Capacity"
              textContentType="none"
              defaultValue={capacity}
            />
            <FormField
              name="note"
              autoCapitalize="none"
              autoCorrect={true}
              icon="note-text"
              keyboardType="default"
              placeholder="注意事项 Note"
              textContentType="none"
              defaultValue={note}
            />
            <SubmitButton title="确认 Submit" />
          </Form>
          <Button title="返回 Go back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
