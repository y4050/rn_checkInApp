import React, { useState } from "react";
import { StyleSheet, FlatList, Alert, View, Text } from "react-native";
import Screen from "../../components/Screen";
import moment from "moment";
import {
  ListClassStudent,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import sizing from "../../config/sizing";
import store from "../../store/store";
import colors from "../../config/colors";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    classes: state.classes,
  };
}

const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return year + "-" + month + "-" + date;
  //format: yyyy-mm-dd
};

const classesToday = () => {
  return store
    .getState()
    .classes.filter((target) => target.date == getCurrentDate());
};

function ClassListScreen(props) {
  const navigation = props.navigation;
  const classesDayAndDate = () => {
    return props.classes.filter((target) => {
      if (
        (target.date == getCurrentDate() ||
          target.date == moment(new Date()).format("YYYY-MM-DD").toString()) &&
        target.day == ""
      ) {
        return target;
      } else if (
        target.date == getCurrentDate() &&
        target.day == new Date().getDay()
      ) {
        return target;
      }
    });
  };
  const [refreshing, setRefreshing] = useState(false);
  // const [weeklyClass, setWeeklyClass] = useState(classesOfDay());
  // const [classes, setClasses] = useState(classesDayAndDate());

  const showDate =
    new Date().getMonth() + 1 + "月" + new Date().getDate() + "日";
  const ifFull = (item) => {
    if (item.capacity - item.checkedIn.length == 0) {
      Alert.alert("人数已满！\n Class is full!", "", [{ text: "OK" }]);
    } else {
      navigation.navigate("RegisterClass", {
        id: item.id,
        name: item.className,
      });
    }
  };
  return (
    <Screen style={{ backgroundColor: "lightgray" }}>
      <View style={{ height: 0.1 * sizing.vh, backgroundColor: "lightgray" }} />
      <Text style={styles.text}>{showDate}</Text>
      <FlatList
        data={classesDayAndDate()}
        keyExtractor={(course) => course.id}
        renderItem={({ item }) => (
          <ListClassStudent
            className={item.className}
            teacher={item.teacher}
            level={item.level}
            time={item.time}
            duration={item.duration}
            remaining={item.capacity - item.checkedIn.length}
            note={item.note}
            onPress={() => {
              ifFull(item);
            }}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          // setClasses(classesDayAndDate());
        }}
      />
      {/* <Button title="返回" onPress={() => navigation.goBack()} /> */}
    </Screen>
  );
}

export default connect(mapStateToProps)(ClassListScreen);

const styles = StyleSheet.create({
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    padding: 20,
  },
  image: { width: 200, height: 200 },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 1 * sizing.vh,
    backgroundColor: colors.primary,
    color: "black",
    fontSize: 2 * sizing.vh,
  },
});
