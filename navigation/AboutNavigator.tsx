import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { HomePageScreen } from '../screens/Home';
import { AboutParamList } from '../types';
import { AboutScreen } from '../screens/About';
import Colors from '../constants/Colors';

const Stack = createStackNavigator<AboutParamList>();

export default function AboutNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='AboutApp'
            screenOptions={({ navigation }) => ({
                title: 'About App',
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
                )
            })}
        >
            <Stack.Screen name="AboutApp" component={AboutScreen} />
        </Stack.Navigator>
    );
}