import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';

function LogInScreen({ onFinish }) {
    const [un, setUN] = useState<string>('')

    const handleSubmit = async () => {
        const user = { name: un };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if (onFinish) onFinish();
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/icon.png")}
                style={{
                    width: imgsize,
                    height: imgsize,
                    borderRadius: 15,
                    marginBottom: 100,
                }}
            />
            <Text
                style={styles.inputtitle}
            >
                Enter a Nickname to Continue
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
                value={un}
                onChangeText={setUN}
                theme={{
                    colors: {
                        text: Colors.txt,
                    }
                }}
            />
            {un.trim().length >= 3 ?
                <Button
                    title="CONTINUE"
                    // loading={loading}
                    icon={{
                        name: 'arrow-right',
                        type: 'font-awesome',
                        size: 25,
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
                        width: 200,
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
const imgsize = Dimensions.get('screen').width * 0.5;
const styles = StyleSheet.create({
    container: {
        // width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').height,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#495057',
    },
    txtinput: {
        fontSize: 16,
        fontFamily: 'poppins-regular',
        height: 50,
        width: Dimensions.get('screen').width - 70,
        marginVertical: 10,
        backgroundColor: '#6c757d',
        
    },
    inputtitle: {
        alignSelf: 'flex-start',
        color: Colors.txt,
        fontSize: 18,
        paddingLeft: Dimensions.get('screen').width * 0.1,
        marginBottom: 5,
        opacity: 0.5,
    },
})

export default LogInScreen;