import { getTaxBrackets } from "./tax-brackets";

describe("getTaxBrackets", () => {
    const dispatch = jest.fn();

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

        await getTaxBrackets(dispatch, 2022);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:5001/tax-calculator/tax-year/2022",
            expect.any(Object),
        );

        expect(dispatch).toHaveBeenCalledWith({
            type: "SET_TAX_BRACKETS",
            payload: [{ min: 0, max: 10000, rate: 0.1 }],
        });
    });

    it("dispatches SET_ERROR on HTTP error", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
        } as Response);

        await getTaxBrackets(dispatch, 2022);

        expect(dispatch).toHaveBeenCalledWith({
            type: "SET_ERROR",
            payload: "HTTP error 500: Internal Server Error",
        });
    });

    it("dispatches SET_ERROR on JSON error", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => {
                throw new Error("Invalid JSON");
            },
        } as Partial<Response>);

        await getTaxBrackets(dispatch, 2022);

        expect(dispatch).toHaveBeenCalledWith({
            type: "SET_ERROR",
            payload: "Invalid JSON",
        });
    });
});
