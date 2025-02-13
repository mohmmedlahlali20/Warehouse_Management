import { Products, Stocks } from "~/constant/types";


const getAllProduct = async () => {

    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return await res.json();

};



const getProductsById = async (productId: string) => {

    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`)

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return await res.json()
}

const checkIfProductsExistByBarcode = async (barcode: number) => {

    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${barcode}`);

    if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const product = await res.json();

    return product ? true : false;

};


export const addProduct = async (newProduct: Products) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/products`, {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

export const updateProductStock = async (updatedStock: Stocks) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/stocks/${updatedStock.id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedStock),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};



export {
    getAllProduct,
    getProductsById,
    checkIfProductsExistByBarcode
}