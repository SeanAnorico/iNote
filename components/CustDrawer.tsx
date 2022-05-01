import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import React, { useEffect, useState } from "react"
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, InteractionManager } from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';


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
        } else if (hrs === 12 || hrs < 18) {
            return setGreet('Afternoon');
        } else {
            return setGreet('Evening')
        }
    };

    useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            // Expensive task
            findUser()
            findGreet()
        });

        return () => task.cancel();
    })

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
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer;