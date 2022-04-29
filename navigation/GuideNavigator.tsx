import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { DevelopersParamList, GuideParamList } from '../types';
import { DevelopersScreen } from '../screens/Developers';
import Colors from '../constants/Colors';
import { GuideScreen } from '../screens/Guide';

const Stack = createStackNavigator<GuideParamList>();

export default function GuideNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='UserGuide'
            screenOptions={({ navigation }) => ({
                title: 'Guide',
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
            <Stack.Screen name="UserGuide" component={GuideScreen} />
        </Stack.Navigator>
    );
}