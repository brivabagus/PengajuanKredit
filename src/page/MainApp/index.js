import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gap, HomeProfile, List} from '../../component';
import {colors, getData} from '../../utility';

const MainApp = ({navigation}) => {
  useEffect(() => {
    getData('user').then(res => {
      console.log('data user: ', res);
    });
  }, []);
  return (
    <View style={styles.pages}>
      <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
      <Gap height={30} />
      <List
        desc="Pengajuan Kredit"
        type="next"
        icon="pengajuan"
        onPress={() => navigation.navigate('Reg')}
      />
      <List
        desc="Simulasi Kredit"
        type="next"
        icon="simulasi"
        onPress={() => navigation.navigate('Simulasi')}
      />
      <List
        desc="Report Pengajuan"
        type="next"
        icon="report"
        onPress={() => navigation.navigate('Report')}
      />
    </View>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
