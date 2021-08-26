import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, Input} from '../../component';
import {colors, useForm} from '../../utility';
import NetInfo from '@react-native-community/netinfo';

const Signal = ({navigation}) => {
  const [form, setForm] = useForm({
    mode: '',
  });
  const [mode] = useState([
    {id: 1, label: 'Select Mode', value: 'Select Mode'},
    {id: 1, label: 'Online', value: 'Online'},
    {id: 1, label: 'Offline', value: 'Offline'},
  ]);
  const [netInfo, setNetInfo] = useState('');
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(
        `Connection type : ${state.type}
    Is connected? : ${state.isConnected}
IP Address : ${state.details.ipAddress}`,
      );
    });
    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  // const getNetInfo = () => {
  //   // To get the network state once
  //   NetInfo.fetch().then(state => {
  //     alert(
  //       `Connection type: ${state.type}
  //       Is connected?: ${state.isConnected}
  //       IP Address: ${state.details.ipAddress}`,
  //     );
  //   });
  // };

  return (
    <View style={styles.pages}>
      <Header title="Mode Signal" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Input
          label="Pilih Mode"
          value={form.mode}
          onValueChange={value => setForm('mode', value)}
          select
          selectItem={mode}
        />
        <Gap height={40} />
        <Text style={styles.status}>Status Connection</Text>
        <Text style={styles.textStyle}>{netInfo}</Text>
        <Gap height={20} />
        {/* <Button title="Cek" onPress={getNetInfo} /> */}
        <Gap height={70} />
      </View>
    </View>
  );
};

export default Signal;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    paddingHorizontal: 80,
  },
  textStyle: {
    // marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 20,
  },
  status: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});
