import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Dev from '../../constants/Dev';

const { width } = Dimensions.get('window')
const height = width * .6

export default function DevelopersScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        style={{ width, height, }}
      >
        {
          Dev.map((dev, index) => (
            <View>
              <Image
                key={index}
                source={dev.image}
                style={{ width, height, resizeMode: 'contain' }}
              />
              <Text
                style={styles.name}
              >
                {dev.name}
              </Text>
              <Text
                style={styles.desc}
              >
                {dev.desc}
              </Text>
              <View
                style={{ width, height, justifyContent: 'center', flexDirection: 'row'}}
              >
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
                >
                  <Ionicons
                    name='logo-facebook'
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
                    marginRight: 10

                  }}
                >
                  <Ionicons
                    name='logo-instagram'
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
                    marginRight: 10

                  }}
                >
                  <Ionicons
                    name='logo-twitter'
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
                    marginRight: 10

                  }}
                >
                  <Ionicons
                    name='logo-linkedin'
                    size={25}
                    color='#FAFAFF'
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#495057',
    paddingVertical: 20,
  },
  name: {
    width,
    padding: 15,
    color: Colors.txt,
    fontWeight: 'bold',
    fontSize: 25,
  },
  desc: {
    width,
    height,
    paddingHorizontal: 20,
    color: Colors.txt,
    fontSize: 18,
    opacity: 0.7
  }

});
