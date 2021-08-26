import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gap, Header, List} from '../../component';

const Reg = ({navigation}) => {
  return (
    <View>
      <Header title="Register Pengajuan" onPress={() => navigation.goBack()} />
      <Gap height={20} />
      <List
        desc="Isi Biodata"
        type="next"
        icon="biodata"
        onPress={() => navigation.navigate('Pengajuan')}
      />
      <List
        desc="Foto KTP"
        type="next"
        icon="ktp"
        onPress={() => navigation.navigate('UploadKtp')}
      />
      <List
        desc="Foto Selfie"
        type="next"
        icon="selfie"
        onPress={() => navigation.navigate('FotoSelfie')}
      />
    </View>
  );
};

export default Reg;

const styles = StyleSheet.create({});
