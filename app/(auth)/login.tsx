"use client";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, StatusBar } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { loginAction } from "../(redux)/slice/warehousemansSlice";

export default function Login() {
    const [secretKey, setSecretKey] = useState("AH99090J");
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.warehousemans);
    const router = useRouter();

    const handleLogin = async (values: { secretKey: string }) => {
        try {
            await dispatch(loginAction(values.secretKey));
            router.push("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-gray-100">
            <Stack.Screen options={{ headerShown: false }} />

            <View className="flex-1 justify-center px-6">
                <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back!</Text>
                <Text className="text-lg text-gray-600 mb-8 text-center">Please sign in to continue.</Text>
                {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}
                <View className="mb-4">
                    <Text className="text-base font-medium text-gray-700 mb-2">Secret Code</Text>
                    <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
                        <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                        <TextInput
                            className="flex-1 text-base text-gray-700 ml-2"
                            placeholder="Enter your code"
                            placeholderTextColor="#9CA3AF"
                            value={secretKey}
                            onChangeText={setSecretKey}
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => handleLogin({ secretKey })}
                    className={`bg-blue-500 rounded-md py-3 items-center shadow-md `}
                >
                        <Text className="text-white font-semibold text-lg">Login</Text>
                   
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}