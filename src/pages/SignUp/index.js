import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import TextInputComponent from '../../components/TextInput';
import NativeButton from '../../components/Button';

const styles = StyleSheet.create({
  parentContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  childContainer: {
    height: '20%',
    backgroundColor: '#fff',
  },
  signUpTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 55,
  },
  textInput: {
    width: 279,
    height: 51,
    borderWidth: 1,
    borderColor: '#955A7A',
    borderStyle: 'solid',
    marginTop: 40,
    paddingLeft: 22,
    backgroundColor: '#fff',
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
    marginBottom: 20,
  },
  innerText: {
    textDecorationLine: 'underline',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#955A7A',
  },
  containerStyle: {
    borderWidth: 1,
    borderColor: '#955A7A',
    borderStyle: 'solid',
    marginTop: 20,
    width: 279,
    height: 51,
  },
});

const SignUp = ({ navigation }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [certOpen, setCertOpen] = React.useState(false);
  const [certValue, setCertValue] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [role, setRole] = React.useState([
    {
      label: 'Student',
      value: 'student',
    },
    {
      label: 'Lecturer',
      value: 'lecturer',
    },
  ]);
  const [certificate, setCertificate] = React.useState([
    {
      label: 'Degree',
      value: 'degree',
    },
    {
      label: 'Diploma',
      value: 'diploma',
    },
    {
      label: 'Certificate',
      value: 'certificate',
    },
  ]);
  const [selectedChoice, setSelectedChoice] = React.useState('');
  const [zIndexVal, setZIndexVal] = React.useState(1000);
  const [type, setType] = React.useState(false);
  const handleSetOpen = () => setOpen(!open);
  const handleSetType = () => setType(!type);
  const handleNavigate = () => navigation.navigate('LoginView');
  const handleNavigateToAccountVerification = () =>
    navigation.navigate('VerifyAccount');
  return (
    <ScrollView
      style={styles.childContainer}
      contentContainerStyle={styles.parentContainer}
    >
      <Text
        style={[
          styles.signUpTitle,
          {
            color: theme.colors.accent,
          },
        ]}
      >
        Sign Up
      </Text>
      <TextInputComponent
        style={styles.textInput}
        autoComplete="off"
        name="firstName"
        placeholder="First Name"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        autoFocus={true}
      />
      <TextInputComponent
        style={[styles.textInput, styles.passwordInput]}
        autoComplete="off"
        placeholder="Last Name"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        name="lastName"
        textContentType="name"
      />
      <TextInputComponent
        style={[styles.textInput, styles.passwordInput]}
        autoComplete="off"
        name="registrationNumber"
        placeholder="Registration Number"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        textContentType="name"
      />
      <TextInputComponent
        style={[styles.textInput, styles.passwordInput]}
        autoComplete="off"
        name="password"
        placeholder="Password"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        textContentType="password"
        secureTextEntry={!type}
        right={
          <TextInput.Icon
            onPress={handleSetType}
            name={type ? 'eye-off' : 'eye'}
            color={theme.colors.accent}
            style={styles.icon}
          />
        }
      />
      <TextInputComponent
        style={[styles.textInput, styles.passwordInput]}
        autoComplete="off"
        placeholder="Confirm Password"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        name="confirmPassword"
        textContentType="password"
        secureTextEntry={!type}
        right={
          <TextInput.Icon
            onPress={handleSetType}
            name={type ? 'eye-off' : 'eye'}
            color={theme.colors.accent}
            style={styles.icon}
          />
        }
      />
      <DropDownPicker
        open={open}
        value={value}
        items={role}
        placeholder="Student/Lecturer"
        setOpen={handleSetOpen}
        setValue={setValue}
        setItems={setRole}
        onChangeValue={(val) => {
          if (val === 'lecturer') {
            setCertValue(null);
          }
          setSelectedChoice(val);
        }}
        containerStyle={{
          width: 279,
          zIndex: 1001,
          borderRadius: 20,
          borderColor: '#955A7A',
        }}
        style={{
          borderRadius: 0,
          borderColor: '#955A7A',
          marginTop: 20,
          height: 51,
          color: '#955A7A',
        }}
        textStyle={{
          color: 'black',
          fontSize: 17,
          paddingLeft: 22,
        }}
        placeholderStyle={{
          color: '#955A7A',
        }}
      />
      {selectedChoice === 'student' && (
        <>
          <DropDownPicker
            open={certOpen}
            value={certValue}
            items={certificate}
            placeholder="Certificate Enrolled In"
            setOpen={() => setCertOpen(!certOpen)}
            setValue={setCertValue}
            setItems={setCertificate}
            onOpen={() => setZIndexVal(1002)}
            containerStyle={{
              width: 279,
              zIndex: zIndexVal,
              borderRadius: 20,
              borderColor: '#955A7A',
            }}
            style={{
              borderRadius: 0,
              borderColor: '#955A7A',
              marginTop: 20,
              height: 51,
              color: '#955A7A',
            }}
            textStyle={{
              color: 'black',
              fontSize: 17,
              paddingLeft: 22,
            }}
            placeholderStyle={{
              color: '#955A7A',
            }}
          />
        </>
      )}
      <TextInputComponent
        style={[styles.textInput, styles.passwordInput]}
        autoComplete="off"
        placeholder="Phone Number"
        placeholderTextColor="#955A7A"
        selectionColor="#955A7A"
        autoCorrect={false}
        name="phoneNumber"
        textContentType="name"
        keyboardType="phone-pad"
      />
      <NativeButton
        mode="contained"
        title="Sign Up"
        color={theme.colors.primary}
        style={styles.btn}
        onPress={handleNavigateToAccountVerification}
      />
      <Text style={[{ color: theme.colors.offset }, styles.signUpText]}>
        Already have an account?{' '}
        <Text onPress={handleNavigate} style={styles.innerText}>
          Sign In
        </Text>
      </Text>
    </ScrollView>
  );
};

export default SignUp;

SignUp.propTypes = {
  navigation: PropTypes.object,
};
