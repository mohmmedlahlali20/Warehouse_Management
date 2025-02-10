import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { checkUserIfExist, register } from "../(redux)/slice/warehousemansSlice";
import { useAppDispatch } from "~/hooks/useAppDispatch";

export default function Register() {
  const [secretKey, setSecretKey] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    try {
      const result = await dispatch(checkUserIfExist(secretKey));
      const userExists = result.payload as { exists: boolean };
  
      if (userExists.exists) {
        alert("Ce code secret est déjà utilisé !");
        return;
      }
  
      if (!name || !secretKey || !birthday || !city) {
        alert("Veuillez remplir tous les champs");
        return;
      }
  
      dispatch(register({ name, secretKey, birthday, city }));
      alert("registration successful");

    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Register", headerShown: false }} />

      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome!</Text>
        <Text className="text-lg text-gray-600 mb-8 text-center">Please register to continue.</Text>

        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">Secret Code</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" className="mr-2" />
            <TextInput
              className="flex-1 text-base text-gray-700"
              placeholder="Enter your Secret Code"
              placeholderTextColor="#9CA3AF"
              value={secretKey}
              onChangeText={setSecretKey}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">Name</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <SimpleLineIcons name="user" size={20} color="#6B7280" className="mr-2" />
            <TextInput
              className="flex-1 text-base text-gray-700"
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">City</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <SimpleLineIcons name="home" size={20} color="#6B7280" className="mr-2" />
            <TextInput
              className="flex-1 text-base text-gray-700"
              placeholder="Enter your City"
              placeholderTextColor="#9CA3AF"
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">Birthday</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <Ionicons name="calendar-outline" size={20} color="#6B7280" className="mr-2" />
            <TextInput
              className="flex-1 text-base text-gray-700"
              placeholder="Enter your birthday (DD/MM/YYYY)"
              placeholderTextColor="#9CA3AF"
              value={birthday}
              onChangeText={setBirthday}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleRegister} className="bg-blue-500 rounded-md py-3 items-center shadow-md">
          <Text className="text-white font-semibold text-lg">Register</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity>
            <Link href="/(auth)/login">
              <Text className="text-blue-500 font-semibold">Login</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
