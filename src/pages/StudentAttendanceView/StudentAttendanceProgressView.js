import React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme, Text, ProgressBar } from 'react-native-paper';
import PropTypes from 'prop-types';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import HomePageTopComponent from '../../components/HomePageTopComponent';
import FAB from '../../components/FAB';
import { withContext } from '../../context/NavigationContext';

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  parentContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  childContainer: {
    height: '20%',
    marginTop: 78,
  },
  yearTextStyles: {
    fontSize: 18,
  },
  innerView: {
    width: 335,
    height: 87,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 17,
  },
  innerText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 17,
  },
  progressBar: {
    height: 3,
    width: 256,
    marginLeft: 17,
    marginTop: 11,
  },
  progressView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTxt: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 23,
  },
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
});

const progressData = [
  {
    title: 'Computer Application Skills',
    code: 'GUCC 100',
    progress: '85%',
  },
  {
    title: 'Communication Skills',
    code: 'GUCC 101',
    progress: '70%',
  },
  {
    title: 'Quantitative Skills',
    code: 'GUCC 102',
    progress: '50%',
  },
  {
    title: 'Discrete Structures I',
    code: 'BSCS 100',
    progress: '65%',
  },
  {
    title: 'Fundamentals of Computing',
    code: 'BSCS 101',
    progress: '35%',
  },
  {
    title: 'Principles of Operating Systems',
    code: 'BSCS 102',
    progress: '80%',
  },
];

const StudentAttendanceProgressView = ({ route, navigation, active, setActive }) => {
  const {sem, year, index, record, semIndex} = route.params;
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const theme = useTheme();
  //
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

  const determineBgColor = (index) =>
    index % 2 === 0 ? theme.colors.accent : theme.colors.secondary;
  const handleIconPress = () => setOpen(!open);
  const handleLogout = () => {
    setOpen(false);
    setActive('scan');
    navigation.navigate('LoginView');
  };
  const handleScrollBeginDrag = () => setVisible(false);
  const handleScrollDragEnd = () => setVisible(true);
  const handleOpenCourseCalender = (dates, courseCode, courseTitle, progress) => {
    navigation.navigate('CourseCalenderView',{
      dates,
      courseCode,
      courseTitle,
      progress,
    });
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
        onScrollEndDrag={handleScrollDragEnd}
        onScrollBeginDrag={handleScrollBeginDrag}
        style={styles.childContainer}
        contentContainerStyle={styles.parentContainer}
      >
        <View style={styles.parent}>
          <Text
            style={[{ color: theme.colors.secondary }, styles.yearTextStyles]}
          >
            {year} {`(${sem})`}
          </Text>
          {
            Object.values(record.record[index][year][semIndex][sem]).map((item,index)=> (
                <React.Fragment key={index}>
                  <Pressable onPress={() => handleOpenCourseCalender(item.datesAttended, item.courseCode, item.courseTitle, item.progress)}>
                    <View
                      key={index}
                      style={[
                        styles.innerView,
                        { backgroundColor: determineBgColor(index), marginTop: 17 },
                      ]}
                    >
                      <Text style={styles.innerText}>
                        <Text>Course Title : </Text>
                        <Text>{item.courseTitle}</Text>
                      </Text>
                      <Text style={styles.innerText}>
                        <Text>Course Code : </Text>
                        <Text>{item.courseCode}</Text>
                      </Text>
                      <View style={styles.progressView}>
                        <ProgressBar
                          style={styles.progressBar}
                          progress={item.progress/100}
                          color={theme.colors.primary}
                        />
                        <Text style={styles.progressTxt}>{item.progress}%</Text>
                      </View>
                    </View>
                  </Pressable>
                </React.Fragment>
          ))}
        </View>
      </ScrollView>
      {visible && (
        <View style={styles.fabCon}>
          <FAB setActive={setActive} active={active} navigation={navigation} />
        </View>
      )}
    </>
  );
};

export default withContext(StudentAttendanceProgressView);

StudentAttendanceProgressView.propTypes = {
  navigation: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};
