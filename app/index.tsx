import { Link, Stack, useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { logoutAction } from "./(redux)/slice/warehousemansSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutAction());
    router.push("/(auth)/login");
  };

  const warehouseData = [
    { icon: "box", title: "Total Items", value: "1,234" },
    { icon: "truck", title: "Shipments", value: "56" },
    { icon: "alert-circle", title: "Low Stock", value: "23" },
    { icon: "trending-up", title: "Top Selling", value: "78" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: "Warehouse Dashboard" }} />
      <Container>
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</Text>
          <Text className="text-gray-600">Here's your warehouse overview</Text>
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

        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <Button
              title="New Item"
              onPress={() => { }}
              className="bg-blue-500 px-4 py-2 rounded-md"
            />
            <Button
              title="Scan Barcode"
              onPress={() => { }}
              className="bg-green-500 px-4 py-2 rounded-md"
            />
          </View>
        </View>

        <Link href='/(auth)/login'>
          <Button
            title="login"
            onPress={() => { }}
            className="bg-blue-500 px-4 py-2 rounded-md"
          />
        </Link>
        <TouchableOpacity onPress={handleLogout}>
          <Button
            title="Logout"
            className="bg-red-500 w-full py-3 rounded-md mt-4"
          />
        </TouchableOpacity>





      </Container>
    </ScrollView>
  );
}
