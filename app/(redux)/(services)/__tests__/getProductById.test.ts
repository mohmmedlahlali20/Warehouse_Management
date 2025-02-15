import { getProductsById } from "../api/products";

global.fetch = jest.fn();

describe("getProductsById Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a product when fetch is successful", async () => {
        const productId = "1"; 
        const mockProduct = { id: productId, name: "Product A", price: 100 };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockProduct),
        });

        const product = await getProductsById(productId);

        expect(product).toEqual(mockProduct);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.EXPO_PUBLIC_URL}/products/${productId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    });

    it("should throw an error when fetch fails", async () => {
        const productId = "99"; 

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(getProductsById(productId)).rejects.toThrow("Failed to fetch product");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
