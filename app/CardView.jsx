import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchSprintBoardSections } from "./actions/sprintBoardSection";


const CardView = ({ selectedBoard }) => {

    const loading = useSelector(
      (state) => state.sprintBoardSectionReducer.loading
    );
    const sprintBoardSections = useSelector(
      (state) => state.sprintBoardSectionReducer.sprintBoardSections
    );

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchSprintBoardSections(selectedBoard));
    }, [selectedBoard]);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.content}>
          {sprintBoardSections.map((section, index) => (
            <Card key={"section-" + index} title={section.sectionName} />
          ))}
        </View>
      )}
    </ScrollView>
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

export default CardView;
