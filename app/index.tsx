import { Stack, useRouter } from "expo-router"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Container } from "~/components/Container"
import { useAppDispatch } from "~/hooks/useAppDispatch"
import { logoutAction } from "./(redux)/slice/warehousemansSlice"

export default function Home() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    await dispatch(logoutAction())
    router.push("/(auth)/login")
  }

  const warehouseData = [
    { icon: "box", title: "Total Items", value: "1,234" },
    { icon: "truck", title: "Shipments", value: "56" },
    { icon: "alert-circle", title: "Low Stock", value: "23" },
    { icon: "trending-up", title: "Top Selling", value: "78" },
  ]

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          title: "Warehouse Dashboard",
          headerStyle: { backgroundColor: "#3B82F6" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
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


        <View className=" rounded-2xl p-6 mb-8 shadow-md m-5">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between gap-4 ">
            <TouchableOpacity
              onPress={() => router.push("/product/product")}
              className="bg-blue-500 px-6 py-3 rounded-xl flex-row items-center shadow-md"
            >
              <Feather name="list" size={20} color="#fff" className="mr-2" />
              <Text className="text-white font-semibold">List Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/product/product")}
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
  )
}

