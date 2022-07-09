import { DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Alata-Regular',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Alata-Regular',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Alata-Regular',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    primary: '#FF8982',
    secondary: '#005248',
    accent: '#955A7A',
    white: '#ffffff',
    black: '#000000',
    background: '#ffffff',
    offset: '#B1ADAD',
  },
  font: configureFonts(fontConfig),
};

export default theme;
