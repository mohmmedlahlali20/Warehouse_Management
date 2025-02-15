import { addProduct } from "../api/products";

global.fetch = jest.fn();

describe("addProduct Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully add a product", async () => {
        const newProduct = { name: "PC 1", price: 150 };
        const mockResponse = { id: "1", ...newProduct };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await addProduct(newProduct);

        expect(result).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.EXPO_PUBLIC_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });
    });

    it("should throw an error when the API request fails", async () => {
        const newProduct = { name: "PC 2", price: 200 };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(addProduct(newProduct)).rejects.toThrow("Failed to add product");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
