/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Notes } from './models/Notes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  Developers: undefined;
  About: undefined;
  Settings: undefined;
  Guide: undefined;
  Note: undefined;
};

export type HomeParamList = {
  HomePage: undefined;
  NoteView: {
    index: number;
    note: Notes;
  };
  AddNote: undefined;
  EditNote: {
    index: number;
    note: Notes;
  };
};

export type DevelopersParamList = {
  DevelopersInfo: undefined;
};

export type GuideParamList = {
  UserGuide: undefined;
};

export type AboutParamList = {
  AboutApp: undefined;
};

export type SettingsParamList = {
  SettingsPage: undefined;
  EditNickname: undefined;
};

export type NoteParamList = {
  
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
