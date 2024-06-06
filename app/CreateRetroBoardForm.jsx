import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { fetchSprintBoard } from "./actions/sprintBoard.js";
import { setSnackBarMessage} from "./actions/snackBarMessage.js";

const CreateRetroBoardForm = ({ toggleModal, sprintBoardNumber }) => {
  const [sprintNumber, setSprintNumber] = useState("");
  const [sprintName, setSprintName] = useState("");
  const [sprintContext, setSprintContext] = useState("");
  const dispatch = useDispatch();

  const saveRetroBoard = async (sprintBoard) => {
    const response = await fetch(
      "https://sprintretroboardapp.onrender.com/sprint/retroBoard",
      {
        method: "POST",
        body: JSON.stringify(sprintBoard),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const message = await response.text();
    dispatch(setSnackBarMessage(message));
    dispatch(fetchSprintBoard());
  };

  const handleSubmit = () => {
    if (sprintNumber && sprintContext && sprintName) {
      let sprintBoard = {
        sprintBoardNumber: sprintNumber,
        sprintTitle: sprintName,
        sprintContext: sprintContext,
      };
      saveRetroBoard(sprintBoard);
      toggleModal();
    } else {
      Alert.alert("Error", "Please fill all fields");
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Sprint Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Sprint Number"
        value={sprintNumber}
        keyboardType="number-pad"
        maxLength={5}
        onChangeText={setSprintNumber}
      />
      <Text style={styles.label}>Sprint Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Sprint Name"
        value={sprintName}
        onChangeText={setSprintName}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Sprint Context:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Sprint Context"
        value={sprintContext}
        onChangeText={setSprintContext}
        maxLength={100}
        multiline={true}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default CreateRetroBoardForm;
