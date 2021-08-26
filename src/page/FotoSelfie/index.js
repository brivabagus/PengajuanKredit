import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {Button, Gap, Header} from '../../component';
import {colors, fonts, getData, showSuccess, storeData} from '../../utility';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import Fire from '../../config';
import {useEffect} from 'react';

const FotoSelfie = ({navigation, route}) => {
  const {uid} = route.params;
  console.log('data uid:', route.params);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoSelfForDB, setPhotoSelfForDB] = useState('');
  const [photoSelfi, setPhotoSelfi] = useState(ILNullPhoto);

  useEffect(() => {
    getData('user').then(res => {
      setPhotoSelfi({uri: res.photoSelfi});
    });
  }, []);

  const getImage = () => {
    launchImageLibrary(
      {quality: 1, maxWidth: 400, maxHeight: 400, includeBase64: true},
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
          setPhotoSelfForDB(`data:${response.type};base64, ${response.base64}`);

          setPhotoSelfi(source);
          setHasPhoto(true);
        }
      },
    );
  };

  const Upload = () => {
    const data = route.params;
    data.photoSelfi = photoSelfForDB;
    Fire.database()
      .ref('users/' + uid + '/user')
      .update({photoSelfi: photoSelfForDB});
    showSuccess('Registrasi Pengajuan Berhasil');
    // const data = route.params;
    data.photoSelfi = photoSelfForDB;
    // storeData('Register', data);
    navigation.replace('RegisterPengajuan');
  };

  return (
    <View style={styles.page}>
      <Header title="Foto Selfie" onPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            {hasPhoto && <Image source={photoSelfi} style={styles.avatar} />}
            {!hasPhoto && <Image source={photoSelfi} style={styles.avatar1} />}

            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text>Silahkan Foto Selfie</Text>
        </View>

        <View style={styles.button}>
          <Button
            disable={!hasPhoto}
            title="Upload Photo Selfie"
            onPress={Upload}
          />
        </View>
      </View>
    </View>
  );
};

export default FotoSelfie;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  button: {
    marginTop: 20,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 70,
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: {width: 230, height: 330},
  avatar1: {width: 110, height: 110},
  avatarWrapper: {
    width: 230,
    height: 330,
    borderWidth: 3,
    borderColor: colors.border,
    // borderRadius: 150 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
