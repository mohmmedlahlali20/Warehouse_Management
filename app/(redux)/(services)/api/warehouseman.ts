


const login = async ( secretKey: string ) => {
    const response = await fetch(
                `${process.env.EXPO_PUBLIC_URL}/warehousemans?secretKey=${secretKey}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
          
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.json();
             return data[0];
    
    };
    
    export { login };