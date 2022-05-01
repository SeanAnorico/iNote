import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Dimensions, TextInput, BackHandler } from 'react-native';
import Colors from '../../constants/Colors';
import { getData } from '../../database/StoreData';
import { Notes } from '../../models/Notes';
import Lottieview from "lottie-react-native";



export default function HomePageScreen() {
  const [note, setNote] = useState<Array<Notes> | null>(null);
  const [search, setSearch] = useState<string>('')
  const [searchRes, setSearchRes] = useState<boolean>(false)

  const navigation = useNavigation();

  const retrieveData = async () => {
    const noteList = await getData('noteList');
    if (noteList) {
      const json = JSON.parse(noteList);
      setNote(json);
    }
  }

  const handleSearch = (text) => {
    setSearch(text);
    if (!text.trim()) {
      setSearch('')
      setSearchRes(false)
      retrieveData()
    }
    const filteredNote = note?.filter(notes => {
      if (notes.title.toLowerCase().includes(text.toLowerCase())) {
        return notes;
      }
    })
    if (filteredNote?.length) {
      setNote([...filteredNote])
    } else {
      setSearchRes(true)
    }
  }

  const handleClear = () => {
    setSearch('')
    setSearchRes(false)
    retrieveData()
  }

  useFocusEffect(
    useCallback(() => {
      retrieveData();
    }, [])
  )

  return (
    <View style={styles.container}>
      {note?.length ?
        <View
          style={styles.searchbarContainer}
        >
          <TextInput
            style={styles.searchbar}
            placeholder='Search Here...'
            placeholderTextColor={Colors.txt}
            value={search}
            onChangeText={handleSearch}
          />
          {search ? (
            <AntDesign
              name='close'
              size={20}
              color={Colors.txt}
              onPress={handleClear}
              style={styles.clearIcon}
            />
          ) : null}
        </View>
        : null}
      {searchRes ?
        <View
          style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
        >
          <Lottieview style={styles.lottie}
            source={require('../../assets/lottie/823-crying.json')}
            autoPlay
          />
          <Text
            style={styles.emptyHeader}
          >
            Note not found!!
          </Text>
        </View>
        :
        <ScrollView style={styles.listcontainer}>
          <View>
            {note && note.map((notes: Notes, index: number) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("NoteView", {
                    note: notes, index: index
                  });
                  setSearch('')
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
          <View style={{ height: 30 }} />
        </ScrollView>
      }


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
    backgroundColor: '#495057',
  },
  btncontainer: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  notecontainer: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#212529',
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center'
  },
  listcontainer: {
    width: Dimensions.get('screen').width - 20,
    padding: 10,
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
  },
  searchbarContainer: {
    justifyContent: 'center',
  },
  searchbar: {
    borderWidth: 1,
    borderColor: Colors.txt,
    height: 40,
    borderRadius: 40,
    paddingLeft: 20,
    fontSize: 20,
    width: Dimensions.get('screen').width - 50,
    marginVertical: 10,
    color: Colors.txt,
  },
  clearIcon: {
    position: 'absolute',
    right: 15,
  },
  lottie: {
    width: Dimensions.get('screen').width * .7,
    height: Dimensions.get('screen').height * .25,
  },
});
