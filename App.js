/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import './ignoreWarnings';
import React from 'react';
import {Provider as ThemeProvider} from 'react-native-paper';
import theme from './src/theme';
import Navigation from './src/navigation/Navigation';
import {NavigationProvider} from './src/context/NavigationContext';
// import {db} from "./src/db/firebaseConfig";

const App = () => {
    // React.useEffect(()=>{
    //    const dbRef = db.collection("student-collection").add({
    //        name:"Brian Kyole"
    //    }).then((res)=>console.log("THIS IS SUCCESS", res)).catch((e)=>console.log("ERROR", e));
    // },[]);
  return (
    <NavigationProvider>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </NavigationProvider>
  );
};

export default App;
