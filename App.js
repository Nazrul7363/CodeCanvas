import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import LocationTest from './components/LocationTest'
import * as Location from 'expo-location';
import { useState,useEffect } from "react";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2490ef",
    secondary: "#2490ef",
  },
};





export default function App() {

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log(errorMsg);
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("----------",location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <PaperProvider theme={theme}>
  
      <View style={styles.container}>

        <Text>Open up App.js to start working on your app!</Text>
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
