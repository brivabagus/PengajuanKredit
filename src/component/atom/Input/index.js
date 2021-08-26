import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, fonts} from '../../../utility';
import {Picker} from '@react-native-community/picker';

const Input = ({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  isTextArea,
  disable,
  onValueChange,
  selectItem,
  select,
}) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };
  if (select) {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.picker}>
          <Picker selectedValue={value} onValueChange={onValueChange}>
            {selectItem.map(item => {
              return (
                <Picker.Item
                  key={item.id}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  }

  if (isTextArea) {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          // style={styles.input(border)}
          onFocus={onFocusForm}
          onBlur={onBlurForm}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          // secureTextEntry={secureTextEntry}
          style={styles.txtInputArea(border)}
        />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input(border)}
        value={value}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
  }),
  txtInputArea: border => ({
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    color: 'black',
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary[400],
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 4,
  },
});
