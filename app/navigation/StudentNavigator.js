import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassListScreen from "../screens/student/ClassListScreen";
import HomeScreen from "../screens/student/HomeScreen";
import RegisterClassScreen from "../screens/student/RegisterClassScreen";
import EditRegistrationScreen from "../screens/student/EditRegistrationScreen";
import CancelSelection from "../screens/student/CancelSelection";
import colors from "../config/colors";

const Stack = createStackNavigator();

const StudentNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: colors.primary },
    }}
    initialRouteName="Home"
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "主页 Main" }}
    />
    <Stack.Screen
      name="ClassList"
      component={ClassListScreen}
      options={{ title: "今日课程 Classes" }}
    />
    <Stack.Screen
      name="RegisterClass"
      component={RegisterClassScreen}
      initialParams={{ key: "value" }}
      options={({ route }) => ({ title: "课程 Class：" + route.params.name })}
    />
    <Stack.Screen
      name="EditRegistration"
      component={EditRegistrationScreen}
      options={{ title: "查看报名 Check Status" }}
    />
    <Stack.Screen
      name="CancelSelection"
      component={CancelSelection}
      options={{ title: "已报名课程 Registered Classes" }}
    />
  </Stack.Navigator>
);

export default StudentNavigator;
