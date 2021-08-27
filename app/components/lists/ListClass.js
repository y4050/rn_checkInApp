import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";
import sizing from "../../config/sizing";

function ListClass({
  id,
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
            <Text style={styles.title} numberOfLines={0}>
              {"   日期 Date：                 " + date}
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
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
});

export default ListClass;
