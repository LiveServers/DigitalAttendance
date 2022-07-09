import React from 'react';
import PropTypes from 'prop-types';
import ScanComponent from './ScanComponent';
import { withContext } from '../../context/NavigationContext';

const StudentHomePage = ({ navigation, active, setActive }) => {
  return (
    <>
      <ScanComponent
        navigation={navigation}
        setActive={setActive}
        active={active}
      />
    </>
  );
};

export default withContext(StudentHomePage);

StudentHomePage.propTypes = {
  navigation: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};
