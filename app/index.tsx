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
    { icon: "box", title: "Total Items", value: statistique.totalProducts?.toString() || "10" },
    { icon: "truck", title: "Most Added", value: statistique.mostAddedProducts?.toString() || "10" },
    { icon: "alert-circle", title: "Low Stock", value: statistique.outOfStock?.toString() || "10" },
    { icon: "trending-up", title: "Most Removed", value: statistique.mostRemovedProducts?.toString() || "10" },
    { icon: "dollar-sign", title: "Stock Value", value: statistique.totalStockValue?.toString() || "10" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Container className="px-4 py-8">
        <View className="mb-8">
          <Text className="text-4xl font-bold text-gray-800 mb-2 text-center">Welcome Back</Text>
          <Text className="text-lg text-gray-600 text-center">Here's your warehouse overview</Text>
        </View>

        <View className="flex-row flex-wrap justify-between mb-8">
          {warehouseData.map((item, index) => (
            <View key={index} className="w-[48%] bg-white rounded-2xl p-5 mb-4 shadow-md">
              <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Feather name={item.icon} size={24} color="#3B82F6" />
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-1">{item.value}</Text>
              <Text className="text-sm text-gray-600">{item.title}</Text>
            </View>
          ))}
        </View>

        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => router.push("/product/product")}
              className="bg-blue-500 px-6 py-4 rounded-xl flex-row items-center justify-center shadow-lg w-[48%]"
            >
              <Feather name="list" size={20} color="#fff" className="mr-2" />
              <Text className="text-white font-semibold">List Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/ScanScreen')}
              className="bg-green-500 px-6 py-4 rounded-xl flex-row items-center justify-center shadow-lg w-[48%]"
            >
              <Feather name="camera" size={20} color="#fff" className="mr-2" />
              <Text className="text-white font-semibold">Scan Barcode</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 px-6 py-4 rounded-xl flex-row items-center justify-center shadow-lg"
          testID="logout-button"
        >
          <Feather name="log-out" size={20} color="#fff" className="mr-2" />
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  );
}