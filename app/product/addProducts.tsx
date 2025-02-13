import { CameraView } from "expo-camera";
import { useState, useEffect, useMemo } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import useScanner from "~/hooks/useScanner";
import { checkIfProductsExist, getProducts } from "../(redux)/slice/productsSlice";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { Feather } from "@expo/vector-icons";

export default function ProductScanner() {
  const {
    facing,
    permission,
    scanned,
    handleBarCodeScanned,
    toggleCameraFacing,
    scannedData,
    requestPermission,
  } = useScanner();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const productExists = useAppSelector((state) => state.Products.productExists);
  const { products } = useAppSelector((state) => state.Products);

  const [isCameraVisible, setCameraVisible] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  

  const uniqueStocks = useMemo(() => {
    const stocksMap = new Map();

    products.forEach((product) => {
      product.stocks.forEach((stock) => {
        if (!stocksMap.has(stock.id)) {
          stocksMap.set(stock.id, stock);
        }
      });
    });

    return Array.from(stocksMap.values());
  }, [products]);

  useEffect(() => {
    if (scannedData) {
      setManualBarcode(scannedData);
      dispatch(checkIfProductsExist(Number(scannedData)));
    }
  }, [scannedData]);

  useEffect(() => {
    if (manualBarcode.trim().length > 0) {
      dispatch(checkIfProductsExist(Number(manualBarcode)));
    } else {
      setErrorMessage("");
    }
  }, [manualBarcode]);

  useEffect(() => {
    if (productExists && scannedData) {
      router.push(`/product/productDetails`);
    } else if (productExists && manualBarcode.trim().length > 0) {
      setErrorMessage("Ce code-barres existe déjà !");
    } else {
      setErrorMessage("");
    }
  }, [productExists]);

  const addProducts = () => {
    console.log("Adding new product...");
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-center mb-4">Nous avons besoin de votre permission pour activer la caméra</Text>
        <Button onPress={requestPermission} title="Autoriser la caméra" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Add New Product",
          headerStyle: { backgroundColor: "#4F46E5" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      {isCameraVisible && (
        <CameraView className="flex-1" facing={facing} onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}>
          <View className="flex-1 flex-row bg-transparent m-16">
            <TouchableOpacity className="flex-1 self-end items-center" onPress={toggleCameraFacing}>
              <Text className="text-2xl font-bold text-white">Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      <View className="p-4">
        <Text className="text-3xl text-center text-red-500 m-5">Add New Product</Text>

        <View className="relative">
          <TextInput
            className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4"
            value={manualBarcode}
            onChangeText={setManualBarcode}
            keyboardType="numeric"
            placeholder="Entrez un code-barres"
          />
          <TouchableOpacity className="absolute right-3 top-3" onPress={() => setCameraVisible(!isCameraVisible)}>
            <Feather name="camera" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text className="text-red-500 text-sm mb-4">{errorMessage}</Text> : null}

        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Nom" />
        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Prix" />
        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Solde" />
        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Fournisseur" />
        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Image" />

        <View className="h-12 border border-gray-300 rounded-md px-3 text-base mb-4">
          <Picker selectedValue={selectedStock} onValueChange={(itemValue) => setSelectedStock(itemValue)}>
            <Picker.Item label="Sélectionnez un stock" value="" />
            {uniqueStocks.map((stock) => (
              <Picker.Item key={stock.id} label={`${stock.name} (${stock.quantity})`} value={stock.id} />
            ))}
          </Picker>
        </View>

        <View className="container mx-auto px-6 py-6">
          <TouchableOpacity onPress={addProducts} className="bg-red-500 px-6 py-3 rounded-xl flex-row items-center justify-center">
            <Text className="text-white font-semibold">Add New Product</Text>
            <Feather name="plus" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
