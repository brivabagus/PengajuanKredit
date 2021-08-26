import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconBack, IconBackDark} from '../../../assets';

const IconOnly = ({onPress, icon}) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconBack />;
    }

    if (icon === 'back-light') {
      return <IconBack />;
    }

    return <IconBack />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;
