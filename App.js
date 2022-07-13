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

const App = () => {
  return (
    <NavigationProvider>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </NavigationProvider>
  );
};

export default App;
