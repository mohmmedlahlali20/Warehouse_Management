export interface Stocks {
    id: string;
    name: string;
    quantity: number;    
    localisation: Localisation;
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
    stocks: Stocks[];

}

export interface Localisation {
    city: string;
    latitude: number;
    longitude: number;
}


export interface Warehouseman {
    id: number;
    name: string;
    dob: string;
    city: string;
    secretKey: string;
    warehouseId: string;
}



export interface Statistics {
    totalProducts: number;
    outOfStock: number;
    totalStockValue: number;
    mostAddedProducts: string[];
    mostRemovedProducts: string[]
}
