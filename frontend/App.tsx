import { useState, useRef, useEffect } from "react";
import { useStore } from "./helper/zustand";
import axios from "axios";

import Icon from "./components/Icon";
import SavedRecipe from "./components/SavedRecipe";

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
  ActivityIndicator,
} from "react-native";
import Ingredient from "./components/Ingredient";
import React from "react";

export default function App() {
  const {
    modalVisible,
    setModalVisible,
    savedRecipeModal,
    setSavedRecipeModal,
  } = useStore();

  const [inputs, setInputs] = useState<string>("");

  const [recipe, setRecipe] = useState<string>("");

  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const inputRef = useRef<TextInput | null>(null);

  const [loading, setLoading] = useState(false);

  const { ingredients, addIngredient, clearIngredients } = useStore();

  const styles = StyleSheet.create({
    container: {
      // alignItems: "center",
      justifyContent: "space-between",
      // backgroundColor: "#fff",
      // padding: 32,
      height: useWindowDimensions().height,
    },

    keybavoidview: {
      flex: 1,
      justifyContent: "center",
    },

    nav: {
      flexDirection: "row",
      alignItems: "center",
      width: useWindowDimensions().width,
      justifyContent: "space-between",
      paddingHorizontal: "5%",
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

    iOSPadding: {
      padding: 32,
      paddingTop: "20%",
    },
    iOSFlex: {
      flex: 1,
      justifyContent: "space-between",
      padding: 32,
      paddingTop: "20%",
    },
  });

  const clearInputs = (): void => {
    if (inputRef.current) {
      const textInputElement = inputRef.current;
      textInputElement.clear();
    }
  };

  const windowDimension = useWindowDimensions().width;

  const handleRequestAI = async () => {
    setLoading(true);
    try {
      clearInputs();
      clearIngredients();
      const { data } = await axios.post(
        "https://recipe-me.onrender.com/recipe",
        {
          ingredients: ingredients,
        }
      );
      if (data) setRecipe(data);
      setLoading(false);
    } catch (error) {
      throw new Error("Failed to get data");
    }
  };

  useEffect(() => {
    console.log(savedRecipes);
  }, [savedRecipes]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Text style={{ fontSize: 50, zIndex: 99 }}>Recipe Me</Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Icon
            modal={() => {
              setModalVisible(true);
              console.log("recipe opened");
            }}
            icon={require("./assets/cooking-pan.png")}
          ></Icon>
          <Icon
            modal={() => {
              setSavedRecipeModal(true);
              console.log("history opened");
            }}
            icon={require("./assets/history-icon.png")}
          ></Icon>
        </View>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          {ingredients && (
            <View>
              {ingredients.map((item, id) => {
                return <Ingredient ingredient={item} key={id}></Ingredient>;
              })}
            </View>
          )}
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <TextInput
            ref={inputRef && inputRef}
            value={inputs}
            onChangeText={setInputs}
            placeholder="Type in your ingredients..."
            style={styles.inputStyle}
          ></TextInput>
          <Button
            title="Add Ingredient"
            onPress={() => {
              if (inputs.length > 0 && inputs.trim()) {
                addIngredient(inputs);
                console.log(inputs);
                setInputs("");
              } else {
                alert("Please type in something :)");
              }
              clearInputs();
            }}
          ></Button>
          {ingredients.length > 0 && (
            <Button title="Get Recipe" onPress={handleRequestAI}></Button>
          )}
        </View>
      </KeyboardAvoidingView>
      <View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={[
              styles.container,
              Platform.OS === "ios" && styles.iOSPadding,
            ]}
          >
            {loading ? (
              <View style={{ gap: 12, alignItems: "center" }}>
                <Text>Getting recipe...</Text>
                <ActivityIndicator size="small"></ActivityIndicator>
              </View>
            ) : (
              <Text>{recipe}</Text>
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column-reverse",
              paddingBottom: "10%",
            }}
          >
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
                alert("Recipe saved");
              }}
              title="Save Recipe"
            ></Button>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          visible={savedRecipeModal}
          onRequestClose={() => {
            setSavedRecipeModal(false);
          }}
        >
          <ScrollView>
            {savedRecipes.length === 0 ? (
              <View
                style={[
                  styles.container,
                  Platform.OS === "ios" && styles.iOSFlex,
                ]}
              >
                <Text>No saved recipes</Text>
                <Button
                  onPress={() => {
                    setSavedRecipeModal(false);
                  }}
                  title="Close"
                ></Button>
              </View>
            ) : (
              <View
                style={{
                  borderColor: "black",
                  borderBlockColor: "black",
                  borderWidth: 1,
                  flex: 1,
                }}
              >
                {savedRecipes.map((item, id) => {
                  return <SavedRecipe recipeItem={item} key={id}></SavedRecipe>;
                })}
                <Button
                  onPress={() => {
                    setSavedRecipeModal(false);
                  }}
                  title="Close"
                ></Button>
              </View>
            )}
          </ScrollView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
