import React, { useEffect, useRef } from "react";

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
  const [inputs, setInputs] = useState("");

  const [ingredients, setIngredients] = useState([""]);

  const [recipe, setRecipe] = useState("");

  const inputRef = useRef(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // padding: 32,
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

    ingredientsStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 32,
    },

    inputStyle: {
      padding: '5%',
      borderBlockColor: 'black'
    }

    // logoText: {
    //   borderStyle: 'solid',
    //   borderWidth: 1,
    //   padding: 1,
    //   borderColor: 'black'
    // }
  });

  const sendData = async () => {
    try {
      // const { data } = await axios.post("http://localhost:3001/recipe", {
      //   ingredientState,
      //   id: "2",
      // });
      // if (data) setRecipe(data);
      // console.log(data)
    } catch (error) {
      throw new Error("Failed to get data");
    }
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const handleRemoveItem = (itemToRemove: String) => {
    const newIngredientsArray = ingredients.filter(
      (item) => item !== itemToRemove
    );
    setIngredients(newIngredientsArray);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Text style={{ fontSize: 50, fontFamily: 'Cochin' }}>Recipe Me</Text>
        {/* <Text style={{ fontSize: 20 }}>History</Text> */}
      </View>
      <TextInput
        ref={inputRef}
        value={inputs}
        onChangeText={setInputs}
        placeholder="Type in your ingredients..."
        style={styles.inputStyle}
      ></TextInput>
      {recipe && recipe}
      <KeyboardAvoidingView
        style={styles.keybavoidview}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {ingredients.map((item, id) => {
          return (
            <View key={id} style={styles.ingredientsStyle}>
              <Text>{item}</Text>
              {item && (
                <View style={{ padding: 4 }}>
                  <Text
                    onPress={() => {
                      handleRemoveItem(item);
                    }}
                    style={{ fontSize: 17, fontWeight: "bold" }}
                  >
                    X
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        <Button
          title="Add Ingredient"
          onPress={() => {
            if (inputs.length > 0 && inputs.trim()) {
              ingredients.push(inputs)
              console.log(inputs)
              setInputs('')
            } else {
              alert("Please type in something :)");
            }

            if (inputRef.current) {
              const textInputElement = inputRef.current as TextInput;
              textInputElement.clear();
            }
          }}
        ></Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
