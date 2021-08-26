import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconLogo} from '../../assets';
import {Button, Gap, Input, Loading} from '../../component';
import Fire from '../../config';
import {
  colors,
  getData,
  showError,
  showSuccess,
  storeData,
  useForm,
} from '../../utility';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    userName: '',
    email: '',
    password: '',
  });

  const [profession] = useState([
    {id: 1, label: 'Swasta', value: 'swasta'},
    {id: 2, label: 'Wirausaha', value: 'wirausaha'},
    {id: 3, label: 'PNS', value: 'PNS'},
    {id: 4, label: 'TNI/Polri', value: 'TNI/Polri'},
    {id: 5, label: 'Lain-lain', value: 'Lain-lain'},
  ]);

  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    console.log(form);
    // test data
    // const data = {
    //   fullName: form.fullName,
    //   email: form.email,
    // };

    // navigation.navigate('UploadPhoto', data);
    setLoading(true);
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false);
        showSuccess('Registrasi Berhasil');
        setForm('reset');
        const data = {
          userName: form.userName,
          email: form.email,
          profession: form.profession,
          uid: success.user.uid,
        };
        Fire.database()
          .ref('users/' + success.user.uid + '/')
          .set(data);

        storeData('user', data);
        navigation.navigate('UploadPhoto', data);
        console.log('register sukses :', success);
      })
      .catch(error => {
        setLoading(false);
        showError(error.message);
      });
  };

  return (
    <>
      <View style={styles.pages}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Gap height={20} />
            <View style={styles.wripperAvatar}>
              <IconLogo style={styles.avatar} />
            </View>

            <Gap height={20} />
            <Input
              label="Full Name"
              value={form.userName}
              onChangeText={value => setForm('userName', value)}
            />
            <Gap height={30} />
            <Input
              label="Email"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={30} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onValueChange={value => setForm('profession', value)}
              select
              selectItem={profession}
            />
            <Gap height={30} />
            <Input
              label="Password"
              secureTextEntry
              value={form.password}
              onChangeText={value => setForm('password', value)}
            />
            <Gap height={50} />
            <Button title="continue" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  wripperAvatar: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    // backgroundColor:'yellow',
  },
});
