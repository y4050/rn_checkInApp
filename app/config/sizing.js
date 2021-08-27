import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// const vw = windowWidth / 100;
// const vh = windowHeight / 100;

export default {
  vw: windowWidth / 100,
  vh: windowHeight / 100,
};
