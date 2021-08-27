import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import ClassViewScreen from "../screens/admin/ClassViewScreen";
import ClassDetailScreen from "../screens/admin/ClassDetailScreen";
import StudentListScreen from "../screens/admin/StudentListScreen";
import AddStudentScreen from "../screens/admin/AddStudentScreen";
import NewClassScreen from "../screens/admin/NewClassScreen";
import EditClassScreen from "../screens/admin/EditClassScreen";
import EditStudentScreen from "../screens/admin/EditStudentScreen";
import DailyLimitScreen from "../screens/admin/DailyLimitScreen";
import EditNewsScreen from "../screens/admin/EditNewsScreen";
import NewClassREScreen from "../screens/admin/NewClassREScreen";
import EditClassREScreen from "../screens/admin/EditClassREScreen";
import ClassDetailREScreen from "../screens/admin/ClassDetailREScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();

// let page = () => {
//   if (store.getState().isLoggedIn == true) {
//     return "AdminHome";
//   } else {
//     return "Lock";
//   }
// };

const AdminNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: colors.primary },
    }}
    initialRouteName="AdminHome"
  >
    <Stack.Screen
      name="AdminHome"
      component={AdminHomeScreen}
      options={{ title: "主页 Main" }}
    />
    <Stack.Screen
      name="ClassView"
      component={ClassViewScreen}
      options={{ title: "全部课程 All Classes" }}
    />
    <Stack.Screen
      name="ClassDetail"
      component={ClassDetailScreen}
      options={{ title: "课程详情 Class Detail" }}
    />
    <Stack.Screen
      name="ClassDetailRES"
      component={ClassDetailREScreen}
      options={{ title: "课程详情 Class Detail" }}
    />
    <Stack.Screen
      name="StudentList"
      component={StudentListScreen}
      options={{ title: "学生列表" }}
    />
    <Stack.Screen
      name="AddStudent"
      component={AddStudentScreen}
      options={{ title: "新增学生 Create New Student" }}
    />
    <Stack.Screen
      name="EditStudent"
      component={EditStudentScreen}
      options={{ title: "修改资料 Edit Info" }}
    />
    <Stack.Screen
      name="NewClass"
      component={NewClassScreen}
      options={{ title: "新增课程 Create New Class" }}
    />
    <Stack.Screen
      name="NewClassRE"
      component={NewClassREScreen}
      options={{ title: "新增每周课程 Create New Weekly Class" }}
    />
    <Stack.Screen
      name="EditClass"
      component={EditClassScreen}
      options={{ title: "修改内容 Edit Class" }}
    />
    <Stack.Screen
      name="EditClassRE"
      component={EditClassREScreen}
      options={{ title: "修改内容 Edit Weekly Class" }}
    />
    <Stack.Screen
      name="DailyLimit"
      component={DailyLimitScreen}
      options={{ title: "每日上限 Daily Limit" }}
    />
    <Stack.Screen
      name="EditNews"
      component={EditNewsScreen}
      options={{ title: "公告 Notice" }}
    />
  </Stack.Navigator>
);

export default AdminNavigator;
