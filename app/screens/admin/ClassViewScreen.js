import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  View,
  Button,
  useWindowDimensions,
  Dimensions,
  Pressable,
} from "react-native";
import { Text, Tab, TabView } from "react-native-elements";
import Screen from "../../components/Screen";
import {
  ListClass,
  ListClassWeekly,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import store from "../../store/store";
import sizing from "../../config/sizing";
import colors from "../../config/colors";
import { DELETE_CLASS, UPDATE_DATE_CHECKIN } from "../../store/actions";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    classes: state.classes,
  };
}

// const nonWeeklyClasses = () => {
//   return store.getState().classes.filter((target) => target.day == "");
// };

// const weeklyClasses = () => {
//   return store.getState().classes.filter((target) => target.day !== "");
// };

const classesToday = () => {
  return store
    .getState()
    .classes.filter((target) => target.date == getCurrentDate());
};

const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return year + "-" + month + "-" + date;
  //format: yyyy-mm-dd
};

function ClassViewScreen(props) {
  const nonWeeklyClasses = () => {
    return props.classes.filter((target) => target.day == "");
  };

  const weeklyClasses = () => {
    return props.classes.filter((target) => target.day !== "");
  };

  // Updating the weekly classes' date to clear checkedIn list
  // finds class set as ie. Tue and change the date to today's date and clear the checked in list.
  const updateDate = () => {
    return store.getState().classes.filter((target) => {
      if (
        target.day == new Date().getDay() &&
        target.date !== getCurrentDate()
      ) {
        store.dispatch(UPDATE_DATE_CHECKIN(target.id, getCurrentDate()));
      }
    });
  };
  updateDate();
  // const theClasses = store.getState().classes;
  const [refreshing, setRefreshing] = useState(false);
  // const [daily, setDaily] = useState(nonWeeklyClasses());
  // const [weekly, setWeekly] = useState(weeklyClasses());

  const handleDelete = (item) => {
    // Delete the class from classes
    store.dispatch(DELETE_CLASS(item.id));

    Alert.alert("课程删除！ \n Class Deleted!", "", [{ text: "OK" }]);
  };

  const promptUser = (item) => {
    const title = "删除此课程？ \n Delete This Class?";
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

  const onLayout = (event) => {
    // console.log("EVENT", event)
    const { width, height } = event.nativeEvent.layout;
    console.log("WIDTH", width);
    console.log("HEIGHT", height);
    setDimensions({ width: width, height: height });
  };
  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isPressed, setIsPressed] = useState(true);
  const [isPressed2, setIsPressed2] = useState(false);

  const tabChange = () => {
    if (isPressed == true) {
      setIsPressed2(false);
      return styles.tab2;
    } else {
      return styles.tab;
    }
  };
  const tabChange2 = () => {
    if (isPressed2 == true) {
      setIsPressed(false);
      return styles.tab2;
    } else {
      return styles.tab;
    }
  };

  return (
    <Screen style={{ backgroundColor: "lightgray" }}>
      <View
        onLayout={(event) => onLayout(event)}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.tabsContainer}>
          <Pressable onPress={() => setIndex(1)} style={styles.tab2}>
            <Text style={styles.textTab}>每周课程 Weekly Classes</Text>
          </Pressable>
          <Pressable onPress={() => setIndex(0)} style={styles.tab}>
            <Text style={styles.textTab}>单日课程 Single Classes</Text>
          </Pressable>
        </View>
        <View style={{ flex: 1.5 * sizing.vh }}>
          {index === 0 ? (
            <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("NewClass")}
              >
                <Text style={styles.text}>
                  新增单日课程 Create Single Class
                </Text>
              </TouchableOpacity>
              <FlatList
                data={nonWeeklyClasses()}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => (
                  <ListClass
                    date={item.date}
                    className={item.className}
                    teacher={item.teacher}
                    level={item.level}
                    time={item.time}
                    duration={item.duration}
                    capacity={
                      item.capacity -
                      item.checkedIn.length +
                      " / " +
                      item.capacity
                    }
                    note={item.note}
                    onPress={() =>
                      props.navigation.navigate("ClassDetail", { item })
                    }
                    renderRightActions={() => (
                      <ListItemDeleteAction onPress={() => promptUser(item)} />
                    )}
                  />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                  // setDaily(nonWeeklyClasses()), setWeekly(weeklyClasses());
                }}
              />
            </View>
          ) : (
            <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("NewClassRE")}
              >
                <Text style={styles.text}>
                  新增每周课程 Create Weekly Class
                </Text>
              </TouchableOpacity>
              <FlatList
                data={weeklyClasses()}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => (
                  <ListClassWeekly
                    day={item.day}
                    className={item.className}
                    teacher={item.teacher}
                    level={item.level}
                    time={item.time}
                    duration={item.duration}
                    capacity={
                      item.capacity -
                      item.checkedIn.length +
                      " / " +
                      item.capacity
                    }
                    note={item.note}
                    onPress={() =>
                      props.navigation.navigate("ClassDetailRES", { item })
                    }
                    renderRightActions={() => (
                      <ListItemDeleteAction onPress={() => promptUser(item)} />
                    )}
                  />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                  // setDaily(nonWeeklyClasses()), setWeekly(weeklyClasses());
                }}
              />
            </View>
          )}
        </View>
        {/* <View onLayout={(event) => onLayout(event)} style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("NewClassRE")}
        >
          <Text style={styles.text}>新增每周课程 Create Weekly Class</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("NewClass")}
        >
          <Text style={styles.text}>新增单日课程 Create A Class</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Text
          style={{
            fontSize: 2 * sizing.vw,
            paddingBottom: 1 * sizing.vh,
            fontStyle: "italic",
            fontWeight: "600",
            color: "brown",
          }}
        >
          每周课程 Weekly Classes :
        </Text>
        <Text
          style={{
            fontSize: 2 * sizing.vw,
            paddingBottom: 1 * sizing.vh,
            fontStyle: "italic",
            fontWeight: "600",
            color: "green",
          }}
        >
          单日课程 Single Class :
        </Text>
      </View>
      <View style={{ flexDirection: "row", paddingBottom: 10 * sizing.vh }}>
        <FlatList
          data={weeklyClasses()}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ListClassWeekly
              day={item.day}
              className={item.className}
              teacher={item.teacher}
              level={item.level}
              time={item.time}
              duration={item.duration}
              capacity={
                item.capacity - item.checkedIn.length + " / " + item.capacity
              }
              note={item.note}
              onPress={() =>
                props.navigation.navigate("ClassDetailRES", { item })
              }
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => promptUser(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            // setDaily(nonWeeklyClasses()), setWeekly(weeklyClasses());
          }}
        />
        <FlatList
          data={nonWeeklyClasses()}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ListClass
              date={item.date}
              className={item.className}
              teacher={item.teacher}
              level={item.level}
              time={item.time}
              duration={item.duration}
              capacity={
                item.capacity - item.checkedIn.length + " / " + item.capacity
              }
              note={item.note}
              onPress={() => props.navigation.navigate("ClassDetail", { item })}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => promptUser(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            // setDaily(nonWeeklyClasses()), setWeekly(weeklyClasses());
          }}
        />
      </View> */}

        {/* <Button title="返回 Go back" onPress={() => navigation.goBack()} /> */}
      </View>
    </Screen>
  );
}

export default connect(mapStateToProps)(ClassViewScreen);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 1 * sizing.vh,
    margin: 1 * sizing.vh,
    paddingHorizontal: 1 * sizing.vh,
    borderRadius: 3 * sizing.vh,
  },
  text: { textAlign: "center", fontSize: 2 * sizing.vh },
  textTab: {
    textAlign: "center",
    fontSize: 2 * sizing.vh,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  tab: {
    backgroundColor: colors.secondary,
    flex: 1,
    height: 4 * sizing.vh,
    padding: 0.5 * sizing.vh,
  },
  tab2: {
    backgroundColor: "orange",
    flex: 1,
    padding: 1 * sizing.vw,
  },
});
