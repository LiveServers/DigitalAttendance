import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  parentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  yearTextStyles: {
    fontSize: 16,
  },
  innerView: {
    width: 335,
    height: 50,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  innerText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 17,
  },
});

const StudentAttendanceSemesterView = ({
  year,
  firstSemesterText,
  secondSemesterText,
  last,
}) => {
  const theme = useTheme();
  return (
    <View style={styles.parentContainer}>
      <Text style={[{ color: theme.colors.secondary }, styles.yearTextStyles]}>
        {year}
      </Text>
      <View
        style={[
          styles.innerView,
          { backgroundColor: theme.colors.accent, marginTop: 7 },
        ]}
      >
        <Text style={styles.innerText}>{firstSemesterText}</Text>
      </View>
      <View
        style={[
          styles.innerView,
          {
            backgroundColor: theme.colors.secondary,
            marginTop: 7,
            marginBottom: last ? 0 : 7,
          },
        ]}
      >
        <Text style={styles.innerText}>{secondSemesterText}</Text>
      </View>
    </View>
  );
};

export default StudentAttendanceSemesterView;

StudentAttendanceSemesterView.propTypes = {
  year: PropTypes.string.isRequired,
  firstSemesterText: PropTypes.string.isRequired,
  secondSemesterText: PropTypes.string.isRequired,
  last: PropTypes.bool,
};
