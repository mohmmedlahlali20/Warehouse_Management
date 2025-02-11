import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';

export default function productDetails() {
    const { id } = useLocalSearchParams();
    console.log(id);


    return (
        <View>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "details products X",
                    headerStyle: { backgroundColor: "#4F46E5" },
                    headerTintColor: "#ffffff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <Text>productDetails</Text>
        </View>
    )
}