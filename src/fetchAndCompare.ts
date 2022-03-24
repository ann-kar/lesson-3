import fetch from "node-fetch";
import { ExchangeRates } from "./types/ExchangeRates";

export const fetchCurrencyData = async (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const response = await fetch(
    `http://api.nbp.pl/api/exchangerates/rates/a/usd/${year}-${month}-${day}/?format=json`
  );
  return await response.json() as ExchangeRates;
};

export const calculateDifferenceBetweenRates = async (date1: Date, date2: Date) => {
    const res1 = await fetchCurrencyData(date1);
    const res2 = await fetchCurrencyData(date2);
    const left = res1.rates[0]["mid"] * 1000;
    const right = res2.rates[0]["mid"] * 1000;
    return Number(((left - right) / 1000).toFixed(2));
  };
