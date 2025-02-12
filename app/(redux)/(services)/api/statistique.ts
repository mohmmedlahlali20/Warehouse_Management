



const getStatistique = async () => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/statistics`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch statistique");
    }
    return await res.json();
}


export {
    getStatistique
}