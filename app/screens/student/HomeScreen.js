import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Button, View } from "react-native";
import { Image, Text } from "react-native-elements";
import Screen from "../../components/Screen";
import sizing from "../../config/sizing";
import colors from "../../config/colors";
import { NavigationEvents } from "react-navigation";
import { UPDATE_DATE_CHECKIN } from "../../store/actions";
import moment from "moment";
import store from "../../store/store";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}
function HomeScreen(props) {
  const navigation = props.navigation;
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + "-" + month + "-" + date;
    //format: yyyy-mm-dd
  };
  // Updating the weekly classes' date to clear checkedIn list
  // finds class set as ie. Tue and change the date to today's date and clear the checked in list.
  const updateDate = () => {
    return store.getState().classes.filter((target) => {
      if (
        target.day == new Date().getDay() &&
        target.date !== getCurrentDate()
      ) {
        store.dispatch(
          UPDATE_DATE_CHECKIN(
            target.id,
            moment(getCurrentDate()).format("YYYY-MM-DD").toString()
          )
        );
      }
    });
  };

  const navigating = () => {
    updateDate();
    navigation.navigate("ClassList");
  };
  const [aNews, setANews] = useState(store.getState().news);
  const getNews = () => {
    if (aNews !== store.getState().news) {
      setANews(store.getState().news);
    }
  };
  // getNews();

  useEffect(() => {
    getNews();
    return () => {
      getNews();
    };
  });

  return (
    <Screen style={styles.box}>
      {/* <NavigationEvents
        onWillFocus={() => {
          getNews();
        }}
      /> */}

      <Image
        source={require("../../assets/akf_studio.png")}
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("ClassList")}
        onPress={() => navigating()}
      >
        <Text style={styles.text}>{"今日课程 \n Classes"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditRegistration")}
      >
        <Text style={styles.text}>{"查看报课 \n Check Status"}</Text>
      </TouchableOpacity>
      <View style={styles.textF}>
        <Text style={styles.textB}>公告 Notice :</Text>
      </View>
      <Text style={styles.textC}>{props.news}</Text>
    </Screen>
  );
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  box: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    padding: 1,
    backgroundColor: "lightgray",
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#DDDDDD",
    backgroundColor: "#FBC740",
    paddingHorizontal: 1 * sizing.vw,
    paddingVertical: 1 * sizing.vw,
    margin: 2 * sizing.vw,
    marginHorizontal: 50 * sizing.vw,
    borderRadius: 5 * sizing.vw,
    width: 30 * sizing.vh,
  },
  image: {
    width: 55 * sizing.vw,
    height: 20 * sizing.vw,
    marginBottom: 5 * sizing.vw,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 2 * sizing.vh,
    color: "#212121",
    fontStyle: "italic",
  },
  textB: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 2.5 * sizing.vh,
  },
  textF: {
    justifyContent: "center",
    marginTop: 2 * sizing.vh,
    margin: 1 * sizing.vh,
    padding: 2 * sizing.vh,
    paddingHorizontal: 3 * sizing.vh,
    // backgroundColor: "#DDDDDD",
    borderRadius: 2 * sizing.vh,
  },
  textC: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 2 * sizing.vh,
    margin: 1 * sizing.vh,
    marginBottom: 2 * sizing.vh,
    fontStyle: "italic",
  },
  textD: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 2 * sizing.vh,
    fontStyle: "italic",
  },
});
