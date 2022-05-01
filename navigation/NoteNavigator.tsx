import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { NoteParamList } from '../types';
import { AddNoteScreen, EditNotescreen } from '../screens/Note';
import Colors from '../constants/Colors';

const Stack = createStackNavigator<NoteParamList>();

export default function NoteNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='AddNote'
            screenOptions={({ navigation }) => ({
                title: 'Add Note',
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
                headerRight: () => (
                    <TouchableOpacity
                        style={{
                            marginRight: 5
                        }}
                        onPress={() => {
                            navigation.navigate("Home",  {
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
        >
            <Stack.Screen
                options={{
                    title: 'Edit Note',
                    
                }}
                name="EditNote" component={EditNotescreen}
            />
            <Stack.Screen
                options={{
                    title: 'Add Note'
                }}
                name="AddNote" component={AddNoteScreen}
            />
        </Stack.Navigator>
    );
}