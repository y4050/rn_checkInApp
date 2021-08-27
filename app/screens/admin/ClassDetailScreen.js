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

export default function ClassDetailScreen({ route, navigation }) {
  const selectedClass = route.params.item;
  const remaining = selectedClass.capacity - selectedClass.checkedIn.length;
  const registered = selectedClass.checkedIn;
  return (
    <Screen style={{ backgroundColor: "lightgray" }}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>
              {"日期 Date：                " + selectedClass.date}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"课名 Name：                " + selectedClass.className}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"老师 Teacher：             " + selectedClass.teacher}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"等级 Level：                 " + selectedClass.level}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"时间 Time：                  " + selectedClass.time}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"时长 Duration：            " + selectedClass.duration}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"名额 Openings：          " +
                remaining +
                " / " +
                selectedClass.capacity}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title}>
              {"报名人数 Registered：  " + selectedClass.checkedIn.length}
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
          onPress={() => navigation.navigate("EditClass", { selectedClass })}
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
