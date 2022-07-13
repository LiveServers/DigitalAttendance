import React from 'react';
import { BackHandler, StyleSheet, View, Alert, ActivityIndicator, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import FAB from '../../components/FAB';
import HomePageTopComponent from '../../components/HomePageTopComponent';
import {auth} from "../../db/firebaseConfig";

const styles = StyleSheet.create({
  fabCon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  btmView: {
    marginBottom: 35,
    alignSelf: 'flex-end',
  },
  scanIcon: {
    color: '#000',
  },
  loadingText:{
    color:"#000"
  },
  flashlight: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
});

const ScanComponent = ({ navigation, setActive, active, loggedIn, userId }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [on, setOn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  let activeScanning = React.useRef(null);
  const handleBackClick = () => {
    setActive('scan');
    BackHandler.exitApp();
  };
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackClick);
    };
  }, []);
  const handleIconPress = () => setOpen(!open);
  const handleLogout = async() => {
    try{
      const res = await auth.signOut();
      setOpen(false);
      setActive('scan');
      navigation.navigate('LoginView');
    }catch(e){
      console.log("ERROR WHILE LOGGING OUT", e);
    }
  };
  const onSuccess = async (response) => {
    try{
      setLoading(true);
      const qrCodeData = JSON.parse(response.data);
      const userUid = await auth.currentUser;
      const todaysDate = moment(new Date()).format("YYYY-MM-DD");
      const attendanceRecordId = `${qrCodeData.date}-${qrCodeData.courseCode}`;
      if(userUid.uid){
        const studentDetailsToUpdate = await firestore().collection('students-collection').doc(userUid.uid).get();
        const yearMap = {
          0:"year1",
          1:"year2",
          2:"year3",
          3:"year4"
        };
        const semMap = {
          0:"SemesterOne",
          1:"SemesterTwo",
        };
        const activeYear = qrCodeData.activeSemester.split(".")[0] - 1;
        const activeSem = qrCodeData.activeSemester.split(".")[1] - 1;
        let activeRecordIndex;
        const studentData = studentDetailsToUpdate._data;
        // if(qrCodeData.date === todaysDate){
          const records = studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]];
          //loop
          for(let i=0;i<records.length;++i){
            if((records[i].courseCode === qrCodeData.courseCode) && (records[i].courseTitle === qrCodeData.courseTitle) && (records[i].activeSemester === qrCodeData.activeSemester)){
              activeRecordIndex = i;
              break;
            }
          }
          if(activeRecordIndex !== null){
            // below check is where we handle a new student in a new sem because it will return null
            if(!Object.keys(studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]][activeRecordIndex]).includes("datesAttended") || !Object.keys(studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]][activeRecordIndex]).includes("progress")){
              studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]][activeRecordIndex].datesAttended = [todaysDate];
              studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]][activeRecordIndex].progress = "8";
              await firestore().collection('students-collection').doc(userUid.uid).set(studentData);
              // now, update the attendance list
              await firestore().collection("attendance-record").doc(attendanceRecordId).update({
                "attendees": firestore.FieldValue.arrayUnion({studentName:studentData.name,regNo:studentData.regNo}),
              });
              Alert.alert("Awesome, your details have been captured successfully, go to attendance tab to view your attendance record!");
            }else{
              if(!studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]][activeRecordIndex].datesAttended.includes(todaysDate)){
                studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]][activeRecordIndex].datesAttended.push(todaysDate);
                const progress = studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]][activeRecordIndex].progress;
                studentData.record[activeYear][yearMap[activeYear]][activeSem][semMap[activeSem]][activeRecordIndex].progress = (parseInt(progress,10)+8).toString();
                // perform update, trickiest part so far
                await firestore().collection('students-collection').doc(userUid.uid).set(studentData);
                // now, update the attendance list
                await firestore().collection("attendance-record").doc(attendanceRecordId).update({
                  "attendees": firestore.FieldValue.arrayUnion({studentName:studentData.name,regNo:studentData.regNo}),
                });
                Alert.alert("Awesome, your details have been captured successfully, go to attendance tab to view your attendance record!");
              }else{
                Alert.alert("Sorry, you have already attended this class!");
              }
            }
          }else{
            Alert.alert("Please ensure you scan a class you belong to!");
          }
        // }else{
        //   // throw error
        // }
        setLoading(false);
        return false;
      }else{
        setLoading(false);
        Alert.alert("Please sign in to perform this action");
      }
  }catch(e){
    console.log("ERROR", e)
    setLoading(false);
    Alert.alert("Error occurred. Wait 5 seconds and try again!");
    setTimeout(()=>{
      activeScanning.reactivate();
    },5000);
  }
  };
  const handleFlashlightSwitch = async () => {
    setOn(!on);
  };
  return (
    <QRCodeScanner
      ref={(ele) => activeScanning=ele}
      fadeIn={true}
      permissionDialogMessage="Please give access to camera"
      onRead={onSuccess}
      reactivateTimeout={5000}
      flashMode={
        on
          ? RNCamera.Constants.FlashMode.torch
          : RNCamera.Constants.FlashMode.off
      }
      containerStyle={{
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#fff',
      }}
      cameraStyle={{
        height: 100,
        width: 200,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      topContent={
        <HomePageTopComponent
          open={open}
          handleIconPress={handleIconPress}
          handleLogout={handleLogout}
          theme={theme}
          title="Scan QR Code"
        />
      }
      bottomContent={
        <View>
          {
            loading ? (
              <>
                <View style={styles.preloader}>
                  <ActivityIndicator size="large" color="#9E9E9E"/>
                  <Text style={styles.loadingText}>Please wait as we update your details.</Text>
                </View>
              </>
            ):(
              <>
                <View style={styles.flashlight}>
                  <Icon
                    onPress={() => handleFlashlightSwitch()}
                    name={on ? 'flashlight-off' : 'flashlight'}
                    size={40}
                    style={styles.scanIcon}
                  />
                </View>
                <View style={styles.fabCon}>
                  <View style={styles.btmView}>
                    <FAB
                      setActive={setActive}
                      active={active}
                      navigation={navigation}
                    />
                  </View>
                </View>
              </>
            )
          }
        </View>
      }
    />
  );
};

export default ScanComponent;

ScanComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  setActive: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
  userId: PropTypes.string,
};
/***
 * 
 *     try{
        const userUid = await auth.currentUser;
        console.log("LOGGED IN 2", userUid.uid)
        if(userUid.uid){
        const res = await db.collection("students-collection").doc(userUid.uid).set({
          name: "Brian Kyole Mwau",
          regNo: "ICT-G-4-0726-18",
          school: "Computing & Informatics",
          record: [
            {
              year1: [
              {
                SemesterOne: [
                  {
                    courseTitle: "Computer Application Skills",
                    courseCode:"GUCC 100",
                    progress:"85%",
                    datesAttended:['2021-07-01','2022-07-03']
                  }
                ]
              },
              {
                SemesterTwo: [
                  {
                    courseTitle: "Quantitave Skills",
                    courseCode:"GUCC 102",
                    progress:"50%",
                    datesAttended:['2021-07-10','2022-07-13']
                  }
                ]
              }
            ]
          },
          {
            year2: [
            {
              SemesterOne: [
                {
                  courseTitle: "Communication Skills",
                  courseCode:"GUCC 101",
                  progress:"70%",
                  datesAttended:['2021-07-01','2022-07-03']
                }
              ]
            },
            {
              SemesterTwo: [
                {
                  courseTitle: "Fundamentals of Computing",
                  courseCode:"BSCS 101",
                  progress:"35%",
                  datesAttended:['2021-07-10','2022-07-13']
                }
              ]
            }
          ]
        },
        {
          year3: [
          {
            SemesterOne: [
              {
                courseTitle: "Discrete Structures 1",
                courseCode:"BSCS 100",
                progress:"70%",
                datesAttended:['2021-07-01','2022-07-03']
              }
            ]
          },
          {
            SemesterTwo: [
              {
                courseTitle: "Quantitative Skills",
                courseCode:"BSCS 101",
                progress:"35%",
                datesAttended:['2021-07-10','2022-07-13']
              }
            ]
          }
        ]
      },
      {
        year4: [
        {
          SemesterOne: [
            {
              courseTitle: "Principles of Operating Systems",
              courseCode:"BSCS 102",
              progress:"70%",
              datesAttended:['2021-07-01','2022-07-03']
            }
          ]
        },
        {
          SemesterTwo: [
            {
              courseTitle: "Fundamentals of Computing",
              courseCode:"BSCS 101",
              progress:"35%",
              datesAttended:['2021-07-10','2022-07-13']
            }
          ]
        }
      ]
    },
          ]
        });
        console.log("ADDED THE DATASTRUCTURE", res);
      }
    }catch(e){
      console.log("ERROR CREATING STUDENT",e);
    }
 */