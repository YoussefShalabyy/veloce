const mainColor = "#9CE0FE";
const secondColor = "#2d2d2d";
const thirdColor = "#d2d2d2";

export default {
  main: {
    text: "#000",
    backgroundcolor: "#262526",
    // #E2FF66
    tint: mainColor,
    tabIconDefault: "#ccc",
    tabIconSelected: mainColor,
  },
  light: {
    text: "#fff",
    backgroundcolor: "#E6E6E6",
    whiteBackground: "#F2EDE4",
    secondBackground: "#fff",
    // #fff
    tint: secondColor,
    tabIconDefault: "#ccc",
    tabIconSelected: mainColor,
  },
  dark: {
    text: "#fff",
    backgroundcolor: "#262526",
    tint: thirdColor,
    tabIconDefault: "#ccc",
    tabIconSelected: mainColor,
  },
};

export { mainColor, secondColor, thirdColor };
