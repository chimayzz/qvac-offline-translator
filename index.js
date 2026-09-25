import {
  loadModel,
  translate,
  unloadModel,
  BERGAMOT_EN_FR
} from "@qvac/sdk";

async function runTranslator() {
  console.log("=== QVAC Offline Translator ===");

  const sourceText =
    "Hello! Running artificial intelligence locally on your device protects your privacy.";

  console.log(`Original Text (EN): "${sourceText}"\n`);

  console.log("Loading translation model on-device...");

  const modelId = await loadModel({
    modelSrc: BERGAMOT_EN_FR,
    modelConfig: {
      engine: "Bergamot",
      from: "en",
      to: "fr"
    }
  });

  console.log("Translation model loaded successfully.");

  console.log("\nTranslating text offline...");

  const result = translate({
  modelId,
  text: sourceText,
  from: "en",
  to: "fr",
  modelType: "nmtcpp-translation",
  stream: false
});

const translatedText = await result.text;

console.log("\n================ RESULT ================");
console.log(`Translated Text (FR): ${translatedText}`);
console.log("========================================");

  await unloadModel({
    modelId
  });

  console.log("\nModel unloaded successfully.");
}

runTranslator().catch((error) => {
  console.error("\nTranslation failed:");
  console.error(error);
});