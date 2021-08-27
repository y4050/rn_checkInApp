import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, Button, Alert } from "react-native";
import Screen from "../../components/Screen";
import {
  ListClass,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import store from "../../store/store";
import { DELETE_CHECK_IN } from "../../store/actions";
import sizing from "../../config/sizing";
import colors from "../../config/colors";

export default function CancelSelection({ route, navigation }) {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + "-" + month + "-" + date;
    //format: yyyy-mm-dd
  };
  const theDate = getCurrentDate();
  const allClasses = () => {
    return store.getState().classes;
  };
  const getClasses = store.getState().classes;
  const theMatched = route.params.matched;
  const theCode = route.params.studentCode;
  let theClasses = [];
  const registered = () => {
    theMatched.map((id) => {
      theClasses.push(getClasses.filter((theClass) => theClass.id == id));
    });
  };
  registered();

  const getNumberRegistered = (theCode) => {
    const classesToday = store
      .getState()
      .classes.filter((i) => i.date == getCurrentDate());
    let matched = [];
    const checkedIns = classesToday.map((theClass) => {
      // for matched classes
      for (let code of theClass.checkedIn) {
        if (theCode == code) {
          // getting matched class ID
          matched.push(theClass.id);
        }
      }
    });
    return matched.length;
  };
  const theLimit = store.getState().dailyLimit;

  const [refreshing, setRefreshing] = useState(false);
  const [classes, setClasses] = useState(allClasses());
  const [aList, setAList] = useState("");

  const handleDelete = (item) => {
    const id = item.id;
    const theList = item.checkedIn;
    store.dispatch(DELETE_CHECK_IN(id, theCode));

    navigation.navigate("Home");
    Alert.alert("已取消报名 \n Registration Cancelled!", "", [{ text: "OK" }]);
  };

  const promptUser = (item) => {
    const title = "是否要取消报名？ \n Cancel class registration?";
    const message = "";
    const buttons = [
      { text: "否 No", type: "cancel" },
      {
        text: "是 Yes",
        onPress: () => handleDelete(item),
      },
    ];
    Alert.alert(title, message, buttons);
  };

  return (
    <Screen>
      <View style={{ height: 0.1 * sizing.vh, backgroundColor: "lightgray" }} />
      <Text
        style={{
          fontSize: 2 * sizing.vh,
          textAlign: "center",
          backgroundColor: colors.primary,
          fontWeight: "600",
          fontStyle: "italic",
          paddingTop: 0.5 * sizing.vh,
        }}
      >
        今日报名额度 Today's Registration Limit
      </Text>
      <Text
        style={{
          fontSize: 2.5 * sizing.vh,
          textAlign: "center",
          backgroundColor: colors.primary,
          color: "black",
          fontWeight: "600",
          paddingBottom: 0.5 * sizing.vh,
        }}
      >
        {theLimit - getNumberRegistered(theCode)} / {theLimit}
      </Text>

      <FlatList
        data={theClasses}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ListClass
            date={item[0].date}
            className={item[0].className}
            teacher={item[0].teacher}
            level={item[0].level}
            time={item[0].time}
            duration={item[0].duration}
            capacity={item[0].capacity}
            note={item[0].note}
            // onPress={() => console.log("Class selected", item[0])}
            onPress={() => promptUser(item[0])}
            // renderRightActions={() => (
            //   <ListItemDeleteAction onPress={() => handleDelete(item[0])} />
            // )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setClasses(allClasses());
        }}
      />
      <Button title="返回 Return" onPress={() => navigation.goBack()} />
      <Text></Text>
      <Text></Text>
    </Screen>
  );
}

const styles = StyleSheet.create({});
