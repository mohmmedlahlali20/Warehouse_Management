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

 const addProduct = async (newProduct: Products) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/products`, {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const UpdateQuantity = async (
    type: string,
    productId: string | undefined,
    stokId: number | string,
    warehousemanId: number
  ) => {
    if (!productId) {
      throw new Error("Product ID is required");
    }
  
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`);
    const product = await response.json();
  
    if (!product || !product.stocks) {
      throw new Error("Product or stocks not found");
    }
  
    const updatedStocks = product.stocks.map((stock: any) => {
      if (stock.id === stokId) {
        const newQuantity = type === 'add' ? stock.quantity + 1 : stock.quantity - 1;
        return { ...stock, quantity: newQuantity };
      }
      return stock;
    });
  
    const updatedProduct = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stocks: updatedStocks,
        editedBy: [
          ...product.editedBy,
          { warehousemanId, at: new Date().toISOString().split("T")[0] }
        ],
      }),
    });
  
    return updatedProduct.json();
  };
  



export {
    getAllProduct,
    getProductsById,
    checkIfProductsExistByBarcode,
    UpdateQuantity
}