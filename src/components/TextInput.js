import React from 'react';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const TextInputComponent = ({
  placeholder,
  placeholderTextColor = '#955A7A',
  selectionColor = '#955A7A',
  textContentType = 'name',
  ...rest
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      autoComplete="off"
      placeholderTextColor={placeholderTextColor}
      selectionColor={selectionColor}
      autoCorrect={false}
      textContentType={textContentType}
      activeUnderlineColor="#fff"
      {...rest}
    />
  );
};

export default TextInputComponent;

TextInputComponent.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  selectionColor: PropTypes.string,
  textContentType: PropTypes.string,
};
