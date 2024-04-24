import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

import { useStore } from "../helper/zustand";

interface props {
  ingredient: string;
}

const Ingredient = ({ ingredient }: props) => {
  const { ingredients, addIngredient, removeIngredient } = useStore();

  const styles = StyleSheet.create({
    ingredientsContainerStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      width: useWindowDimensions().width / 1.5,
    },
  });

  return (
    <View style={styles.ingredientsContainerStyle}>
      <Text>{ingredient}</Text>
      {ingredient && (
        <View style={{ padding: 4 }}>
          <Text
            onPress={() => {
              removeIngredient(ingredient);
            }}
            style={{
              fontSize: 17,
              fontWeight: "bold",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 2,
            }}
          >
            X
          </Text>
        </View>
      )}
    </View>
  );
};

export default Ingredient;
