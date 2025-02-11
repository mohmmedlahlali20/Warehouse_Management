import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function product() {
    return (
        <View>
            <Stack.Screen options={{ 
                headerShown: true,
                title: "List Of Products"
                 }} />
            <Text>product</Text>
        </View>
    )
}