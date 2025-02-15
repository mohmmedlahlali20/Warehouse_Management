import { login } from "../api/warehouseman";

global.fetch = jest.fn();

describe("login Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a warehouseman when a valid secretKey is provided", async () => {
        const secretKey = "valid-secret";
        const mockWarehouseman = { id: "1", name: "John Doe", secretKey };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce([mockWarehouseman]), 
        });

        const user = await login(secretKey);

        expect(user).toEqual(mockWarehouseman);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.EXPO_PUBLIC_URL}/warehousemans?secretKey=${secretKey}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    });

    it("should return undefined when no warehouseman matches the secretKey", async () => {
        const secretKey = "invalid-secret";

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce([]), 
        });

        const user = await login(secretKey);

        expect(user).toBeUndefined();
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when fetch fails", async () => {
        const secretKey = "error-secret";

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        await expect(login(secretKey)).rejects.toThrow("HTTP error! Status: 500");
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when the response status is 404 (not found)", async () => {
        const secretKey = "unknown-secret";

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await expect(login(secretKey)).rejects.toThrow("HTTP error! Status: 404");
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when response.json() fails", async () => {
        const secretKey = "valid-secret";

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")), 
        });

        await expect(login(secretKey)).rejects.toThrow("Invalid JSON");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
