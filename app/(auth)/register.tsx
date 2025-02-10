import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';


export default function register() {
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
            <Stack.Screen options={{ title: "Login", headerShown: false }} />

            <View className="flex-1 justify-center px-6 ">
                <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back!</Text>
                <Text className="text-lg text-gray-600 mb-8 text-center">Please sign in to continue.</Text>

                <View className="mb-4">
                    <Text className="text-base font-medium text-gray-700 mb-2">Code</Text>
                    <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
                        <SimpleLineIcons name="user" size={20} color="#6B7280" className="mr-2" />
                        <TextInput
                            className="flex-1 text-base text-gray-700"
                            placeholder="Enter your Code"
                            placeholderTextColor="#9CA3AF"
                            value={code}
                            onChangeText={setCode}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View className="mb-4">
                    <Text className="text-base font-medium text-gray-700 mb-2">Password</Text>
                    <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
                        <Ionicons name="lock-closed-outline" size={20} color="#6B7280" className="mr-2" />
                        <TextInput
                            className="flex-1 text-base text-gray-700"
                            placeholder="Enter your password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity className="self-end mb-6">
                    <Text className="text-blue-500 font-semibold">Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-blue-500 rounded-md py-3 items-center shadow-md">
                    <Text className="text-white font-semibold text-lg">Login</Text>
                </TouchableOpacity>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600">Don't have an account? </Text>
                    <TouchableOpacity>
                        <Link href='/(auth)/login'>
                            <Text className="text-blue-500 font-semibold">Sign Up</Text>
                        </Link>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}