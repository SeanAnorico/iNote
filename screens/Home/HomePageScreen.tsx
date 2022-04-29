import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { getData } from '../../database/StoreData';
import { Notes } from '../../models/Notes';



export default function HomePageScreen() {
  const [note, setNote] = useState<Array<Notes> | null>(null);

  const navigation = useNavigation();
  const navigation2 = useNavigation();

  const retrieveData = async () => {
    const noteList = await getData('noteList');
    if (noteList) {
      const json = JSON.parse(noteList);
      setNote(json);
    }
    // await removeData('todoList');

  }

  useFocusEffect(
    useCallback(() => {
      retrieveData();
    }, [])
  )

  return (
    <View style={styles.container}>

      <ScrollView style={styles.listcontainer}>
        <View>
          {note && note.map((notes: Notes, index: number) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NoteView", {
                  note: notes, index: index
                });
              }}
            >
              <View style={styles.notecontainer}

              >
                <Text
                  style={styles.title}
                  numberOfLines={1}
                >
                  
                  {notes.title}
                </Text>
                <Text
                  style={styles.desc}
                  numberOfLines={2}
                >
                  {notes.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.btncontainer}>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            borderRadius: 45,
            backgroundColor: Colors.btn,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.txt,
            marginRight: 10

          }}
          onPress={() => {
            navigation.navigate("Home", {
              screen: "AddNote"
            });
          }}
        >
          <Ionicons
            name='add'
            size={40}
            color='#FAFAFF'
          />
        </TouchableOpacity>
      </View>
      {!note?.length ?
        <View
          style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
        >
          <Text
            style={styles.emptyHeader}
          >
            Add Note
          </Text>
        </View>
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#495057',
  },
  btncontainer: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    // width: 45,
    // height: 45,
    // borderRadius: 45,
    // backgroundColor: Colors.btn,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: Colors.txt
  },
  notecontainer: {
    height: 100,
    width: '100%',
    // borderBottomWidth: 1,
    // borderBottomColor: 'black',
    // borderTopWidth: 1,
    // borderTopColor: 'black',
    borderRadius: 10,
    backgroundColor: '#212529',
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center'
  },
  listcontainer: {
    width: Dimensions.get('screen').width - 20,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    color: Colors.txt,
    fontSize: 24,
    fontWeight: 'bold',

  },
  desc: {
    color: Colors.txt,
    fontSize: 16,
    opacity: 0.5
  },
  emptyHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.5,
  }
});
