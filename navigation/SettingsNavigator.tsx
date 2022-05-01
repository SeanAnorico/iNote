import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import {  SettingsParamList } from '../types';
import Colors from '../constants/Colors';
import { EditNickNameScreen, SettingsScreen } from '../screens/Settings';


const Stack = createStackNavigator<SettingsParamList>();

export default function SettingsNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='SettingsPage'
            screenOptions={({ navigation }) => ({
                title: 'Settings',
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
                    title: 'Settings',
                    
                }}
                name="SettingsPage" component={SettingsScreen}
            />
            <Stack.Screen
                options={{
                    title: 'Nickname Change'
                }}
                name="EditNickname" component={EditNickNameScreen}
            />
            
        </Stack.Navigator>
    );
}