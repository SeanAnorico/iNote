import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { HomePageScreen, NoteViewScreen } from '../screens/Home';
import { HomeParamList } from '../types';
import Colors from '../constants/Colors';
import NoteNavigator from './NoteNavigator';
import { AddNoteScreen, EditNotescreen } from '../screens/Note';
import { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LogInScreen from '../screens/Intro/LogInScreen';
import { removeData } from '../database/StoreData';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator<HomeParamList>();
// const Stack2 = createStackNavigator();

export default function HomeNavigator() {
    const [user, setUser] = useState('')
    const findUser = async () => {
        const result = await AsyncStorage.getItem('user');
        if (result !== null) {
            setUser(JSON.parse(result));
        }
    }
    // useEffect(() => {
    //     findUser()
    //     // removeData('user')
    // }, [])
    useFocusEffect(
        useCallback(() => {
          findUser();
        //   removeData('user')
        }, [])
      )

    if (!user.name) return <LogInScreen onFinish={findUser} />;

    return (
        <Stack.Navigator
            initialRouteName='HomePage'
            screenOptions={({ navigation }) => ({
                title: 'Notes',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: Colors.bg
                },
                headerTintColor: Colors.txt,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{
                            marginLeft: 5
                        }}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    >
                        <Ionicons
                            name='menu'
                            size={32}
                            color='#FAFAFF'
                        />
                    </TouchableOpacity>
                ),
            })}
        >
            <Stack.Screen name="HomePage" component={HomePageScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    title: 'View Note',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginRight: 5
                            }}
                            onPress={() => {
                                navigation.navigate("Home", {
                                    screen: "HomePage"
                                });
                            }}
                        >
                            <Ionicons
                                name='chevron-back'
                                size={32}
                                color='#FAFAFF'
                            />
                        </TouchableOpacity>
                    ),
                })}
                name="NoteView" component={NoteViewScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    title: 'Add Note',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginRight: 5
                            }}
                            onPress={() => {
                                navigation.navigate("Home", {
                                    screen: "HomePage"
                                });
                            }}
                        >
                            <Ionicons
                                name='chevron-back'
                                size={32}
                                color='#FAFAFF'
                            />
                        </TouchableOpacity>
                    ),
                })}
                name="AddNote" component={AddNoteScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    title: 'Edit Note',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginRight: 5
                            }}
                            onPress={() => {
                                navigation.navigate("Home", {
                                    screen: "HomePage"
                                });
                            }}
                        >
                            <Ionicons
                                name='chevron-back'
                                size={32}
                                color='#FAFAFF'
                            />
                        </TouchableOpacity>
                    ),
                })}
                name="EditNote" component={EditNotescreen}
            />
        </Stack.Navigator>
    );
}