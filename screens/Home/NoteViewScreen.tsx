import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Dimensions, Alert } from 'react-native';
import { Button, colors } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { getData, removeData, storeData } from '../../database/StoreData';
import { HomeParamList } from '../../types';


type IRoute = {
  "params": HomeParamList['NoteView'];
}

export default function NoteViewScreen() {
  const route = useRoute<RouteProp<IRoute, "params">>();
  const { title, description, time } = route.params.note
  const index = route.params.index;


  const removeItem = async () => {
    const data = {
      title: title,
      description: description,
      time: Date.now(),
    }
    // console.log(data)
    // 
    const noteList = await getData('noteList')
    if (noteList) {
      const json = JSON.parse(noteList);
      json.splice(index, 1)
      storeData('noteList', JSON.stringify(json));
    } else {
      storeData('noteList', JSON.stringify([data]));
      // await removeData('noteList')
    }

    navigation.navigate("Home", {
      screen: "HomePage"
    })
  }

  const popUpAlert = () => {
    Alert.alert('Are You Sure?', 'This action will delete your note permanently.',
      [
        {
          text: 'Cancel',
          onPress: () => { }
        },
        {
          text: 'Delete',
          onPress: removeItem
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  const navigation = useNavigation();

  const formatDate = (time: string) => {
    const date = new Date(time)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hrs = date.getHours()
    const mins = date.getMinutes()
    const secs = date.getSeconds()

    return `${day}/${month}/${year} - ${hrs}:${mins}:${secs}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text
          style={styles.time}
        >
          {`Last Change At ${formatDate(time)}`}
        </Text>
        <Text
          style={styles.title}
        >
          {title}
        </Text>
        <ScrollView style={styles.desccontainer}>
          <Text
            style={styles.desc}
          >
            {description}
          </Text>
        </ScrollView>

        <View style={styles.btncontainer}>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 45,
              backgroundColor: 'red',
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.txt,

            }}
            onPress={popUpAlert}
          >
            <Ionicons
              name='trash'
              size={25}
              color='#FAFAFF'
            />
          </TouchableOpacity>
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

            }}
            onPress={() => {
              navigation.navigate("Home", {
                screen: "EditNote",
                params: { note: route.params.note, index: index }
              })
            }}
          >
            <Ionicons
              name='pencil-sharp'
              size={25}
              color='#FAFAFF'
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495057',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  btncontainer: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    flexDirection: 'row'
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
    color: Colors.txt,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 30,
    color: Colors.txt,
    fontWeight: 'bold',
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingHorizontal: 5,
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
    color: Colors.txt
  },
  desccontainer: {
    // height: Dimensions.get('screen').height - 250,
    marginBottom: 75,
  }
});
