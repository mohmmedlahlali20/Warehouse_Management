"use client"

import { View, Text, StatusBar, Image, ActivityIndicator, ScrollView, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { Stack, useRouter } from "expo-router"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { getProducts } from "../(redux)/slice/productsSlice"


export default function Product() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading, error, products } = useAppSelector((state) => state.Products)

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts())
    }
    fetchProducts()
  }, [dispatch])

  const handleProductPress = (productId: string) => {
    console.log("productId:", productId)
    router.push(`/product/productDetails?productId=${productId}`);
}


  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "List Of Products",
          headerStyle: { backgroundColor: "#4F46E5" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <ScrollView className="flex-1 px-4 py-6">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#4F46E5" />
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-red-500 text-lg">{error}</Text>
          </View>
        ) :  (
          products.map((product) => (
            <Pressable
              key={product.id}
              className="bg-white rounded-lg shadow-md mb-4 p-4 flex-row items-center"
              onPress={() => handleProductPress(product.id)}
            >
              <Image
                source={{ uri: product.image }}
                className="w-20 h-20 rounded-lg mr-4"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">{product.name}</Text>
                <Text className="text-sm text-gray-600 mt-1">{product.type}</Text>
                <Text className="text-indigo-600 font-bold mt-1">${product.price}</Text>
              </View>
            </Pressable>
          ))
        ) }
      </ScrollView>
    </View>
  )
}

