import { create } from "zustand";

type UseStoreType = {
  modalVisible: boolean;
  savedRecipeModal: boolean;
  setModalVisible: (data: boolean) => void;
  setSavedRecipeModal: (data: boolean) => void;
  ingredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearIngredients: () => void;
  recipe: string[];
  removeRecipe: (recipe: string) => void;
};

export const useStore = create<UseStoreType>((set, get) => ({
  modalVisible: false,
  setModalVisible: (data: boolean) => {
    set({
      modalVisible: data,
    });
  },
  savedRecipeModal: false,
  setSavedRecipeModal: (data: boolean) => {
    set({
      savedRecipeModal: data,
    });
  },
  ingredients: [""],
  addIngredient: (ingredient: string) => {
    set({
      ingredients: [...get().ingredients, ingredient],
    });
  },
  removeIngredient: (ingredient: string) => {
    const findIngredient = get().ingredients.filter(
      (item) => item !== ingredient
    );
    set({
      ingredients: findIngredient,
    });
  },
  clearIngredients: () => {
    set({
      ingredients: [],
    });
  },
  recipe: [""],
  removeRecipe: (recipe: string) => {
    const findRecipe = get().recipe.filter((item) => item !== recipe);
    set({
      ingredients: findRecipe,
    });
  },
}));
