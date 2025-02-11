

const getAllProduct = async () => {
    try {
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
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


export {
    getAllProduct
}