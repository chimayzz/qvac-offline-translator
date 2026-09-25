import {
  loadModel,
  translate,
  unloadModel,
  BERGAMOT_EN_FR
} from "@qvac/sdk";

async function runTranslator() {
  console.log("");
  console.log("╔════════════════════════════════════════════╗");
  console.log("║          QVAC OFFLINE TRANSLATOR           ║");
  console.log("║            English → French                ║");
  console.log("╚════════════════════════════════════════════╝");
  console.log("");

  const sourceText =
    "Hello! Running artificial intelligence locally on your device protects your privacy.";

  console.log("Original Text (EN):");
  console.log(`"${sourceText}"`);
  console.log("");

  console.log("Loading QVAC translation model on-device...");

  const modelId = await loadModel({
    modelSrc: BERGAMOT_EN_FR,
    modelConfig: {
      engine: "Bergamot",
      from: "en",
      to: "fr"
    }
  });

  console.log("✓ Translation model loaded successfully.");
  console.log("");

  console.log("Translating with QVAC on-device...");
  console.log("");

  const result = translate({
    modelId,
    text: sourceText,
    from: "en",
    to: "fr",
    modelType: "nmtcpp-translation",
    stream: false
  });

  const translatedText = await result.text;

  console.log("════════════════════ RESULT ════════════════════");
  console.log("Translated Text (FR):");
  console.log(`"${translatedText}"`);
  console.log("════════════════════════════════════════════════");
  console.log("");

  await unloadModel({
    modelId
  });

  console.log("✓ Model unloaded successfully.");
  console.log("");
  console.log("QVAC offline translation completed.");
}

runTranslator().catch((error) => {
  console.error("");
  console.error("✗ Translation failed:");
  console.error(error);
});