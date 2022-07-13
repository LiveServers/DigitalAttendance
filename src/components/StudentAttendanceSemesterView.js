import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
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
  last=false,
  index,
  studentRecord,
  handleOpenProgressView,
}) => {
  const theme = useTheme();
  const year = Object.keys(studentRecord.record[index]);
  const semOne = Object.keys(studentRecord.record[index][year][0]);
  const semTwo = Object.keys(studentRecord.record[index][year][1]);
  return (
    <View style={styles.parentContainer}>
      <Text style={[{ color: theme.colors.secondary }, styles.yearTextStyles]}>
        {Object.keys(studentRecord.record[index])}
      </Text>
      <Pressable onPress={() => handleOpenProgressView(semOne[0], year[0], index, studentRecord)}>
        <View
          style={[
            styles.innerView,
            { backgroundColor: theme.colors.accent, marginTop: 7 },
          ]}
        >
          <Text style={styles.innerText}>{semOne[0]}</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => handleOpenProgressView(semTwo[0], year[0], index, studentRecord)}>
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
          <Text style={styles.innerText}>{semTwo[0]}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default StudentAttendanceSemesterView;

StudentAttendanceSemesterView.propTypes = {
  last: PropTypes.bool,
  index: PropTypes.number.isRequired,
  studentRecord: PropTypes.object.isRequired,
  handleOpenProgressView: PropTypes.func,
};
