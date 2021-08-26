import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {IconLogo} from '../../assets';
import {Button, Gap, Input, Loading} from '../../component';
import Fire from '../../config';
import {colors, showError, storeData, useForm} from '../../utility';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const login = () => {
    console.log('form', form);
    setLoading(true);
    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        console.log('success :', res);
        setLoading(false);
        // Fire.storage().ref('users/'+res.user.uid+'/'); penulisan model lama
        Fire.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(resDB => {
            console.log('data user :', resDB.val());
            if (resDB.val()) {
              storeData('user', resDB.val);
              navigation.replace('MainApp');
            }
          });
      })
      .catch(err => {
        console.log('error', err);
        setLoading(false);
        showError('Email atau password yang anda masukkan salah');
      });
  };
  return (
    <>
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={30} />
          <View style={styles.wripperAvatar}>
            <IconLogo style={styles.avatar} />
          </View>
          <View style={styles.content}>
            <Gap height={30} />
            <Input
              label="Email Address"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={20} />
            <Input
              label="Password"
              secureTextEntry
              value={form.password}
              onChangeText={value => setForm('password', value)}
            />
            <Gap height={50} />
            <Button title="Sign In" onPress={login} />
            <Gap height={20} />
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
  pages: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: 160,
    height: 160,
  },
  wripperAvatar: {
    alignItems: 'center',
  },
});
