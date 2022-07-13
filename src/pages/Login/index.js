import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import TextInputComponent from '../../components/TextInput';
import NativeButton from '../../components/Button';
import {auth} from "../../db/firebaseConfig";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  loginTitle: {
    marginTop: 109,
    fontSize: 24,
    textAlign: 'center',
  },
  textInput: {
    width: 279,
    height: 51,
    borderWidth: 1,
    borderColor: '#955A7A',
    borderStyle: 'solid',
    marginTop: 48,
    backgroundColor: '#fff',
    paddingLeft: 22,
  },
  passwordInput: {
    marginTop: 20,
  },
  icon: {
    color: 'blue',
  },
  btn: {
    width: 129,
    color: '#000',
    marginTop: 36,
    fontSize: 18,
    textAlign: 'center',
    verticalAlign: 'center',
    padding: 6,
    textAlignVertical: 'center',
  },
  signUpText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  innerText: {
    textDecorationLine: 'underline',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
});

const LoginView = ({ navigation }) => {
  const theme = useTheme();
  const [details, setDetails] = React.useState({email:"",password:""});
  const [type, setType] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleNavigate = () => navigation.navigate('SignUpView');
  const handleLogin = async () => {
    try{
      setLoading(true);
      const response = await auth.signInWithEmailAndPassword(details.email, details.password);
      if(response){
        setLoading(false);
        navigation.navigate('StudentHomePage');
        return false;
      }
      return false;
    }catch(e){
      setLoading(false);
      console.log("ERROR WHILE SIGNING IN", e);
      Alert.alert(e.message);
    }
  }
  const handleSetType = () => setType(!type);
  const handleTextChange = (val, name) => {
    setDetails({...details,[name]:val});
  }
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.loginTitle,
          {
            color: theme.colors.accent,
          },
        ]}
      >
        Sign In
      </Text>
      <TextInputComponent
        style={styles.textInput}
        autoComplete="off"
        name="registrationNumber"
        placeholder="Email"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        autoFocus={true}
        onChangeText={(val) => handleTextChange(val,"email")}
      />
      <TextInputComponent
        style={[styles.textInput, styles.passwordInput]}
        autoComplete="off"
        placeholder="Password"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        name="password"
        secureTextEntry={!type}
        onChangeText={(val) => handleTextChange(val,"password")}
        right={
          <TextInput.Icon
            onPress={handleSetType}
            name={type ? 'eye-off' : 'eye'}
            color={theme.colors.accent}
            style={styles.icon}
          />
        }
      />
      {
        loading ? (
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        ):(
            <NativeButton
              mode="contained"
              title="Sign In"
              color={theme.colors.primary}
              style={styles.btn}
              onPress={handleLogin}
            />
        )
      }
      <Text style={[{ color: theme.colors.offset }, styles.signUpText]}>
        Dont have an account?{' '}
        <Text onPress={handleNavigate} style={styles.innerText}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginView;

LoginView.propTypes = {
  navigation: PropTypes.object,
};
