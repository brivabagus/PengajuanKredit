import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ILNullPhoto} from '../../assets';
import {Gap, Header, List, Profile} from '../../component';
import Fire from '../../config';
import {colors, getData, showSuccess} from '../../utility';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    userName: '',
    profession: '',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);

  const signOut = () => {
    Fire.auth()
      .signOut()
      .then(() => {
        showSuccess('Log Out Berhasil');
        navigation.replace('Login');
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={30} />
      {profile.userName.length > 0 && (
        <Profile
          name={profile.userName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}

      <Gap height={15} />
      <List
        name="Edit Profile"
        desc="Edit Profile"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        desc="Mode"
        type="next"
        icon="signal"
        onPress={() => navigation.navigate('Signal')}
      />
      <List
        name="Sign Out"
        desc="Sign Out"
        type="next"
        icon="signOut"
        onPress={signOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});
