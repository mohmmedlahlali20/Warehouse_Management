import { getAllProduct } from "../api/products";

global.fetch = jest.fn();

describe("getAllProduct Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return products when fetch is successful", async () => {
        const mockProducts = [
            { id: 1, name: "PC 1", price: 100 },
            { id: 2, name: "PC 2", price: 200 },
        ];

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockProducts),
        });

        const products = await getAllProduct();
        expect(products).toEqual(mockProducts);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.EXPO_PUBLIC_URL}/products`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    });

    it("should throw an error when fetch fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(getAllProduct()).rejects.toThrow("Failed to fetch products");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
