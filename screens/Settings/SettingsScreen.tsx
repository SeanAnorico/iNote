import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState, } from 'react';
import { BackHandler } from 'react-native';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Dimensions, Alert } from 'react-native';
import { Button, colors } from 'react-native-elements';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, removeData, storeData } from '../../database/StoreData';



export default function SettingsScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState('')
    const findUser = async () => {
        const result = await AsyncStorage.getItem('user');
        if (result !== null) {
            setUser(JSON.parse(result));
        }
    }

    const [greet, setGreet] = useState('');

    const findGreet = () => {
        const hrs = new Date().getHours()
        if (hrs === 0 || hrs < 12) {
            return setGreet('Morning');
        } else if (hrs === 1 || hrs < 17) {
            return setGreet('Afternoon');
        } else {
            return setGreet('Evening')
        }
    };

    const removeItem = async () => {
        const noteList = await getData('noteList')
        if (noteList) {
            const json = JSON.parse(noteList);
            json.splice(0)
            storeData('noteList', JSON.stringify(json));
        } else {
            //   storeData('noteList', JSON.stringify([data]));
            // await removeData('noteList')
        }

        navigation.navigate("Home", {
            screen: "HomePage"
        })
    }

    const popUpAlert = () => {
        Alert.alert('Are You Sure?', 'This action will delete all of your notes.',
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

    useFocusEffect(
        useCallback(() => {
            findUser()
            findGreet()
        }, [])
    )
    return (
        <View style={styles.container}>
            <View>
                <Text
                    style={styles.header}
                >
                    Your current used nickname is:
                </Text>
                <Text
                    style={styles.name}
                >
                    "{user.name}"
                </Text>
                <View style={styles.btncontainer}>
                    <Button
                        title="Edit Nickname"
                        // loading={loading}
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
                            navigation.navigate('Settings', { screen: 'EditNickname' })
                        }}
                    />
                    <Button
                        title="Clear Note"
                        // loading={loading}
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: 'red',
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
                            popUpAlert()
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#495057',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 25,
        color: Colors.txt,
    },
    name: {
        fontSize: 22,
        color: Colors.txt,
    },
    btncontainer: {
        marginVertical: 10,
    }
});
