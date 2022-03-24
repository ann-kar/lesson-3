import { generateTypes } from "./test-utils/generateTypes";

test.skip("creates exchange rate types", async () => {
  await generateTypes(
    "http://api.nbp.pl/api/exchangerates/rates/a/usd/",
    "ExchangeRates"
  );
});

test.skip("creates github types", async () => {
  await generateTypes("https://api.github.com/users/github", "GithubUser");
});