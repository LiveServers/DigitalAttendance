import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: 200,
    maxWidth: 249,
    borderRadius: 5,
    height: 50,
    zIndex: 1000,
  },
  scanCon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  attendanceCon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
  },
  textStyles: {
    fontSize: 18,
  },
  scanIcon: {
    marginLeft: 15,
    marginRight: 15,
    color: '#000',
  },
  attendanceIcon: {
    marginLeft: 15,
    marginRight: 15,
    color: '#000',
  },
});

const FAB = ({ active, setActive, navigation }) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.mainContainer, { backgroundColor: theme.colors.primary }]}
    >
      <View style={styles.scanCon}>
        <Icon
          onPress={() => {
            navigation.navigate('StudentHomePage');
            setActive('scan');
          }}
          name="qrcode"
          size={30}
          color="#fff"
          style={styles.scanIcon}
        />
        {active === 'scan' && (
          <>
            <Text
              style={[
                { color: theme.colors.secondary, marginRight: 15 },
                styles.textStyles,
              ]}
            >
              SCAN
            </Text>
          </>
        )}
      </View>
      <View style={styles.attendanceCon}>
        <Entypo
          onPress={() => {
            navigation.navigate('StudentAttendanceView');
            setActive('attendance');
          }}
          name="folder"
          size={30}
          color="#fff"
          style={styles.attendanceIcon}
        />
        {active === 'attendance' && (
          <>
            <Text
              style={[
                { color: theme.colors.secondary, marginRight: 15 },
                styles.textStyles,
              ]}
            >
              ATTENDANCE
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default FAB;

FAB.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};
