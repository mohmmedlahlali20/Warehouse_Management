"use client"

import { View, Text, StatusBar, ScrollView, Image } from "react-native"
import { useEffect } from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { getProductById } from "../(redux)/slice/productsSlice"
import { Feather } from "@expo/vector-icons"

export default function ProductDetails() {
  const { productId } = useLocalSearchParams()
  const { isLoading, error, selectedProduct } = useAppSelector((state) => state.Products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const selectProduct = async () => {
      await dispatch(getProductById(productId as string))
    }
    selectProduct()
  }, [dispatch, productId])

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          headerShown: true,
          title: selectedProduct?.name || "Product Details",
          headerStyle: { backgroundColor: "#4F46E5" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      {isLoading ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600">Loading...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-red-500">Error: {error}</Text>
        </View>
      ) : selectedProduct ? (
        <View className="p-4">
          <Image
            source={{ uri: selectedProduct.image}}
            className="w-full h-64 rounded-lg mb-4"
            resizeMode="cover"
          />
          <Text className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.name}</Text>
          <Text className="text-xl text-indigo-600 font-semibold mb-4">${selectedProduct.price}</Text>
          <View className="flex-row items-center mb-4">
            <Feather name="box" size={20} color="#4B5563" />
            <Text className="text-gray-600 ml-2">In Stock: {selectedProduct.stocks.quantity}</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Feather name="tag" size={20} color="#4B5563" />
            <Text className="text-gray-600 ml-2">Category: {selectedProduct.type}</Text>
          </View>
          <Text className="text-lg text-gray-700 mb-4">{selectedProduct.solde}</Text>
          <View className="bg-white p-4 rounded-lg shadow-md">
            <Text className="text-xl font-semibold text-gray-800 mb-2">Product Details</Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">supplier</Text>
              <Text className="text-gray-800">{selectedProduct.supplier}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Weight</Text>
              <Text className="text-gray-800">{selectedProduct.solde} kg</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Dimensions</Text>
              <Text className="text-gray-800">{selectedProduct.barcode}</Text>
            </View>
          </View>
          <View className="flex-1 justify-center px-6 py-8">
            <Text className="text-2xl">Localisation of warehouse</Text>
          </View>
        </View>
        
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600">No product found</Text>
        </View>
      )}
    </ScrollView>
  )
}

