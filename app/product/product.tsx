import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch'

export default function product() {

    const dispatch = useAppDispatch()
    const {isLoading, error} = useAppSelector((state) => state.Products)


    const getProduct = async () => {
        dispatch()
    }





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