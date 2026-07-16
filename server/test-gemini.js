import ai from "./config/gemini.js";

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: "Say hello to PlacementPilot AI in one sentence.",
    });

    console.log(response.text);
  } catch (error) {
    console.error(error);
  }
}

testGemini();