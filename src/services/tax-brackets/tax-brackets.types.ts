export interface TaxBracket {
    min: number;
    max?: number;
    rate: number;
}

export interface TaxBracketResponse {
    tax_brackets: TaxBracket[];
}
