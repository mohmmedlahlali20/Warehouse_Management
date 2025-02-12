"use client"

import { CameraView } from "expo-camera"
import { useState } from "react"
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import useScanner from "~/hooks/useScanner"

export default function ProductScanner() {
  const { facing, permission, scanned, requestPermission, handleBarCodeScanned, toggleCameraFacing, scannedData } =
    useScanner()

  const [isCameraVisible, setCameraVisible] = useState(false)
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""])

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-center mb-4">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    )
  }

  const handleInputChange = (text: string, index: number) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = text
    setInputValues(newInputValues)
  }

  return (
    <View className="flex-1 bg-white">
      <TouchableOpacity
        className="self-center mb-4 p-3 bg-blue-500 rounded-md"
        onPress={() => setCameraVisible(!isCameraVisible)}
      >
        <Text className="text-white font-bold text-lg">{isCameraVisible ? "Hide Camera" : "Show Camera"}</Text>
      </TouchableOpacity>

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
        <TextInput
          className="h-12 border border-gray-300 rounded-md px-3 text-base mb-4"
          value={scannedData || ""}
          editable={true}
          placeholder="Scanned Barcode"
        />
        {inputValues.map((value, index) => (
          <TextInput
            key={index}
            className="h-12 border border-gray-300 rounded-md px-3 text-base mb-4"
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            placeholder={`Input ${index + 1}`}
          />
        ))}
      </View>
    </View>
  )
}

