import { StyleSheet,View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import EnableLocation from "./components/EnableLocation";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2490ef",
    secondary: "#2490ef",
  },
};

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <EnableLocation/>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
