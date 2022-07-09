import React from 'react';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const NativeButton = ({ title, color, mode, ...rest }) => {
  return (
    <Button color={color} mode={mode} {...rest}>
      {title}
    </Button>
  );
};

export default NativeButton;

NativeButton.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  color: PropTypes.string,
};
