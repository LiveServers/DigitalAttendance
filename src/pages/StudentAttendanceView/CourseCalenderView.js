import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BackHandler, Dimensions, StyleSheet, View } from 'react-native';
import { useTheme, Text, ProgressBar } from 'react-native-paper';
import PropTypes from 'prop-types';
import HomePageTopComponent from '../../components/HomePageTopComponent';
import FAB from '../../components/FAB';
import { withContext } from '../../context/NavigationContext';
import Calender from '../../components/CalenderComponent';

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 12,
    marginRight: 12,
    height: '20%',
    marginTop: 60,
  },
  yearTextStyles: {
    fontSize: 18,
    marginTop: 16,
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
];

const CourseCalenderView = ({ route, navigation, active, setActive }) => {
  const {dates,courseCode,courseTitle,progress}=route.params;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleIconPress = () => setOpen(!open);
  const handleLogout = () => {
    setOpen(false);
    setActive('scan');
    navigation.navigate('LoginView');
  };
  const determineBgColor = () => theme.colors.accent;
  return (
    <>
      <HomePageTopComponent
        handleIconPress={handleIconPress}
        theme={theme}
        handleLogout={handleLogout}
        open={open}
        title="Days Attended"
      />
      <View style={styles.parent}>
          <View
            style={[
              styles.innerView,
              { backgroundColor: determineBgColor(), marginTop: 17 },
            ]}
          >
            <Text style={styles.innerText}>
              <Text>Course Title : </Text>
              <Text>{courseTitle}</Text>
            </Text>
            <Text style={styles.innerText}>
              <Text>Course Code : </Text>
              <Text>{courseCode}</Text>
            </Text>
            <View style={styles.progressView}>
              <ProgressBar
                style={styles.progressBar}
                progress={progress/100}
                color={theme.colors.primary}
              />
              <Text style={styles.progressTxt}>{progress}%</Text>
            </View>
          </View>
      </View>
      <Calender dates={dates} />
      <View style={styles.fabCon}>
        <FAB setActive={setActive} active={active} navigation={navigation} />
      </View>
    </>
  );
};

export default withContext(CourseCalenderView);

CourseCalenderView.propTypes = {
  navigation: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};
