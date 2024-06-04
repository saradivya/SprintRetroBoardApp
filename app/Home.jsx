import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSprintBoard } from "./actions/sprintBoard.js";
import {removeSnackBarMessage} from "./actions/snackBarMessage.js";
import Header from "./header";
import SprintBoard from "./SprintBoard";
import CardView from "./CardView";
import {Snackbar} from "react-native-paper"

const Home = () => {
 const [selectedBoard, setSelectedBoard] = useState(null);
  const loading = useSelector((state) => state.sprintBoardReducer.loading);
   const sprintBoards = useSelector(
    (state) => state.sprintBoardReducer.sprintBoards
     );
     const snackbarVisibility = useSelector(
       (state) => state.snackBarReducer.visible
     );
      const snackbarMessage = useSelector(
        (state) => state.snackBarReducer.snackbarMessage
      );

 const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSprintBoard());
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <Header
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            sprintBoards={sprintBoards}
          />
          {selectedBoard ? (
            <>
              <SprintBoard
                boardDetail={sprintBoards.find(
                  (sprintBoard) =>
                    sprintBoard.sprintBoardNumber == selectedBoard
                )}
              />
              <CardView selectedBoard={selectedBoard} />
            </>
          ) : (
            <View>
              <Text>
                Please select existing sprit board to view/ Create new sprint
                board
              </Text>
            </View>
          )}
          <Snackbar
            theme={{ colors: { primary: "green" } }}
            visible={snackbarVisibility}
            onDismiss={() => dispatch(removeSnackBarMessage())}
            duration={5000}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      )}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default Home;