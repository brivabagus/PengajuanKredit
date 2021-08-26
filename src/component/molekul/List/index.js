import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  IconBiodata,
  IconBuy,
  IconCalculator,
  IconEditProfile,
  IconGaji,
  IconKTP,
  IconNext,
  IconReport,
  IconSelfie1,
  IconSignal,
  IconSignOut,
  IconUang,
  IconUang1,
} from '../../../assets';
import {colors, fonts} from '../../../utility';

const List = ({Profile, name, desc, type, onPress, icon}) => {
  const Icon = () => {
    if (icon === 'pengajuan') {
      return <IconGaji style={styles.avatar} />;
    }
    if (icon === 'simulasi') {
      return <IconCalculator style={styles.avatar} />;
    }
    if (icon === 'report') {
      return <IconUang style={styles.avatar} />;
    }
    if (icon === 'edit-profile') {
      return <IconEditProfile style={styles.avatar} />;
    }
    if (icon === 'signOut') {
      return <IconSignOut style={styles.avatar} />;
    }
    if (icon === 'signal') {
      return <IconSignal style={styles.avatar} />;
    }
    if (icon === 'biodata') {
      return <IconBiodata style={styles.avatar} />;
    }
    if (icon === 'ktp') {
      return <IconKTP style={styles.avatar} />;
    }
    if (icon === 'selfie') {
      return <IconSelfie1 style={styles.avatar} />;
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={IconUang1} style={styles.avatar} />}

      <View style={styles.content}>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {type === 'next' && <Image source={IconNext} style={styles.next} />}
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  avatar1: {
    width: 10,
    height: 10,
    // borderRadius: 46 / 2,
  },
  next: {
    width: 30,
    height: 30,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desc: {
    fontSize: 15,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
