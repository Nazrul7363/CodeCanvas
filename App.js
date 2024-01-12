import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

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
// const [Forlocation, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
// const [Bglocation, setBgLocation] = useState(null);
// const [errorBgMsg, setBgErrorMsg] = useState(null);
const [longitude,setLongitude]=useState(null);
const [latitude ,setlatitude]=useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       console.log(errorMsg);
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     console.log("Foreground Location",location);
  //   })();
  // }, []);
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if(status=='granted'){
        console.log(status);
        await Location.requestBackgroundPermissionsAsync();
      }

      if (status !== 'granted') {

        setErrorMsg('Permission to access location was denied');
        console.log(errorMsg);
        return ;
      }
      let location = await Location.getCurrentPositionAsync({});
      
      setlatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      
      
    })();
  }, []);

 

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        
        <Text>{longitude}</Text>
        <Text>{latitude}</Text>
        
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
