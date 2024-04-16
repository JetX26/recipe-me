import React, { useEffect, useRef } from "react";

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
  Modal,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [inputs, setInputs] = useState<string>("");

  const [ingredients, setIngredients] = useState<string[]>([]);

  const [recipe, setRecipe] = useState<string>("");

  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const inputRef = useRef<TextInput | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [savedRecipesModal, setSavedRecipesModal] = useState(false);

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
      justifyContent: "center",
    },

    nav: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: "3%",
    },

    ingredientsContainerStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      width: "100%",
    },

    navItems: {
      flex: 1,
    },

    inputStyle: {
      padding: "3%",
      minWidth: "50%",
      borderRadius: 12,
      borderWidth: 0.7,
      margin: 12,
    },

    inputStyleContainer: {
      flex: 1,
    },

    pressedHistoryBtn: {
      scaleX: 2,
    },

    modalContent: {
      backgroundColor: "#e5e5e5",
      padding: 60,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "100%",
    },

    iOSStyling: {
      padding: 32,
      paddingTop: "20%",
    },
  });

  const getRecipe = async () => {
    try {
      clearInputs();
      setIngredients([]);
      const { data } = await axios.post(
        "https://recipe-me.onrender.com/recipe",
        {
          ingredients: ingredients,
        }
      );
      if (data) setRecipe(data);
    } catch (error) {
      throw new Error("Failed to get data");
    }
  };

  const clearInputs = (): void => {
    if (inputRef.current) {
      const textInputElement = inputRef.current;
      textInputElement.clear();
    }
  };

  const handleRemoveItem = (itemToRemove: String) => {
    const newIngredientsArray = ingredients.filter(
      (item) => item !== itemToRemove
    );
    setIngredients(newIngredientsArray);
  };

  const handleRemoveSavedRecipe = (itemToRemove: String) => {
    const newRecipesArray = ingredients.filter((item) => item !== itemToRemove);
    setSavedRecipes(newRecipesArray);
  };

  useEffect(() => {
    console.log(savedRecipes);
  }, [savedRecipes]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Text style={{ fontSize: 50, zIndex: 99 }}>Recipe Me</Text>
        <Pressable
          onPress={() => {
            setModalVisible(true);
            console.log("modal should be visible");
          }}
        >
          <Image
            source={require("./assets/cooking-pan.png")}
            style={{ width: 30, height: 30 }}
          ></Image>
        </Pressable>
        <Pressable
          onPress={() => {
            setSavedRecipesModal(true);
          }}
        >
          <Image
            source={require("./assets/history-icon.png")}
            style={{ width: 30, height: 30 }}
          ></Image>
        </Pressable>
      </View>

      <View>
        <TextInput
          ref={inputRef}
          value={inputs}
          onChangeText={setInputs}
          placeholder="Type in your ingredients..."
          style={styles.inputStyle}
        ></TextInput>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
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
          {ingredients.length > 0 && (
            <Button title="Get Recipe" onPress={getRecipe}></Button>
          )}
        </View>
      </KeyboardAvoidingView>

      {ingredients && (
        <ScrollView style={{ paddingHorizontal: 24, flex: 1 }}>
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
          })}
        </ScrollView>
      )}

      <View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={[
              styles.container,
              Platform.OS === "ios" && styles.iOSStyling,
            ]}
          >
            <Text>{recipe}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column-reverse" }}>
            <Button
              onPress={() => {
                setModalVisible(false);
              }}
              title="Close"
            ></Button>
            <Button
              disabled={savedRecipes.includes(recipe)}
              onPress={() => {
                if (!savedRecipes.includes(recipe)) {
                  setSavedRecipes((prev) => {
                    return [...prev, recipe];
                  });
                }
                setModalVisible(false);
              }}
              title="Save Recipe"
            ></Button>
          </View>
        </Modal>
      </View>

      <Modal
        animationType="slide"
        visible={savedRecipesModal}
        onRequestClose={() => {
          setSavedRecipesModal(!savedRecipesModal);
        }}
      >
        <ScrollView>
          {savedRecipes.map((item, id) => {
            return (
              <View key={id}>
                <Text>{item}</Text>
                <Button title="Delete Recipe"></Button>
              </View>
            );
          })}
          <View style={{ flex: 1, flexDirection: "column-reverse" }}>
            <Button
              onPress={() => {
                setSavedRecipesModal(false);
              }}
              title="Close"
            ></Button>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}
