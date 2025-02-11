


const getAllProduct = async () => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export {
    getAllProduct
}