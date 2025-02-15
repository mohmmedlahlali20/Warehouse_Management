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
    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return await res.json();
};


const addProduct = async (product: { name: string; price: number }) => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        throw new Error("Failed to add product");
    }

    return await res.json();
};
;

const UpdateQuantity = async (
    type: string,
    productId: string | undefined,
    stockId: string,
    warehousemanId: number
) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`);
    const product = await response.json();
    let updatedStocks = [];

    if (product) {
        switch (type) {
            case 'add':
                updatedStocks = product.stocks.map((stock: Stocks) =>
                    stock.id === stockId ? { ...stock, quantity: stock.quantity + 1 } : stock
                );
                break;
            case 'remove':
                updatedStocks = product.stocks.map((stock: Stocks) =>
                    stock.id === stockId ? { ...stock, quantity: stock.quantity - 1 } : stock
                );
                break;
            default:
                break;
        }
    }
       

    const updateResponse = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stocks: updatedStocks,
          editedBy: {
            warehousemanId: warehousemanId,
            at: new Date().toISOString().split("T")[0],
          },
        }),
      });
    
      
      if (!updateResponse.ok) {
        console.error('Failed to update product, status code:', updateResponse.status);
        const errorText = await updateResponse.text();
        console.error("Error details:", errorText);
        throw new Error("Failed to update product");
      }
      

    return updateResponse.json();
};




const removeProductById = async (productId: string) => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await res.json();
}

const checkIfProductsExistByBarcode = async (barcode: string) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/products?barcode=${barcode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
  
      const products = await res.json();
      
      return products[0];
    } catch (error) {
        
      return null;
    }
  };
  


export {
    getAllProduct,
    getProductsById,
    checkIfProductsExistByBarcode,
    UpdateQuantity,
    addProduct,
    removeProductById,
}