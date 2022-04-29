import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import React, { useCallback, useEffect, useState } from "react"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeData } from "../database/StoreData";
import { loadOptions } from "@babel/core";



const CustomDrawer = props => {
    const navigation = useNavigation();

    const [user, setUser] = useState('')
    const findUser = async () => {
        const result = await AsyncStorage.getItem('user');
        if (result !== null) {
            setUser(JSON.parse(result));
        }
    }

    const [greet, setGreet] = useState('');

    const findGreet = () => {
        const hrs = new Date().getHours()
        if (hrs === 0 || hrs < 12) {
            return setGreet('Morning');
        } else if (hrs === 1 || hrs < 17) {
            return setGreet('Afternoon');
        } else {
            return setGreet('Evening')
        }
    };
    // useEffect(() => {
    //     setTimeout(() => {
    //         findUser()
    //         findGreet()
    //         // removeData('user')
    //     }, 10000)
    // }, [AsyncStorage.getItem('user')])



    useFocusEffect(
        useCallback(() => {
            findUser()
            findGreet()
            // 
        }, [])
    )




    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} style={{ padding: 10 }}>
                <View style={{
                    padding: 5,
                    backgroundColor: '#495057',
                    borderRadius: 10,
                    marginVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("About", {
                                screen: "AbotuApp"
                            });
                        }}
                    >
                        <Image
                            source={require("../assets/images/icon.png")}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                                marginRight: 10,
                            }}
                        />
                    </TouchableOpacity>
                    <View>

                        <Text style={{
                            color: '#a2d2ff',
                            fontSize: 18,
                        }}>
                            {`Good ${greet}`}
                        </Text>
                        <Text style={{
                            color: '#a2d2ff',
                            fontSize: 20,
                        }}
                        >
                            {user.name}
                        </Text>

                    </View>
                    {/* <TouchableOpacity
                        style={{
                            // position: 'relative',
                            // bottom: 50,
                            // right: 0,
                            // left: 0,
                            backgroundColor: '#6C757D',
                            padding: 10,
                            marginHorizontal: 5,
                            marginTop: 7,
                            borderRadius: 5,
                            width: '100%',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 18
                        }}>
                            Log Out
                        </Text>
                    </TouchableOpacity> */}
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer;