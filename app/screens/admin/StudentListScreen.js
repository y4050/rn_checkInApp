import React, { useState } from "react";
import { StyleSheet, Text, FlatList, Button } from "react-native";
import Screen from "../../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";

const initialStudents = [
  {
    id: 1,
    studentCode: "1111",
    firstName: "ABC",
    lastName: "abc",
    phone: "123123",
    email: "abc@email.com",
  },
  {
    id: 2,
    studentCode: "2222",
    firstName: "CBA",
    lastName: "cba",
    phone: "321321",
    email: "cba@email.com",
  },
];

export default function StudentListScreen({ navigation }) {
  const [students, setStudents] = useState(initialStudents);

  const handleDelete = (item) => {
    // Delete the student from students
    setStudents(students.filter((i) => i.id !== item.id));
  };

  return (
    <Screen>
      <Text>Student List Screen</Text>
      <Button
        title="Add Student"
        onPress={() => navigation.navigate("AddStudent")}
      />
      <FlatList
        data={students}
        keyExtractor={(student) => student.id}
        renderItem={({ item }) => (
          <ListItem
            studentCode={item.studentCode}
            firstName={item.firstName}
            lastName={item.lastName}
            phone={item.phone}
            email={item.email}
            onPress={() => navigation.navigate("EditStudent")}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

const styles = StyleSheet.create({});
