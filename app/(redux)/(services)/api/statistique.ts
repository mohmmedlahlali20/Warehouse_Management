

 const getStatistics = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/statistics`,
        {method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    }
    );
    const data = await response.json();
    return data;
}
export {
    getStatistics
}