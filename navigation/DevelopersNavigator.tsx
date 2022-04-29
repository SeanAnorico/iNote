import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { DevelopersParamList } from '../types';
import { DevelopersScreen } from '../screens/Developers';
import Colors from '../constants/Colors';

const Stack = createStackNavigator<DevelopersParamList>();

export default function DevelopersNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='DevelopersInfo'
            screenOptions={({ navigation }) => ({
                title: 'Application Developers',
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
            <Stack.Screen name="DevelopersInfo" component={DevelopersScreen} />
        </Stack.Navigator>
    );
}