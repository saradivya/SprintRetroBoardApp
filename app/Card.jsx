import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState, useEffect } from "react";
import {  Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { setSnackBarMessage } from "./actions/snackBarMessage.js";

const Card = ({ title }) => {
   const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sectionName,setSectionName] = useState(title);

  const dispatch = useDispatch();

  const getNotesForSelectedSetion = async (section) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://sprintretroboardapp.onrender.com/sprint/section/${section}/notes`
      );
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



useEffect(() => {
  getNotesForSelectedSetion(title)
 }, [title]);


const deleteNote = async (section, noteId) => {
const response = await fetch(
  `https://sprintretroboardapp.onrender.com/sprint/section/${section}/notes/${noteId}`,
  {
    method: "DELETE",
  }
);
 const message = await response.text();
 dispatch(setSnackBarMessage(message));
};

const saveNote = async (section, note, noteId) => {
const response = await fetch(
  `https://sprintretroboardapp.onrender.com/sprint/section/${section}/notes/${noteId}`,
  {
    method: "PUT",
    body: JSON.stringify(note),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
);
  const message = await response.text();
  dispatch(setSnackBarMessage(message));
  getNotesForSelectedSetion(section);
};

const createNote = async (section, note) => {
  const response = await fetch(
    `https://sprintretroboardapp.onrender.com/sprint/section/${section}/notes`,
    {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const message = await response.text();
  dispatch(setSnackBarMessage(message));
  getNotesForSelectedSetion(section);
};

 

  const addNotes = () => {
    setNotes([...notes, {"note": "","sectionName": sectionName}]);
  };

  const handleTextChange = (index, newNote) => {
    let newNotes = [...notes];
    let editedNote = newNotes[index];
    editedNote["note"] = newNote;
    newNotes[index] = editedNote;
    setNotes(newNotes);
  };

  const handleSavePress = (note) => {
    if(!note.noteId)
      {
        createNote(title,note)
      }
    else{
      saveNote(title, note, note.noteId);
    }
  };

  const handleCancelPress = (index, noteId) => {
    if(noteId)
      deleteNote(title, noteId);
    let newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <View key={title} style={styles.card}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text key={"text:" + title} style={styles.cardTitle}>
            {title}
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={addNotes}>
            <AntDesign name="pluscircle" size={40} color="#1a3eb6fc" />
          </TouchableOpacity>
          {notes.map((eachNote, index) => (
            <View key={index} style={styles.textcontainer}>
              <TextInput
                key={index}
                style={styles.textBox}
                value={eachNote.note}
                onChangeText={(newNote) => handleTextChange(index, newNote)}
                placeholder="Enter text here"
                multiline
              />
              <View key={"view" + index} style={styles.iconsContainer}>
                <TouchableOpacity
                  key={"save" + index}
                  onPress={() => handleSavePress(eachNote)}
                >
                  <Ionicons name="save-outline" size={30} color="#058aeb" />
                </TouchableOpacity>
                <TouchableOpacity
                  key={"close" + index}
                  onPress={() => handleCancelPress(index, eachNote.noteId)}
                >
                  <Ionicons name="close-outline" size={30} color="#058aeb" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    color: "#1a3eb6fc",
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: "#5fbac136",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  textBox: {
    height: 110,
    padding: 3,
    margin: 10,
    overflow: "scroll",
  },
  textcontainer: {
    height: 120,
    borderColor: "#1a3eb6fc",
    borderWidth: 4,
    borderRadius: 5,
    margin: 10,
  },
  addButton: {
    padding: 1,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "end",
    margin: "2px",
  },
});

export default Card;
