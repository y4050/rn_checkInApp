import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AdminNavigator from "./AdminNavigator";
import StudentNavigator from "./StudentNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    // tabBarOptions={{
    //   inactiveTintColor: "lightgray",
    //   activeBackgroundColor: "#323232",
    //   inactiveBackgroundColor: "gray",
    //   style: {
    //     backgroundColor: "gray",
    //   },
    // }}
  >
    <Tab.Screen
      name="Student"
      component={StudentNavigator}
      options={{
        title: "主页 Home",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Admin"
      component={AdminNavigator}
      options={{
        title: "Admin",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
