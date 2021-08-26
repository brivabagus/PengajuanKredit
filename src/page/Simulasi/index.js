import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, Input} from '../../component';
import {useForm} from '../../utility';

const Simulasi = ({navigation, hasil}) => {
  const [form, setForm] = useForm({
    pengajuan: '',
    jangkaWaktu: '- Select Jangka Waktu -',
    sukuBunga: '- Select Suku Bunga -',
    hasil: '',
  });
  const [jangkaWaktu] = useState([
    {id: 1, label: '- Select Jangka Waktu -', value: 'Jangka Waktu'},
    {id: 2, label: ' 1 tahun', value: 12},
    {id: 3, label: ' 2 tahun', value: 24},
  ]);
  const [sukuBunga] = useState([
    {id: 1, label: '- Select Suku Bunga -', value: 'Suku Bunga'},
    {id: 2, label: ' 1 % ', value: 1 / 100},
    {id: 3, label: ' 1.5 % ', value: 1.5 / 100},
  ]);
  const hitung = () => {
    console.log(form);
    const data = {
      pengajuan: form.pengajuan,
      jangkaWaktu: form.jangkaWaktu,
      sukuBunga: form.sukuBunga,
      hasil: (form.pengajuan * form.sukuBunga) / form.jangkaWaktu,
    };
    console.log('data :', data);
    hasil = (form.pengajuan * form.sukuBunga) / form.jangkaWaktu;
    console.log(hasil);
  };
  //   const reset =()=>{
  //     const [form, setForm] = useForm({
  //         pengajuan: '',
  //         jangkaWaktu: '',
  //         sukuBunga: '',

  //       })};
  return (
    <View style={styles.page}>
      <Header title="Simuasi Kredit" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Gap height={24} />
          <Input
            label="Nominal Kredit"
            keyboardType="numeric"
            value={form.pengajuan}
            onChangeText={value => setForm('pengajuan', value)}
          />
          <Gap height={30} />
          <Input
            label="Jangka Waktu"
            keyboardType="numeric"
            value={form.jangkaWaktu}
            onValueChange={value => setForm('jangkaWaktu', value)}
            select
            selectItem={jangkaWaktu}
          />
          <Gap height={30} />
          <Input
            label="Suku Bunga p.a"
            keyboardType="numeric"
            value={form.sukuBunga}
            onValueChange={value => setForm('sukuBunga', value)}
            select
            selectItem={sukuBunga}
          />
          <Gap height={30} />
          <Input
            label="Hasil"
            keyboardType="numeric"
            value={form.hasil}
            // onChangeText={value => setForm('sukuBunga', value)}
          />
          <Text>`Hasil : ${hasil}`</Text>
          {/* <Text>{hasil}</Text> */}
          <Gap height={40} />
          <Button title="Hitung" onPress={hitung} />
          {/* <Button title="Reset" onPress={reset}/> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Simulasi;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
