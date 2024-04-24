import React from "react";

import { useStore } from "../helper/zustand";

import {
  View,
  Text,
  Button,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";

interface props {
  recipeItem: string;
}

const SavedRecipe = ({ recipeItem }: props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#fff",
      padding: 32,
      height: useWindowDimensions().height,
    },
    iOSPadding: {
      padding: 32,
      paddingTop: "20%",
    },
  });

  const { recipe, removeRecipe } = useStore();

  return (
    <View
      style={[styles.container, Platform.OS === "ios" && styles.iOSPadding]}
    >
      <Text>{recipe}</Text>
      <Button
        onPress={() => {
          removeRecipe(recipeItem);
        }}
        title="Delete Recipe"
      ></Button>
    </View>
  );
};

export default SavedRecipe;
