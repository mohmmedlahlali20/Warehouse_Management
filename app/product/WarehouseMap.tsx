import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "~/hooks/useAppDispatch";

export default function WarehouseMap() {
  const { selectedProduct } = useAppSelector((state) => state.Products);

  if (!selectedProduct || selectedProduct.stocks.length === 0) {
    return <Text className="text-center text-red-500">No warehouse locations available</Text>;
  }

  return (
    <View className="flex-1 justify-center px-6 py-8 bg-white m-3 rounded-lg shadow-md">
      <Text className="text-2xl text-center mb-4 font-semibold">Localisation of Warehouses</Text>
      <MapView
        style={{ width: "100%", height: 300 }}
        initialRegion={{
          latitude: selectedProduct.stocks[0].localisation.latitude,
          longitude: selectedProduct.stocks[0].localisation.longitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {selectedProduct.stocks.map((stock) => (
          <Marker
            key={stock.id}
            coordinate={{
              latitude: stock.localisation.latitude,
              longitude: stock.localisation.longitude,
            }}
            title={stock.name}
            description={`Stock: ${stock.quantity}`}
          />
        ))}
      </MapView>
    </View>
  );
}
