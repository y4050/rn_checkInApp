import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";
import sizing from "../../config/sizing";

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

function ListClassWeekly({
  id,
  day,
  date,
  time,
  className,
  teacher,
  level,
  duration,
  capacity,
  note,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <Text style={styles.titleA} numberOfLines={0}>
              {"   " + printDay(day)}
            </Text>
            <View style={styles.separator}></View>
            <Text style={styles.subTitle} numberOfLines={1}>
              {"   课名 Class Name：      " + className}
            </Text>
            <View style={styles.separator}></View>
            <Text style={styles.subTitle} numberOfLines={1}>
              {"   老师 Teacher:               " + teacher}
            </Text>
            <View style={styles.separator}></View>
            <Text style={styles.subTitle} numberOfLines={1}>
              {"   等级 Level：                " + level}
            </Text>
            <View style={styles.separator}></View>
            <Text style={styles.subTitle} numberOfLines={1}>
              {"   时间 Time：                 " + time}
            </Text>
            {/* <View style={styles.separator}></View>
            <Text style={styles.subTitle} numberOfLines={2}>
              {"时长 Duration：  " + duration}
            </Text> */}
            {/* <View style={styles.separator}></View>
            <Text style={styles.subTitle} numberOfLines={2}>
              {"名额 Openings： " + capacity}
            </Text> */}
            {/* <View style={styles.separator}></View>
            <Text style={styles.subTitle} numberOfLines={2}>
              {"注意事项 Note： " + note}
            </Text> */}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 2 * sizing.vh,
    backgroundColor: colors.light,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  subTitle: {
    fontWeight: "400",
  },
  title: {
    fontWeight: "600",
  },
  titleA: {
    fontWeight: "600",
    textAlign: "center",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
});

export default ListClassWeekly;
