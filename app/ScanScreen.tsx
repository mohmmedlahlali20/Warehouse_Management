import { View, Text, Button, StyleSheet } from "react-native";
import { CameraView } from "expo-camera";
import useScanner from "~/hooks/useScanner";

export default function ScanScreen() {
    const { 
        facing, 
        permission, 
        scanned, 
        requestPermission, 
        handleBarCodeScanned, 
        toggleCameraFacing 
    } = useScanner();

    if (!permission) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Camera access is needed to scan barcodes</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    camera: { flex: 1, width: "100%" },
});
