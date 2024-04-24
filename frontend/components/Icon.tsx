import React from "react";
import { useStore } from "../helper/zustand";

import { Image, Pressable, StyleSheet } from "react-native";

interface props {
  icon: any;
  modal: () => void;
}

const Icons = ({ icon, modal }: props) => {
  return (
    <Pressable onPress={modal}>
      <Image source={icon} style={{ width: 30, height: 30 }}></Image>
    </Pressable>
  );
};

export default Icons;
