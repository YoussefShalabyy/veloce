const mainColor = "#9CE0FE";
const secondColor = "#2d2d2d";
const thirdColor = "#d2d2d2";

export default {
  main: {
    text: "#000",
    backgroundcolor: "#9CE0FE",
    // #E2FF66
    tint: mainColor,
    tabIconDefault: "#ccc",
    tabIconSelected: mainColor,
  },
  light: {
    text: "#fff",
    backgroundcolor: "#E6E6E6",
    whiteBackground: "#fff",
    tint: secondColor,
    tabIconDefault: "#ccc",
    tabIconSelected: mainColor,
  },
  dark: {
    text: "#fff",
    backgroundcolor: "#1d1d1d",
    tint: thirdColor,
    tabIconDefault: "#ccc",
    tabIconSelected: mainColor,
  },
};

export { mainColor, secondColor, thirdColor };
