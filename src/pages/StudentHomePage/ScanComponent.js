import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import FAB from '../../components/FAB';
import HomePageTopComponent from '../../components/HomePageTopComponent';
import {db,auth} from "../../db/firebaseConfig";
import firestore from '@react-native-firebase/firestore';

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
  flashlight: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});

const ScanComponent = ({ navigation, setActive, active }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [on, setOn] = React.useState(false);

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
  const handleLogout = () => {
    setOpen(false);
    setActive('scan');
    navigation.navigate('LoginView');
  };
  const onSuccess = (response) => {
    console.log(response.data);
  };
  const handleFlashlightSwitch = async () => {
    try {
      console.log("COMES HERE FIRST");
      auth.signInWithEmailAndPassword("briankyole10@gmail.com", "M@Tak@s0")
          .then(async (userCredential) => {
            // Signed in
            console.log("USER", userCredential)
            const userUid = await auth.currentUser;
            const x = await db.collection("records").doc(userUid.uid).get();
            console.log("THSIS IS X",x)
            const res = await db.collection("records").doc(userUid.uid).set({
              name:"Brian Kyole"
            });
            console.log("THIS ISS RES", res)
          })
          .catch((error) => {
           console.log("ERROR IN AUTH", error)
          });

      // let documentRef = db.collection('col').doc();
      // const res = await documentRef.set({
      //   name:"Brian Kyole"
      // });
      // const res = await firestore().collection("records").doc("brian").set({
      //   name:"Brian Kyole"
      // });
      console.log("THIS WORKS",);
    }catch (e) {
      console.log("ERROR", e);
    }
    //  db.collection("records").add({
    //   name:"Brian Kyole"
    // }).then((res)=>console.log("THIS IS SUCCESS", res)).catch((e)=>console.log("ERROR", e));
    setOn(!on);
  };
  return (
    <QRCodeScanner
      fadeIn={true}
      permissionDialogMessage="Please give access to camera"
      onRead={onSuccess}
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
};
