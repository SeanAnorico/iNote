import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Guide from '../../constants/Guide';

const { width } = Dimensions.get('window')
const height = width * 1.5

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        style={{ width, height, }}
      >
        {
          Guide.map((guide, index) => (
            
            <View
                style={{width,justifyContent: 'center', alignItems: 'center'}}
            >
              <Image
                key={index}
                source={guide.image}
                style={{ width: width*.7, height, resizeMode: 'center', borderWidth: 1, borderColor: 'white' }}
              />
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
