import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function ClassCard({ title, time, duration, capacity, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {"课名：" + title}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {"开始时间：" + time}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {"时长：" + duration}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {"名额：" + capacity}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  subTitle: {
    color: colors.primary,
    // fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default ClassCard;
