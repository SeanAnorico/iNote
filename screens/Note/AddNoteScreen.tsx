import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { getData, storeData } from '../../database/StoreData';
import { useNavigation } from '@react-navigation/native';

export default function AddNoteScreen() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation();

  const submitNote = async () => {
    setLoading(true)
    setTimeout(async () => {
      const data = {
        title: title,
        description: description,
        time: Date.now(),
      }

      const noteList = await getData('noteList');
      if (noteList) {
        const json = JSON.parse(noteList);
        const mergeNoteList = [data, ...json];
        storeData('noteList', JSON.stringify(mergeNoteList));
      } else {
        storeData('noteList', JSON.stringify([data]));
      }
      setTitle('');
      setDescription('');
      navigation.navigate("Home", {
        screen: "HomePage"
      })
      setLoading(false)
    }, 1200)
  }

  return (
    <View style={styles.container}>
      <TextInput
        label='Title'
        autoComplete={false}
        mode={'flat'}
        style={styles.title}
        underlineColor={Colors.txt}
        activeUnderlineColor={Colors.btn}
        value={title}
        onChangeText={setTitle}
        theme={{
          colors: {
            text: Colors.txt,
          }
        }}
      />
      <TextInput
        label='Description'
        autoComplete={false}
        mode={'outlined'}
        style={styles.desc}
        outlineColor={Colors.txt}
        activeOutlineColor={Colors.btn}
        multiline={true}
        value={description}
        onChangeText={setDescription}
        theme={{
          colors: {
            text: Colors.txt,
          }
        }}
      />

      {title !== '' && description !== '' ?
        <Button
          title="SUBMIT"
          loading={loading}
          icon={{
            name: 'chevron-right',
            type: 'font-awesome',
            size: 12,
            color: 'skyblue',
            reverse: true,
          }}
          iconRight
          iconContainerStyle={{ marginRight: 0 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(90, 154, 230, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => {
            submitNote();
          }}
        />
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#495057',
    paddingTop: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    height: 50,
    width: Dimensions.get('screen').width - 70,
    marginVertical: 10,
    backgroundColor: '#6c757d'
  },
  desc: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    height: 300,
    width: Dimensions.get('screen').width - 70,
    marginVertical: 10,
    paddingVertical: 20,
    backgroundColor: '#6c757d'
  },
});
