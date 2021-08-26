import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Gap, Header, ReportItem} from '../../component';
import Fire from '../../config';
import {colors, showError, getData} from '../../utility';

const Report = ({navigation, uid}) => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getReport();
  }, []);

  const getReport = () => {
    Fire.database()
      .ref('users/')
      .once('value')
      .then(res => {
        console.log('reportss :', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log('data hasil :', data);
          setReports(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.pages}>
      <Header title="Status Pengajuan" onPress={() => navigation.goBack()} />
      <ScrollView style={styles.wripper} showsVerticalScrollIndicator={false}>
        <Gap height={17} />
        {reports.map(report => {
          return (
            <ReportItem
              key={report.id}
              fullName={report.data.fullName}
              address={report.data.address}
              Credit={report.data.credit}
              image={{uri: report.data.photoSelfi}}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
  wripper: {
    // flexDirection: 'row',
    // backgroundColor: 'yellow',
    marginHorizontal: 20,
  },
});
