import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  // eslint-disable-next-line no-unused-vars
  BackHandler,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import HomePageTopComponent from '../../components/HomePageTopComponent';
import FAB from '../../components/FAB';
import StudentAttendanceSemesterView from '../../components/StudentAttendanceSemesterView';
import { withContext } from '../../context/NavigationContext';

const styles = StyleSheet.create({
  fabCon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'absolute',
    top: Dimensions.get('window').height - 84,
    left: 0,
    right: 0,
  },
  parentContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  childContainer: {
    height: '20%',
    marginTop: 78,
  },
});

const semesterData = [
  {
    year: 'Year 1',
    firstSemesterText: 'Semester I',
    secondSemesterText: 'Semester II',
  },
  {
    year: 'Year 2',
    firstSemesterText: 'Semester I',
    secondSemesterText: 'Semester II',
  },
  {
    year: 'Year 3',
    firstSemesterText: 'Semester I',
    secondSemesterText: 'Semester II',
  },
  {
    year: 'Year 4',
    firstSemesterText: 'Semester I',
    secondSemesterText: 'Semester II',
  },
];

const StudentAttendanceView = ({ navigation, active, setActive }) => {
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const theme = useTheme();

  // const handleBackClick = () => {
  //   setActive('scan');
  //   BackHandler.exitApp();
  // };
  // React.useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackClick);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackClick);
  //   };
  // }, []);
  const handleIconPress = () => setOpen(!open);
  const handleLogout = () => {
    setOpen(false);
    setActive('scan');
    navigation.navigate('LoginView');
  };
  const handleScrollBeginDrag = () => setVisible(false);
  const handleScrollDragEnd = () => setVisible(true);
  const handleOpenProgressView = () => {
    navigation.navigate('StudentAttendanceProgressView');
  };
  return (
    <>
      <HomePageTopComponent
        handleIconPress={handleIconPress}
        theme={theme}
        handleLogout={handleLogout}
        open={open}
        title="Attendance Records"
      />
      <ScrollView
        // onScrollEndDrag={handleScrollDragEnd}
        // onScrollBeginDrag={handleScrollBeginDrag}
        onTouchStart={handleScrollBeginDrag}
        onTouchEnd={handleScrollDragEnd}
        style={styles.childContainer}
        contentContainerStyle={styles.parentContainer}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {semesterData.map(
          ({ year, firstSemesterText, secondSemesterText }, index) => (
            <Pressable key={index} onPress={handleOpenProgressView}>
              <StudentAttendanceSemesterView
                firstSemesterText={firstSemesterText}
                secondSemesterText={secondSemesterText}
                year={year}
                last={index === 3}
              />
            </Pressable>
          )
        )}
      </ScrollView>
      {visible && (
        <View style={styles.fabCon}>
          <FAB active={active} setActive={setActive} navigation={navigation} />
        </View>
      )}
    </>
  );
};

export default withContext(StudentAttendanceView);

StudentAttendanceView.propTypes = {
  navigation: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};
