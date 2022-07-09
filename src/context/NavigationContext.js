import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const [active, setActive] = React.useState('scan');
  return (
    <NavigationContext.Provider value={{ active, setActive }}>
      {children}
    </NavigationContext.Provider>
  );
};

// eslint-disable-next-line react/display-name
const withContext = (WrappedComponent) => (props) =>
  (
    <NavigationContext.Consumer>
      {(context) => <WrappedComponent {...props} {...context} />}
    </NavigationContext.Consumer>
  );

export { withContext, NavigationProvider };

NavigationProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
