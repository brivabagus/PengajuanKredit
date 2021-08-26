import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconLogo} from '../../assets';
import Fire from '../../config';
import {colors, fonts} from '../../utility';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = Fire.auth().onAuthStateChanged(users => {
      setTimeout(() => {
        if (users) {
          //user masih login

          navigation.replace('MainApp');
        } else {
          //user logout
          navigation.replace('Login');
        }
      }, 3000);
    });

    return () => unsubscribe();
  }, [navigation]);
  return (
    <View style={styles.wrepper}>
      <IconLogo style={styles.avatar} />
      <Text style={styles.Text}>APP PENGAJUAN</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
  wrepper: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 200,
    width: 200,
  },
});
