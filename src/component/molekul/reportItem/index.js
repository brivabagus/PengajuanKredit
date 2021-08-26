import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../../assets';
import {colors, fonts} from '../../../utility';
import {Gap} from '../../atom';
// import {colors, fonts} from '../../utility';

const ReportItem = ({fullName, address, Credit, Status, image}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titlewripper}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.address}>{Credit}</Text>
          <Text style={styles.address}>{Status}</Text>
        </View>
        <Image source={image} style={styles.image} />
      </View>
      <Gap height={10} />
    </>
  );
};

export default ReportItem;

const styles = StyleSheet.create({
  titlewripper: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullName: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '90%',
  },
  address: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 4,
  },
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    borderBottomWidth: 10,
    borderBottomColor: colors.borderCard,
    paddingBottom: 12,
    paddingTop: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
});
