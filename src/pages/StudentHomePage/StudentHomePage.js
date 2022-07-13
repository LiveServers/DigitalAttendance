import React from 'react';
import PropTypes from 'prop-types';
import ScanComponent from './ScanComponent';
import { withContext } from '../../context/NavigationContext';
import {auth} from "../../db/firebaseConfig";

const StudentHomePage = ({ navigation, active, setActive }) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  React.useEffect(()=>{
    try{
      async function checkUserLoginStatus(){
       const userUid = await auth.currentUser;
       if(!userUid){
        setActive('scan');
        navigation.navigate('LoginView');
        setLoggedIn(false);
        setUserId("");
        return false;
       }
       setLoggedIn(true);
       setUserId(userUid.uid);
      }
      checkUserLoginStatus();
    }catch(e){
      console.log("An error occured",e);
    }
 },[]);
  return (
    <>
      <ScanComponent
        navigation={navigation}
        setActive={setActive}
        active={active}
        loggedIn={loggedIn}
        userId={userId}
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
