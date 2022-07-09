import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  parentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  rightTopContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: -21,
  },
  text: {
    color: '#005248',
    fontSize: 18,
    marginLeft: 12,
  },
  signOut: {
    backgroundColor: '#B1ADAD',
    width: 70,
    height: 31,
    position: 'absolute',
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1002,
  },
  signOutText: {
    fontSize: 14,
    color: '#000',
  },
});

const HomePageTopComponent = ({
  handleIconPress,
  theme,
  open,
  handleLogout,
  title,
}) => {
  return (
    <View style={styles.topContainer}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.rightTopContainer}>
        <Avatar.Text
          color="#fff"
          size={30}
          label="BK"
          style={{ backgroundColor: theme.colors.secondary }}
        />
        <Button
          width={30}
          height={30}
          icon="chevron-down"
          onPress={handleIconPress}
          color={theme.colors.black}
        />
        {open && (
          <>
            <View style={styles.signOut}>
              <Text onPress={handleLogout} style={styles.signOutText}>
                Sign Out
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
export default HomePageTopComponent;

HomePageTopComponent.propTypes = {
  handleIconPress: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
