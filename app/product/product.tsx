import { View, Text, StatusBar, Image, ActivityIndicator, ScrollView, Pressable, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { deleteProductById, getProducts } from "../(redux)/slice/productsSlice";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Menu, Divider, Provider } from "react-native-paper";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Products } from "~/constant/types";

export default function Product() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, products } = useAppSelector((state) => state.Products);
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("All");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = async (productId: string) => {
    await dispatch(deleteProductById(productId));
    dispatch(getProducts());
  };

  const toggleMenu = (productId: string) => {
    setVisibleMenu((prev) => (prev === productId ? null : productId));
  };

  const productTypes = ["All", ...new Set(products.map((product) => product.type))];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === "All" || product.type === selectedType)
  );

  return (
    <Provider>
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
          <View>
            <Text className="text-3xl text-blue-500 font-bold text-center m-3">All Products</Text>
            
            <TextInput
              className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4"
              placeholder="Search products"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <ScrollView horizontal className="flex-row mb-4">
              {productTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  className={`px-4 py-2 rounded-lg mr-2 ${selectedType === type ? "bg-blue-500" : "bg-gray-300"}`}
                  onPress={() => setSelectedType(type)}
                >
                  <Text className={`text-white font-semibold`}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#4F46E5" />
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-red-500 text-lg">{error}</Text>
            </View>
          ) : (
            filteredProducts.map((product) => (
              <Pressable
                key={product.id}
                className="bg-white rounded-lg shadow-md mb-4 p-4 flex-row items-center"
                onPress={() => { router.push(`/product/productDetails?productId=${product.id}`); }}
              >
                <Image source={{ uri: product.image }} className="w-20 h-20 rounded-lg mr-4" />
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">{product.name}</Text>
                  <Text className="text-sm text-gray-600 mt-1">{product.type}</Text>
                  <Text className="text-indigo-600 font-bold mt-1">${product.price}</Text>
                </View>
                <Menu
                  visible={visibleMenu === product.id}
                  onDismiss={() => setVisibleMenu(null)}
                  anchor={
                    <TouchableOpacity onPress={() => toggleMenu(product.id)}>
                      <Entypo name="dots-three-vertical" size={24} color="black" />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => handleDeleteProduct(product.id)}
                    title="Remove"
                    leadingIcon={() => <MaterialCommunityIcons name="delete-empty" size={24} color="black" />}
                  />
                  <Divider />
                  <Menu.Item
                    title="Export"
                    leadingIcon={() => <FontAwesome5 name="file-export" size={22} color="black" />}
                  />
                </Menu>
              </Pressable>
            ))
          )}
        </ScrollView>

        <View className="container mx-auto px-6 py-6">
          <TouchableOpacity
            onPress={() => { router.push('/product/addProducts'); }}
            className="bg-red-500 px-6 py-3 rounded-xl flex-row items-center justify-center"
          >
            <Feather name="plus" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-white font-semibold"> Add new Products</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
}
