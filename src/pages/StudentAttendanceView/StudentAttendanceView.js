import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  ActivityIndicator,
  // eslint-disable-next-line no-unused-vars
  BackHandler,
  Alert,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import HomePageTopComponent from '../../components/HomePageTopComponent';
import FAB from '../../components/FAB';
import StudentAttendanceSemesterView from '../../components/StudentAttendanceSemesterView';
import { withContext } from '../../context/NavigationContext';
import {auth,db} from "../../db/firebaseConfig";
import firestore from '@react-native-firebase/firestore';

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
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
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
  const [loading, setLoading] = React.useState(true);
  const [studentRecord, setStudentRecord] = React.useState();
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
  React.useEffect(()=>{
    async function getLoggedInStudentRecords(){
      try{
        const userUid = await auth.currentUser;
        if(userUid.uid){
          const records = await firestore().collection("students-collection").doc(userUid.uid).get();
          setStudentRecord(records?._data);
          setLoading(false);
        }
        setLoading(false);
      }catch(e){
        setLoading(false);
        console.log("ERROR FROM FETCHING STUDENT DETAILS", e);
        Alert.alert(e.message);
      }
    }
    getLoggedInStudentRecords();
  },[]);
  const handleIconPress = () => setOpen(!open);
  const handleLogout = () => {
    setOpen(false);
    setActive('scan');
    navigation.navigate('LoginView');
  };
  const handleScrollBeginDrag = () => setVisible(false);
  const handleScrollDragEnd = () => setVisible(true);
  const handleOpenProgressView = (sem,year,index,record) => {
    navigation.navigate('StudentAttendanceProgressView',{
      sem,
      year,
      index,
      record,
      semIndex: sem === "SemesterOne" ? 0 : 1,
    });
  };
  return (
    <>
     {
        loading ? (
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        ):(
          <>
            <HomePageTopComponent
              handleIconPress={handleIconPress}
              theme={theme}
              handleLogout={handleLogout}
              open={open}
              title="Attendance Records"
            />
            <ScrollView
              onTouchStart={handleScrollBeginDrag}
              onTouchEnd={handleScrollDragEnd}
              style={styles.childContainer}
              contentContainerStyle={styles.parentContainer}
            >
                    <StudentAttendanceSemesterView
                      index={0}
                      studentRecord={studentRecord}
                      handleOpenProgressView={handleOpenProgressView}
                    />
                  <StudentAttendanceSemesterView
                    index={1}
                    studentRecord={studentRecord}
                    handleOpenProgressView={handleOpenProgressView}
                  />
                <StudentAttendanceSemesterView
                  index={2}
                  studentRecord={studentRecord}
                  handleOpenProgressView={handleOpenProgressView}
                />
              <StudentAttendanceSemesterView
                index={3}
                studentRecord={studentRecord}
                handleOpenProgressView={handleOpenProgressView}
                last
              />
            </ScrollView>
            {visible && (
              <View style={styles.fabCon}>
                <FAB active={active} setActive={setActive} navigation={navigation} />
              </View>
            )}
          </>
        )
      }
    </>
  );
};

export default withContext(StudentAttendanceView);

StudentAttendanceView.propTypes = {
  navigation: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};
