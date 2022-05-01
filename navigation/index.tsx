import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import DevelopersNavigator from './DevelopersNavigator';
import AboutNavigator from './AboutNavigator';
import CustomDrawer from '../components/CustDrawer';
import SettingsNavigator from './SettingsNavigator';
import { FontAwesome } from '@expo/vector-icons';
import GuideNavigator from './GuideNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#212529',
          flex: 1,
          paddingBottom: 20,
        },
        drawerActiveBackgroundColor: '#6C757D',
        drawerActiveTintColor: 'white',
        drawerInactiveBackgroundColor: '#343A40',
        drawerInactiveTintColor: 'white'
      }}
    >
      <Drawer.Screen name="Home" component={HomeNavigator}
       options={{
         drawerIcon: ({ color }) =>  <DrawerIcon name="home" color={color} />
       }} 
      />
      <Drawer.Screen name="Settings" component={SettingsNavigator}
        options={{
          drawerIcon: ({ color }) =>  <DrawerIcon name="gears" color={color} />
        }} 
      />
      <Drawer.Screen name="Guide" component={GuideNavigator}
        options={{
          drawerIcon: ({ color }) =>  <DrawerIcon name="book" color={color} />
        }} 
      />
      <Drawer.Screen name="Developers" component={DevelopersNavigator}
        options={{
          drawerIcon: ({ color }) =>  <DrawerIcon name="code" color={color} />
        }} 
      />
      <Drawer.Screen name="About" component={AboutNavigator}
        options={{
          drawerIcon: ({ color }) =>  <DrawerIcon name="info-circle" color={color} />
        }} 
      />
    </Drawer.Navigator>
  );
}

function DrawerIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginLeft: 10, marginRight: -20 }} {...props} />;
}


