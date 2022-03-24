import fetch from "node-fetch";
import { ExchangeRates } from "./types/ExchangeRates";

interface IRate {
  no: string;
  effectiveDate: string;
  mid: number;
}

interface ICurrentRateSingleCurrency {
  table: "A" | "B" | "C";
  currency: string;
  code: string;
  rates: Array<IRate>;
}

describe.skip("actual, not mocked fetching requests", () => {
  it("fetches current USD : PLN exchange rate", async () => {
    const response = await fetch(
      "http://api.nbp.pl/api/exchangerates/rates/a/usd/"
    );
    const data = (await response.json()) as ICurrentRateSingleCurrency;
  });

  it("fetches current EUR : PLN exchange rate", async () => {
    const response = await fetch(
      "http://api.nbp.pl/api/exchangerates/rates/a/eur/"
    );
    const data = (await response.json()) as ICurrentRateSingleCurrency;
  });

  it("fetches USD rate from a week ago", async () => {
    const response = await fetch(
      "http://api.nbp.pl/api/exchangerates/rates/a/usd/2016-03-17/?format=json"
    );
    const data = (await response.json()) as ICurrentRateSingleCurrency;
  });

  it("fetches USD rate from a month ago", async () => {
    const response = await fetch(
      "http://api.nbp.pl/api/exchangerates/rates/a/usd/2016-02-24/?format=json"
    );
    const data = (await response.json()) as ICurrentRateSingleCurrency;
  });
});

describe.skip("difference calculation based on mock data", () => {
  const calculateDifferenceForMockedValues = (a: ExchangeRates, b: ExchangeRates) => {
    const left = a.rates[0]["mid"] * 1000;
    const right = b.rates[0]["mid"] * 1000;
    return Number(((left - right) / 1000).toFixed(2));
  };

  const a: ExchangeRates = {
    table: "A",
    currency: "dolar amerykański",
    code: "USD",
    rates: [{ no: "058/A/NBP/2022", effectiveDate: "2022-03-24", mid: 5.1 }],
  };

  const b: ExchangeRates = {
    table: "A",
    currency: "dolar amerykański",
    code: "USD",
    rates: [{ no: "058/A/NBP/2022", effectiveDate: "2022-03-17", mid: 5.03 }],
  };

  it("calculates rates from different dates as required", () => {
    expect(calculateDifferenceForMockedValues(a, b)).toBe(0.07);
  });
});

