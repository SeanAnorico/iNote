import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';


export default function EditNickNameScreen() {
    const [un, setUN] = useState<string>('')

    const handleSubmit = async () => {
        const user = { name: un };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('Settings', {screen: 'SettingsPage'})
    }

    const navigation = useNavigation();

    const [user, setUser] = useState('')
    const findUser = async () => {
        const result = await AsyncStorage.getItem('user');
        if (result !== null) {
            setUser(JSON.parse(result));
        }
    }
    useFocusEffect(
        useCallback(() => {
            findUser()
        }, [])
    )
    return (
        <View style={styles.container}>
            <Text
                style={styles.inputtitle}
            >
                Enter your new Nickname
            </Text>
            <TextInput
                label=''
                placeholder='Enter your nickname'
                placeholderTextColor={'darkgray'}
                autoComplete={false}
                mode={'flat'}
                style={styles.txtinput}
                underlineColor={Colors.txt}
                activeUnderlineColor={Colors.btn}
                value={user.name}
                onChangeText={setUN}
                theme={{
                    colors: {
                        text: Colors.txt,
                    }
                }}
            />
            {un.trim().length >= 3 ?
                <Button
                    title="SAVE"
                    icon={{
                        name: 'arrow-right',
                        type: 'font-awesome',
                        size: 16,
                        color: 'white',
                        reverse: false,
                    }}
                    iconRight
                    iconContainerStyle={{ marginLeft: 20 }}
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        backgroundColor: 'rgba(90, 154, 230, 1)',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 150,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={() => {
                        handleSubmit();
                    }}
                />
                : null}
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
    txtinput: {
        fontSize: 16,
        fontFamily: 'poppins-regular',
        height: 50,
        width: Dimensions.get('screen').width - 70,
        marginVertical: 10,
        backgroundColor: '#6c757d'
    },
    inputtitle: {
        alignSelf: 'flex-start',
        color: Colors.txt,
        fontSize: 18,
        paddingLeft: Dimensions.get('screen').width * 0.1,
        marginBottom: 5,
        opacity: 0.5,
    },
});
