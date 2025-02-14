import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface StockCounterProps {
  totalStock: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function StockCounter({ totalStock, onIncrement, onDecrement }: StockCounterProps) {
  const stockTextColor = totalStock > 10 ? "#16A34A" : totalStock > 5 ? "#EAB308" : "#DC2626";

  return (
    <View className="bg-gray-300 flex-1 justify-center p-4 m-3 rounded-lg shadow-md">
      <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
        Quantity in stock
      </Text>


      <View className="flex-row justify-between gap-4">
        <TouchableOpacity
          onPress={onIncrement}
          className="bg-blue-500 px-6 py-3 rounded-xl flex-row items-center justify-center shadow-md flex-1"
        >
          <Feather name="plus" size={20} color="#fff" />
          <Text className="text-white font-semibold ml-2">Increment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDecrement}
          className="bg-red-500 px-6 py-3 rounded-xl flex-row items-center justify-center shadow-md flex-1"
        >
          <Feather name="minus" size={20} color="#fff" />
          <Text className="text-white font-semibold ml-2">Decrement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
