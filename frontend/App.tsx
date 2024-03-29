import React from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [ingredients, setIngredients] = useState("");

  const [recipe, setRecipe] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 32,
      height: useWindowDimensions().height,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },

    keybavoidview: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },

    nav: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "5%",
      width: "100%",
    },
  });

  const sendData = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/recipe", {
        ingredients,
        id: "2",
      });
      setRecipe(data);
      console.log(data);
    } catch (error) {
      throw new Error("Failed to get data");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 10,
        }}
      >
        <Text>Logo</Text>
        <Text>History</Text>
      </View>
      {}
      <KeyboardAvoidingView
        style={styles.keybavoidview}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          onChangeText={setIngredients}
          placeholder="Type in your ingredients"
        ></TextInput>
        <Button title="Submit" onPress={sendData}></Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
