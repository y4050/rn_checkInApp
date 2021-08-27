import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  id,
  studentCode,
  firstName,
  lastName,
  phone,
  email,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={0}>
              {"代码：" + studentCode}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
              {"姓名：" + firstName + " " + lastName}
            </Text>
            {phone && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {"电话：" + phone}
              </Text>
            )}
            {email && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {"Email：" + email}
              </Text>
            )}
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
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
