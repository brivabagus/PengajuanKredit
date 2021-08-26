import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ILNullPhoto} from '../../../assets/illustration';
import {colors, fonts, getData} from '../../../utility';

const HomeProfile = ({onPress}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    userName: '',
    profession: '',
  });

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user: ', res);
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(res);
    });
  }, []);

  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={profile.photo} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{profile.userName}</Text>
          <Text style={styles.profesi}>{profile.profession}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profesi: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
  },
});
