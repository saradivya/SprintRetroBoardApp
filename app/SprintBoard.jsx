import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Dialog from "./Dialog";
import CreateSectionForm from "./CreateSectionForm";

const SprintBoard = ({boardDetail}) => {
    const [isModalVisible, setModalVisible] = useState(false);


    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  return (
    <View style={styles.container}>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>
          Sprint: {boardDetail.sprintBoardNumber}
        </Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>{boardDetail.sprintTitle}</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuContent}>
          Context: {boardDetail.sprintContext}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Add Section</Text>
        </Pressable>
        <Dialog
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          sprintBoardNumber={boardDetail.sprintBoardNumber}
          formComponent={CreateSectionForm}
          formTittle={"Sprint Retro Section"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#ffa500ab",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  menuContent: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
  },
  buttonContainer: {
    padding: 10,
    alignItems: "flex-end",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#3014ea",
    left: "8px",
    padding: "4px",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default SprintBoard;
