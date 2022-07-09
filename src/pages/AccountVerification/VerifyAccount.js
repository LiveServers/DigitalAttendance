import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import TextInputComponent from '../../components/TextInput';
import NativeButton from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  verifyAccountTitle: {
    marginTop: 109,
    fontSize: 24,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#fff',
    width: 279,
    height: 51,
    borderWidth: 1,
    borderColor: '#955A7A',
    borderStyle: 'solid',
    marginTop: 37,
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
    // height: 50,
    color: '#000',
    marginTop: 37,
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
});

const VerifyAccount = ({ navigation }) => {
  const theme = useTheme();
  const handleNavigate = () => navigation.navigate('StudentHomePage');
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.verifyAccountTitle,
          {
            color: theme.colors.accent,
          },
        ]}
      >
        Verify Your Account
      </Text>
      <TextInputComponent
        style={styles.textInput}
        autoComplete="off"
        name="otpNumber"
        placeholder="Enter OTP"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        autoFocus={true}
      />
      <NativeButton
        mode="contained"
        title="Verify"
        color={theme.colors.primary}
        style={styles.btn}
        onPress={handleNavigate}
      />
    </View>
  );
};

export default VerifyAccount;

VerifyAccount.propTypes = {
  navigation: PropTypes.object.isRequired,
};
