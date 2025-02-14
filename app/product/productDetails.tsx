import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { getProductById, updateQuantityInStock } from "../(redux)/slice/productsSlice";
import { Feather } from "@expo/vector-icons";
import WarehouseMap from "./WarehouseMap";
import StockCounter from "./StockCounter";

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
            <StockCounter totalStock={totalStock} onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600">No product found</Text>
        </View>
      )}
         {selectedProduct && <WarehouseMap />}
    </ScrollView>
  );
}
