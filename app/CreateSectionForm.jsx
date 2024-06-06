import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import CheckBox from "react-native-check-box";
import RNPickerSelect from "react-native-picker-select";
import { setSnackBarMessage } from "./actions/snackBarMessage.js";
import {fetchSprintBoardSections} from "./actions/sprintBoardSection.js";
import { useDispatch } from "react-redux";

const CreateSectionForm = ({ toggleModal , sprintBoardNumber }) => {
  const [sectionName, setSectionName] = useState("");
  const [thumbsUpRequired, setThumbsUpRequired] = useState(false);
  const [votingRequired, setVotingRequired] = useState(false);
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  const saveRetroSectionToSprintBoard = async (sectionDetail) => {
    const response = await fetch(
      "https://sprintretroboardapp.onrender.com/sprint/section",
      {
        method: "POST",
        body: JSON.stringify(sectionDetail),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const message = await response.text();
    dispatch(setSnackBarMessage(message));
    dispatch(fetchSprintBoardSections(sectionDetail.sprintBoardNumber));

  };

  const handleSubmit = () => {
    if (sectionName && color) {
      let sectionDetail = {
        sprintBoardNumber: sprintBoardNumber,
        sectionName: sectionName,
        color: color,
        thumbsUpRequired: thumbsUpRequired,
        votingRequired: votingRequired,
      };
      saveRetroSectionToSprintBoard(sectionDetail);
      toggleModal();
    } else {
      Alert.alert("Error", "Please fill all fields");
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Section Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Section Name"
        value={sectionName}
        maxLength={30}
        onChangeText={setSectionName}
      />
      <View style={styles.dropdown}>
        <Text style={styles.label}>Enter color:</Text>
        <RNPickerSelect
          style={styles.input}
          onValueChange={(value) => setColor(value)}
          items={[
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
            { label: "Green", value: "green" },
          ]}
          placeholder={{ label: "Select Color...", value: "" }}
        />
      </View>
      <CheckBox
        leftText={"Is Thumbs Up Required?:"}
        style={styles.checkbox}
        isChecked={thumbsUpRequired}
        onClick={() => setThumbsUpRequired(!thumbsUpRequired)}
      />
      <CheckBox
        leftText={"Is Voting Required?:"}
        style={styles.checkbox}
        isChecked={votingRequired}
        onClick={() => setVotingRequired(!votingRequired)}
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
    height: "40px",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: "20px",
    padding: "10px",
    borderRadius: 4,
  },
  dropdown: {
    marginBottom: "20px",
    padding: "10px",
  },
  checkbox: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default CreateSectionForm;
