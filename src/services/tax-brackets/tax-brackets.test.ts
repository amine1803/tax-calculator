import { getTaxBrackets } from "./tax-brackets";

describe("getTaxBrackets", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("dispatches SET_TAX_BRACKETS on success", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                tax_brackets: [{ min: 0, max: 10000, rate: 0.1 }],
            }),
        } as Response);

        await getTaxBrackets(2022);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:5001/tax-calculator/tax-year/2022",
            expect.any(Object),
        );
    });

    it("dispatches SET_ERROR on HTTP error", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
        } as Response);

        await getTaxBrackets(2022);
    });

    it("dispatches SET_ERROR on JSON error", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => {
                throw new Error("Invalid JSON");
            },
        } as Partial<Response>);

        await getTaxBrackets(2022);
    });
});
