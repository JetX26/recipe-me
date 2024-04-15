import React, { useEffect, useRef } from "react";
import { BlurView } from 'expo-blur'


import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  Modal
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [inputs, setInputs] = useState<string>("");

  const [ingredients, setIngredients] = useState<string[]>([]);

  const [recipe, setRecipe] = useState<string>("");

  const inputRef = useRef<TextInput | null>(null);

  const [isOpen, setIsOpen] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 32,
      height: useWindowDimensions().height,
      alignItems: "center",
    },

    keybavoidview: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },

    nav: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "space-between",
      width: '100%',
      padding: '3%'
    },

    ingredientsContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      height: 'auto'
    },

    navItems: {
      flex: 1
    },

    inputStyle: {
      padding: "3%",
      minWidth: "50%",
      borderRadius: 12,
      borderWidth: 0.7,
      margin: 12
    },


    pressedHistoryBtn: {
      scaleX: 2,
    },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%', // adjust width as needed
      maxHeight: '80%', // adjust maximum height as needed
    },

  });


  const getRecipe = async () => {
    try {
      clearInputs();
      setIngredients([]);
      const { data } = await axios.post("http://localhost:3000/recipe", {
        ingredients: ingredients,
      });
      if (data) setRecipe(data);
      console.log(data);
    } catch (error) {
      throw new Error("Failed to get data");
    }
  };


  const clearInputs = () => {
    if (inputRef.current) {
      const textInputElement = inputRef.current;
      textInputElement.clear();
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
        <Text style={{ fontSize: 50, zIndex: 99 }}>Recipe Me</Text>
        <Pressable onPress={() => {
          setIsOpen(true)
        }}>
          <Image
            source={require("./assets/cooking-pan.png")}
            style={{ width: 30, height: 30 }}
          ></Image>
          <Image
            source={require("./assets/history-icon.png")}
            style={{ width: 30, height: 30 }}
          ></Image>
        </Pressable>
      </View>

      {
        isOpen && <ScrollView style={{ borderWidth: 1, borderRadius: 5 }}>

          <Modal visible={isOpen} animationType="slide">

            <View style={{ flex: 1, backgroundColor: 'blur', padding: 60, height: 'auto' }}>
              {ingredients.map((item, id) => {
                return (
                  <View key={id} style={styles.ingredientsContainerStyle}>
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
              <Button onPress={() => {
                setIsOpen(false)
              }} title="Close">
              </Button>
            </View>

          </Modal>

        </ScrollView>
      }

      <View>
        <TextInput
          ref={inputRef}
          value={inputs}
          onChangeText={setInputs}
          placeholder="Type in your ingredients..."
          style={styles.inputStyle}
        ></TextInput>
        {recipe && (
          <ScrollView>
            <Text>{recipe}</Text>
          </ScrollView>
        )}
      </View>
      <KeyboardAvoidingView
        style={styles.keybavoidview}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, gap: 12 }}>
          <Button
            title="Add Ingredient"
            onPress={() => {
              if (inputs.length > 0 && inputs.trim()) {
                ingredients.push(inputs);
                console.log(inputs);
                setInputs("");
              } else {
                alert("Please type in something :)");
              }
              clearInputs();
            }}
          ></Button>
          {ingredients.length > 0 && <Button title="Get Recipe" onPress={getRecipe}></Button>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}
