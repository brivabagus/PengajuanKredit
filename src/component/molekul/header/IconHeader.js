import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DummyIce} from '../../../assets';
import {colors, fonts} from '../../../utility';
import {Button} from '../../atom';

const IconHeader = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.wrippercontent}>
        <Image source={DummyIce} style={styles.avatar} />
        <View style={styles.content}>
          <Text style={styles.title}>Biodata</Text>
        </View>
      </View>
    </View>
  );
};

export default IconHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    // flex: 1,
    marginLeft: 40,
  },
  wrippercontent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
  },
});
