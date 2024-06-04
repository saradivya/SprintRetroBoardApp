
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const Dialog = ({
  isModalVisible,
  toggleModal,
  sprintBoardNumber,
  formComponent: FormComponent,
  formTittle,
}) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{formTittle}</Text>
          {FormComponent && (
            <FormComponent
              toggleModal={toggleModal}
              sprintBoardNumber={sprintBoardNumber}
            />
          )}
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "white",
    elevation: 20,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Dialog;
