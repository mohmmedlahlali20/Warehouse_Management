import { Stack, useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Container } from "~/components/Container";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { logoutAction } from "./(redux)/slice/warehousemansSlice";
import { useEffect } from "react";
import { Statistique } from "./(redux)/slice/statistiqueSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, statistique } = useAppSelector((state) => state.statistique);

  console.log('====================================');
  console.log(statistique);
  console.log('====================================');

  useEffect(() => {
    const fetchStatistique = async () => {
      await dispatch(Statistique());
    };

    fetchStatistique();
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutAction());
    router.push("/(auth)/login");
  };

  const warehouseData = [
    { icon: "box", title: "Total Items", value: statistique.totalProducts.toString() || 0 },
    { icon: "truck", title: "most Added Products", value: statistique.mostAddedProducts.toString() || 0 }, 
    { icon: "alert-circle", title: "Low Stock", value: statistique.outOfStock.toString() || 0 },
    { icon: "trending-up", title: "most Removed Products", value: statistique.mostRemovedProducts.toString() || 0 }, 
    { icon: "star", title: "total Stock Value", value: statistique.totalStockValue.toString() || 0 }, 
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Container className="px-4 py-6">
        <View className="mb-8">
          <Text className="text-4xl font-bold text-gray-800 mb-2 text-center">Welcome Back</Text>
          <Text className="text-lg text-gray-600 text-center">Here's your warehouse overview</Text>
        </View>

        <View className="flex-row flex-wrap justify-between mb-6">
          {warehouseData.map((item, index) => (
            <View key={index} className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-sm">
              <Feather name={item.icon} size={24} color="#4B5563" />
              <Text className="text-lg font-semibold text-gray-800 mt-2">{item.value}</Text>
              <Text className="text-sm text-gray-600">{item.title}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between gap-4 m-3 ">
            <TouchableOpacity
              onPress={() => router.push("/product/product")}
              className="bg-blue-500 px-6 py-3 rounded-xl flex-row items-center shadow-md"
            >
              <Feather name="list" size={20} color="#fff" className="mr-2" />
              <Text className="text-white font-semibold">List Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/product/addProducts")}
              className="bg-green-500 px-6 py-3 rounded-xl flex-row items-center shadow-md"
            >
              <Feather name="camera" size={20} color="#fff" className="mr-2" />
              <Text className="text-white font-semibold">Scan Barcode</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 px-6 py-3 rounded-xl flex-row items-center justify-center"
        >
          <Feather name="log-out" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  );
}
