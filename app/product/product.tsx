import { View, Text, StatusBar, Image, ActivityIndicator, ScrollView, Pressable, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { deleteProductById, getProducts } from "../(redux)/slice/productsSlice";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Menu, Divider, Provider } from "react-native-paper";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Products } from "~/constant/types";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";


export default function Product() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, products } = useAppSelector((state) => state.Products);
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const handleExportProduct = async (product: Products) => {
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                background: #4F46E5;
                color: white;
                padding: 15px;
                border-radius: 10px 10px 0 0;
              }
              .header h1 {
                margin: 0;
                font-size: 20px;
              }
              .product-image {
                display: block;
                width: 100%;
                max-width: 300px;
                margin: 20px auto;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .info-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              .info-table th, .info-table td {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                text-align: left;
              }
              .info-table th {
                background: #f9f9f9;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Détails du Produit</h1>
              </div>
              <img src="${product.image}" alt="Product Image" class="product-image" />
              <table class="info-table">
                <tr>
                  <th>Nom</th>
                  <td>${product.name}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>${product.type}</td>
                </tr>
                <tr>
                  <th>Prix</th>
                  <td>${product.price} $</td>
                </tr>
                <tr>
                  <th>Solde</th>
                  <td>${product.solde} $</td>
                </tr>
                <tr>
                  <th>ID</th>
                  <td>${product.id}</td>
                </tr>
                <tr>
                  <th>quantity</th>
                  <td>${product?.stocks[0].quantity}</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("PDF généré :", uri);

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Erreur lors de l'exportation du produit :", error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                onPress={() => {  router.push(`/product/productDetails?productId=${product.id}`);}}
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
                    onPress={() => handleExportProduct(product)}
                    leadingIcon={() => <FontAwesome5 name="file-export" size={22} color="black" />}
                  />
                </Menu>

              </Pressable>
            )) 
          ) }
        </ScrollView>

        <View className="container mx-auto px-6 py-6">
          <TouchableOpacity
            onPress={() => {router.push('/product/addProducts');}}
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
