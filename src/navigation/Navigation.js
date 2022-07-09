import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import VerifyAccount from '../pages/AccountVerification/VerifyAccount';
import StudentHomePage from '../pages/StudentHomePage/StudentHomePage';
import StudentAttendanceView from '../pages/StudentAttendanceView/StudentAttendanceView';
import StudentAttendanceProgressView from '../pages/StudentAttendanceView/StudentAttendanceProgressView';
import CourseCalenderView from '../pages/StudentAttendanceView/CourseCalenderView';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StudentHomePage" component={StudentHomePage} />
        <Stack.Screen
          name="StudentAttendanceView"
          component={StudentAttendanceView}
        />
        <Stack.Screen
          name="StudentAttendanceProgressView"
          component={StudentAttendanceProgressView}
        />
        <Stack.Screen
          name="CourseCalenderView"
          component={CourseCalenderView}
        />
        <Stack.Screen name="LoginView" component={Login} />
        <Stack.Screen name="SignUpView" component={SignUp} />
        <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
