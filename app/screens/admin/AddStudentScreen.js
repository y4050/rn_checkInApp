import React from "react";
import { StyleSheet, Text, Button } from "react-native";
import Screen from "../../components/Screen";
import { Form, FormField, SubmitButton } from "../../components/forms";

export default function AddStudentScreen({ navigation }) {
  return (
    <Screen>
      <Text>Register new Student Screen</Text>
      <Form
        initialValues={{
          firstName: "",
          lastName: "",
          studentCode: "",
          phoneNumber: "",
          email: "",
          note: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        <FormField
          name="firstName"
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          keyboardType="default"
          placeholder="First Name"
          textContentType="givenName"
        />
        <FormField
          name="lastName"
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          keyboardType="default"
          placeholder="Last Name"
          textContentType="familyName"
        />
        <FormField
          name="studentCode"
          autoCapitalize="none"
          autoCorrect={false}
          icon="ticket-confirmation"
          keyboardType="number-pad"
          placeholder="Student Code"
          textContentType="none"
        />
        <FormField
          name="phoneNumber"
          autoCapitalize="none"
          autoCorrect={false}
          icon="cellphone"
          keyboardType="number-pad"
          placeholder="Phone Number"
          textContentType="telephoneNumber"
        />
        <FormField
          name="email"
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          name="note"
          autoCapitalize="none"
          autoCorrect={true}
          icon="note-text"
          keyboardType="default"
          placeholder="Note"
          textContentType="none"
        />
        <SubmitButton title="Submit" />
      </Form>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

const styles = StyleSheet.create({});
