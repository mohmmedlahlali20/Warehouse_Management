import { CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "./useAppDispatch";
import { checkIfProductsExist } from "~/app/(redux)/slice/productsSlice";
import { useRouter } from "expo-router";

export default function useScanner() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null); 
    const dispatch = useAppDispatch();
    const router = useRouter();
    const productExists = useAppSelector((state) => state.Products.productExists);
    const { selectedProduct } = useAppSelector((state) => state.Products);
    const [manualBarcode, setManualBarcode] = useState<string>("");

    useEffect(() => {
        if (productExists) {
            router.push(`/product/productDetails?products=${selectedProduct?.id}`);
        } else if (scannedData) {
            setManualBarcode(scannedData);
        }
    }, [productExists, selectedProduct, scannedData, router]);

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        setScannedData(data);
    
        const result = await dispatch(checkIfProductsExist(data));
    
        if (result.meta.requestStatus === "fulfilled" && result.payload) {
            router.push(`/product/productDetails?productId=${result.payload.id}`);
        } else {
            alert("Product not found!");
            setTimeout(() => setScanned(false), 2000);
        }
    };

    return {
        facing,
        permission,
        scanned,
        scannedData, 
        requestPermission,
        handleBarCodeScanned,
        toggleCameraFacing,
    };
}
