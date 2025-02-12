

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
   
    const res  = await fetch(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`)

    if(!res.ok){
        throw new Error("Failed to fetch products");   
    }
    return await res.json()
}


export {
    getAllProduct,
    getProductsById
}