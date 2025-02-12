import { CameraView } from "expo-camera"
import { useState, useEffect } from "react"
import { Button, GestureResponderEvent, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useRouter } from "expo-router"

import useScanner from "~/hooks/useScanner"
import { checkIfProductsExist } from "../(redux)/slice/productsSlice"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { Feather } from "@expo/vector-icons"

export default function ProductScanner() {
  const {
    facing,
    permission,
    scanned,
    handleBarCodeScanned,
    toggleCameraFacing,
    scannedData
  } = useScanner()

  const dispatch = useAppDispatch()
  const router = useRouter()
  const productExists = useAppSelector((state) => state.Products.productExists)

  const [isCameraVisible, setCameraVisible] = useState(false)
  const [manualBarcode, setManualBarcode] = useState("")
  const [errorMessage, setErrorMessage] = useState("") 

  useEffect(() => {
    if (scannedData) {
      setManualBarcode(scannedData)
      dispatch(checkIfProductsExist(Number(scannedData)))
    }
  }, [scannedData])

  useEffect(() => {
    if (manualBarcode.trim().length > 0) {
      dispatch(checkIfProductsExist(Number(manualBarcode)))
    } else {
      setErrorMessage("") 
    }
  }, [manualBarcode])

  useEffect(() => {
    if (productExists && scannedData) {
      router.push(`/product/productDetails?productId=${scannedData}`)
    } else if (productExists && manualBarcode.trim().length > 0) {
      setErrorMessage("Ce code-barres existe déjà !")
    } else {
      setErrorMessage("")
    }
  }, [productExists])

  if (!permission) return <View />

  if (!permission.granted) {
    function requestPermission(event: GestureResponderEvent): void {
      throw new Error("Function not implemented.")
    }

    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-center mb-4">Nous avons besoin de votre permission pour activer la caméra</Text>
        <Button onPress={requestPermission} title="Autoriser la caméra" />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white">
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

        {errorMessage ? (
          <Text className="text-red-500 text-sm mb-4">{errorMessage}</Text>
        ) : null}

        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Nom" />
        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Prix" />
        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Solde" />
        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Fournisseur" />
        <TextInput className="h-12 border border-gray-300 rounded-md px-10 text-base mb-4" placeholder="Image" />
      </View>
    </View>
  )
}
