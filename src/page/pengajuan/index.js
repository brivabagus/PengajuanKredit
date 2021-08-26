import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input} from '../../component';
import Fire from '../../config';
import {colors, fonts, useForm, getData, showSuccess} from '../../utility';
import {showMessage} from 'react-native-flash-message';

const Pengajuan = ({navigation, route}) => {
  // const {fullName, uid} = route.params;
  const [pengajuan, setPengajuan] = useState({
    fullName: '',
    address: '',
    phone: '',
    credit: '',
  });
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      // setPhoto({uri: res.photo});
      setPengajuan(data);
    });
  }, []);

  // const [form, setForm] = useForm({
  //   fullName: '',
  //   address: '',
  //   phone: '',
  //   credit: '',
  // });

  const onContinue = () => {
    pengajuanKredit();
    // console.log(form);
    // if (form.fullName && form.address && form.phone && form.credit) {
    //   // const tambahCredit = Fire.database().ref('Register_Pengajuan');
    //   // const registerPengajuan = {
    //   //   fullName: form.fullName,
    //   // };

    //   // tambahCredit.push(registerPengajuan).then(success => {
    //   // showSuccess('Registrasi berhasil');

    //   // console.log('Registrasi berhasil :', success);
    // const data = {
    //   fullName: form.fullName,
    //   address: form.address,
    //   phone: form.phone,
    //   credit: form.credit,
    //   // uid: photo.uid
    // };
    // Fire.database()
    //   .ref('users/' + uid + '/user/')
    //   .push(data);
    // //   setForm('reset');
    // //   // navigation.navigate('UploadKtp', data);
    // console.log('data :', data);
    // //   // });
    // } else {
    //   Alert.alert('Error:', 'Data Harus Diisi Dengan Lengkap');
    // }
  };

  const pengajuanKredit = () => {
    const data = pengajuan;
    if (
      pengajuan.fullName &&
      pengajuan.address &&
      pengajuan.phone &&
      pengajuan.credit
    ) {
      // data.photo = photoForDB;

      Fire.database()
        .ref(`users/${pengajuan.uid}/`)
        .update(data)
        .then(res => {
          console.log('succes sava 1:', data);
          // showSuccess('Pengisian Data Pengajuan Berhasil');
          // storeData('user', data);
          // navigation.navigate('RegisterPengajuan');
        })
        .catch(err => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        });

      const data1 = {
        fullName: pengajuan.fullName,
        address: pengajuan.address,
        credit: pengajuan.credit,
      };

      Fire.database()
        .ref('Register_Pengajuan/' + pengajuan.uid + '/')
        .update(data1)

        .then(res => {
          console.log('succes save 2:', data1);
          showSuccess('Pengisian Data Pengajuan Berhasil');
          // storeData('user', data);
          navigation.navigate('Reg', data);
        })
        .catch(err => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        });
    } else {
      Alert.alert('Error:', 'Data Harus Diisi Dengan Lengkap');
    }
  };
  const changeText = (key, value) => {
    setPengajuan({
      ...pengajuan,
      [key]: value,
    });
  };
  return (
    <View style={styles.pages}>
      <Header
        type="icon-only"
        title="Form Pengajuan Kredit"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.content}>
          <Gap height={30} />
          <Input
            label="Nama Lengkap"
            value={pengajuan.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={20} />
          <Input
            label="Alamat"
            isTextArea={true}
            value={pengajuan.address}
            onChangeText={value => changeText('address', value)}
          />
          <Gap height={20} />
          <Input
            label="No Telp"
            keyboardType="number-pad"
            value={pengajuan.phone}
            onChangeText={value => changeText('phone', value)}
          />
          <Gap height={20} />
          <Input
            label="Nominal Pengajuan"
            keyboardType="number-pad"
            value={pengajuan.credit}
            onChangeText={value => changeText('credit', value)}
          />
          <Gap height={50} />
          <Button title="Submit" onPress={onContinue} />
          <Gap height={30} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Pengajuan;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
