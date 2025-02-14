import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { getProductById, updateQuantityInStock } from "../(redux)/slice/productsSlice";
import { Feather } from "@expo/vector-icons";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();
  const { isLoading, error, selectedProduct } = useAppSelector((state) => state.Products);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [totalStock, setTotalStock] = useState(0);

  const handleIncrement = () => {
    if (selectedProduct && selectedProduct.stocks[0]) {
      dispatch(
        updateQuantityInStock({
          type: "add",
          productId: selectedProduct.id,
          stokId: selectedProduct.stocks[0].id,
          warehousemanId: Math.floor(Math.random()), 
        })
      );

    }
  };
  
  const handleDecrement = () => {
    if (selectedProduct && selectedProduct.stocks[0]) {
      dispatch(
        updateQuantityInStock({
          type: "remove",
          productId: selectedProduct.id,
          stokId: selectedProduct.stocks[0].id,
          warehousemanId: Math.floor(Math.random()),
        })
      );
    }
  };

  useEffect(() => {
    if (selectedProduct) {
       const stockSum = selectedProduct.stocks.reduce((total, stock) => total + stock.quantity, 0);
       setTotalStock(stockSum);
    }
 }, [selectedProduct]);
 
  useEffect(() => {
    const selectProduct = async () => {
      
        await dispatch(getProductById(productId as string));
     
    };
    selectProduct();
  }, [dispatch, productId]);
  

  const stockTextColor = totalStock > 10 ? "#16A34A" : totalStock > 5 ? "#EAB308" : "#DC2626";

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          headerShown: true,
          title: selectedProduct?.name,
          headerStyle: { backgroundColor: "#4F46E5" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      {isLoading ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600">Loading...</Text>
        </View>
      ) : selectedProduct ? (
        <View className="p-4">
          <Image
            source={{ uri: selectedProduct.image }}
            className="w-full h-64 rounded-lg mb-4"
            resizeMode="cover"
          />
          <Text className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.name}</Text>
          <Text className="text-xl text-indigo-600 font-semibold mb-4">${selectedProduct.price}</Text>
          <View className="flex-row items-center mb-4">
            <Feather name="box" size={20} color="#4B5563" />
            <Text style={{ color: stockTextColor, marginLeft: 8 }}>
              In Stock: {totalStock}
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Feather name="tag" size={20} color="#4B5563" />
            <Text className=" ml-2 ">Category: {selectedProduct.type}</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Feather name="dollar-sign" size={20} color="#4B5563" />
            <Text className=" ml-2 ">Prix :{selectedProduct.price}</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Feather name="tag" size={20} color="#4B5563" />
            <Text className=" ml-2 ">Solde :{selectedProduct.solde}</Text>
          </View>
          <View className="bg-gray-300 flex-1 justify-center p-4 m-3 rounded-lg shadow-md">
            <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
              Quantity in stock
            </Text>

            <View className="flex-row justify-between gap-4">
              <TouchableOpacity
                onPress={handleIncrement}
                className="bg-blue-500 px-6 py-3 rounded-xl flex-row items-center justify-center shadow-md flex-1"
              >
                <Feather name="plus" size={20} color="#fff" />
                <Text className="text-white font-semibold ml-2">Increment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDecrement}
                className="bg-red-500 px-6 py-3 rounded-xl flex-row items-center justify-center shadow-md flex-1"
              >
                <Feather name="minus" size={20} color="#fff" />
                <Text className="text-white font-semibold ml-2">Decrement</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1 justify-center px-6 py-8 bg-white m-3 rounded-lg shadow-md">
            <Text className="text-2xl text-center mb-4 font-semibold">Localisation of Warehouses</Text>
            <MapView
              style={{ width: "100%", height: 300 }}
              initialRegion={{
                latitude: selectedProduct?.stocks[0].localisation.latitude,
                longitude: selectedProduct?.stocks[0].localisation.longitude,
                latitudeDelta: 5,
                longitudeDelta: 5,
              }}
            >
              {selectedProduct.stocks.length > 0 ? (
                selectedProduct.stocks.map((stock) => (
                  <Marker
                    key={stock.id}
                    coordinate={{
                      latitude: stock.localisation.latitude,
                      longitude: stock.localisation.longitude,
                    }}
                    title={stock.name}
                    description={`Stock: ${stock.quantity}`}
                  />
                ))
              ) : (
                <Text className="text-center text-red-500">No warehouse locations available</Text>
              )}
            </MapView>
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600">No product found</Text>
        </View>
      )}
    </ScrollView>
  );
}
