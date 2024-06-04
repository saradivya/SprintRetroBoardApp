// components/Header.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import Dialog from "./Dialog";
import CreateRetroBoardForm from "./CreateRetroBoardForm";

const Header = ({selectedBoard,setSelectedBoard,sprintBoards}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const dropdownItems = sprintBoards.map((item) => ({
    label: item.sprintTitle,
    value: item.sprintBoardNumber,
  }));

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="add-task" size={28} style={styles.icon} />
        <Text style={styles.headerText}>Retro Board</Text>
      </View>
      <View style={styles.dropdown}>
        <RNPickerSelect
          value={selectedBoard}
          onValueChange={(value) => setSelectedBoard(value)}
          items={dropdownItems}
          placeholder={{ label: "Select a board...", value: "" }}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>New Sprint Board</Text>
        </Pressable>
        <Dialog
          formTittle="Sprint Retro Board"
          formComponent={CreateRetroBoardForm}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 10,
    backgroundColor: "#0000ff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  icon: {
    justifyContent: "flex-start",
    color: "white",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    left: "8px",
  },
  iconContainer: {
    flex: 5,
    flexDirection: "row",
    paddingHorizontal: 4,
    color: "white",
  },
  dropdown: {
    flex: 3,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ea1414",
    left: "8px",
    width: "90%",
    padding: "4px",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Header;
