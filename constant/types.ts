export interface Stocks {
    id: string;
    name: string;
    quantity: string;
    localisation: Localisation

}


export interface Localisation{
    city: string;
    latitude: number;
    longitude: number;
}




export interface Products {
    id: string;
    name: string;
    type: string;
    barcode: string;
    price: number;
    solde: number;
    supplier: string;
    image: string;
    stocks: Stocks

}



export interface Warehouseman {
    id: number;
    name: string;
    dob: string;
    city: string;
    secretKey: string;
    warehouseId: string;
}
