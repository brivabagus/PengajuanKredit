import React, {useState} from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Button, Gap, Header, Input, Profile} from '../../component';
import Fire from '../../config';
import {colors, getData, storeData} from '../../utility';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    userName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const update = () => {
    console.log('profile', profile);

    console.log('new password :', password);
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'password kurang dari 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        updataPassword();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  const updataPassword = () => {
    Fire.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(err => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;

    Fire.database()
      .ref(`users/${profile.uid}/user`)
      .update(data)
      .then(res => {
        console.log('succes :', data);
        storeData('user', data);
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
  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  const getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true},
      response => {
        // Same code as in above section!
        console.log('hasil response :', response);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'Foto Gagal Upload',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          console.log('response getImage :', response);
          const source = {uri: response.uri};
          setPhotoForDB(`data:${response.type};base64, ${response.base64}`);
          // setPhotoForDB({
          //   uri: 'data:' + response.type + 'base64,' + response.data,
          // });
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <Gap height={40} />
      <ScrollView>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={25} />
          <Input
            label="User Name"
            value={profile.userName}
            onChangeText={value => changeText('userName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Gap height={40} />
          <Button
            title="Save Profile"
            onPress={update}
            // onPress={() => navigation.navigate('UserProfile')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
