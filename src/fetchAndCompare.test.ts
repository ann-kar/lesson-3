const nock = require("nock");
import fs = require("fs");
import { resolve } from "path";

import { saveRecordings } from "./test-utils/saveRecordings";
import {fetchCurrencyData, calculateDifferenceBetweenRates} from "./fetchAndCompare";

describe("correctly handles fetched data", () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });
  afterEach(() => {
    nock.enableNetConnect();
  });
  it("fetches USD exchange rate", async () => {
    /*
    nock.recorder.rec({                                       // *** Recording phase ***
       output_objects: true,
    });
    */
    nock.load(resolve(__dirname, "__tapes__", "USD-2022-03-24.json"));
    const data = await fetchCurrencyData(new Date(2022, 2, 24));
    /*
    saveRecordings(`${__dirname}`, "USD-2022-03-24");         // *** Recording phase ***
     */
    expect(data.rates[0]["mid"]).toBe(4.331);
  });

  it("fetches USD exchange rate when passed a different date", async () => {
    nock.load(resolve(__dirname, "__tapes__", "USD-2022-03-17.json"));
    const data = await fetchCurrencyData(new Date(2022, 2, 17));
    expect(data.rates[0]["mid"]).toBe(4.2403);
  });

  it("calculates the difference between the fetched exchange rates", async () => {
    nock.load(resolve(__dirname, "__tapes__", "USD-2022-03-24.json"));
    nock.load(resolve(__dirname, "__tapes__", "USD-2022-03-17.json"));

    expect(
      await calculateDifferenceBetweenRates(new Date(2022, 2, 24), new Date(2022, 2, 17))
    ).toBe(0.09);
  });
});
