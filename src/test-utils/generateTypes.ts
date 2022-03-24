import {
    InputData,
    jsonInputForTargetLanguage,
    quicktype,
  } from "quicktype-core";
  import fs from "fs";

  export const generateTypes = async (url: string, name: string) => {
    const response = await fetch(url);
    const jsonString = await response.text();
    const jsonInput = jsonInputForTargetLanguage("typescript");
    await jsonInput.addSource({ name, samples: [jsonString] });
    const inputData = new InputData();
    inputData.addInput(jsonInput);
    const serializedRenderResult = await quicktype({
      inputData: inputData,
      lang: "typescript",
      rendererOptions: { "just-types": "true" },
    });
    fs.writeFile( // całe to można by opatulić w Promise, który resolve'ował by się wewnątrz callbacku, albo załatwić to za pomocą await fn.promises
                  // byłoby to na miejscu, ponieważ pisanie plików jest asynchroniczne (nie chcemy blokować apki)
      `${__dirname}/../types/${name}.ts`,
      serializedRenderResult.lines.join("\n"),
      () => {} // ...o tutaj, wewnątrz klamerek
    );
  };