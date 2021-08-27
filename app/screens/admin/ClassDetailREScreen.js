import React from "react";
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import colors from "../../config/colors";
import sizing from "../../config/sizing";

import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    classes: state.classes,
  };
}

const printDay = (input) => {
  if (input == "1") {
    return "每周一 Every Monday";
  } else if (input == "2") {
    return "每周二 Every Tuesday";
  } else if (input == "3") {
    return "每周三 Every Wednesday";
  } else if (input == "4") {
    return "每周四 Every Thursday";
  } else if (input == "5") {
    return "每周五 Every Friday";
  } else if (input == "6") {
    return "每周六 Every Saturday";
  } else if (input == "0") {
    return "每周日 Every Sunday";
  }
};

function ClassDetailREScreen(props) {
  const navigation = props.navigation;
  const route = props.route;
  const selectedClass = route.params.item;
  const remaining = selectedClass.capacity - selectedClass.checkedIn.length;
  const registered = selectedClass.checkedIn;
  const theClass = props.route.params.item;

  return (
    <Screen style={{ backgroundColor: "lightgray" }}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.detailsContainer}>
            <Text style={styles.titleA}>{printDay(theClass.day)}</Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"课名 Name：                " + theClass.className}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"老师 Teacher：             " + theClass.teacher}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"等级 Level：                 " + theClass.level}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"时间 Time：                  " + theClass.time}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"时长 Duration：            " + theClass.duration}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"名额 Openings：          " +
                remaining +
                " / " +
                theClass.capacity}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"报名人数 Registered：  " + theClass.checkedIn.length}
            </Text>
            <View style={styles.separator} />
          </View>
        </View>

        <Text style={styles.titleC}>签到学生 Registered Students：</Text>
        <ScrollView>
          <View style={styles.viewContainer}>
            {registered.map((item, key) => (
              <Text
                key={key}
                style={styles.subTitle}
                onPress={() => console.log("the student code: ", item)}
              >
                {key + 1 + ". "} {item}
              </Text>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonT}
          onPress={() => navigation.navigate("EditClassRE", { selectedClass })}
        >
          <Text style={styles.text}>编辑 Edit</Text>
        </TouchableOpacity>
        {/* <Button
          title="编辑 Edit"
          onPress={() => navigation.navigate("EditClass", { selectedClass })}
        /> */}
        <Button title="返回 Go back" onPress={() => navigation.goBack()} />
        <Text></Text>
      </ScrollView>
    </Screen>
  );
}

export default connect(mapStateToProps)(ClassDetailREScreen);

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 1,
    overflow: "hidden",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 20,
  },
  subTitle: {
    color: "darkblue",
    fontSize: 2 * sizing.vh,
  },
  title: {
    marginBottom: 2,
  },
  titleA: {
    marginBottom: 2,
    textAlign: "center",
    fontWeight: "500",
  },
  viewContainer: {
    backgroundColor: "lightgray",
    flexDirection: "column",
    alignSelf: "center",
    flex: 1,
    padding: 5 * sizing.vh,
    paddingHorizontal: 20 * sizing.vw,
  },
  titleC: {
    textAlign: "center",
  },
  buttonT: {
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 1 * sizing.vh,
    margin: 1 * sizing.vh,
    marginHorizontal: 30 * sizing.vw,
    borderRadius: 2 * sizing.vh,
  },
  text: { textAlign: "center", fontSize: 2 * sizing.vh },
  separator: {
    height: 1,
    backgroundColor: "black",
  },
});
