import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Define the structure of the "seo_metadata" part of the response
interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
}

// Define the structure of the "schema_markup" part of the response
interface SchemaMarkup {
  '@context'?: string;
  '@type'?: string;
  headline?: string;
  description?: string;
  author?: { '@type'?: string; name?: string };
  publisher?: { '@type'?: string; name?: string; logo?: { '@type'?: string; url?: string } };
  datePublished?: string;
  mainEntityOfPage?: { '@type'?: string; '@id'?: string };
  articleBody?: string;
}

// Define the overall expected structure from Gemini
interface GeminiFullResponse {
  seo_metadata?: SeoMetadata;
  schema_markup?: SchemaMarkup;
}

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('GEMINI_API_KEY is not set. SEO generation will use mock data.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' }) : null; 

const generationConfig = {
  temperature: 0.7,
  topK: 0,
  topP: 0.95,
  maxOutputTokens: 800, 
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export async function generateSeoDataWithGemini(
  textBlocks: string,
  simplifiedPageTitle?: string, // This will now be the pre-simplified title
  existingDescription?: string,
  docSlug?: string, 
): Promise<GeminiFullResponse> {
  const SITE_NAME = process.env.SITE_NAME || 'Site'
  const SITE_URL = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  if (!model || !API_KEY) {
    console.log('Using mock SEO data due to missing API key or model initialization failure.');
    return {
      seo_metadata: {
  title: `Mock: ${simplifiedPageTitle || textBlocks.substring(0, 30)} | ${SITE_NAME}`,
        description: `Mock description: ${textBlocks.substring(0, 120)}...`,
        keywords: ['mock', 'seo', 'data'],
      },
      schema_markup: {
        '@type': 'Article',
        headline: `Mock Headline: ${simplifiedPageTitle || textBlocks.substring(0, 30)}...`,
        articleBody: `Mock article body: ${textBlocks.substring(0, 150)}...`,
      },
    };
  }

  const prompt = `
CRITICAL RULE: Your entire response MUST be a single, raw JSON object. Do not include any other text or explanations. Your response must start with { and end with }.

You are an SEO expert for ${SITE_NAME}. Your task is to generate a JSON object based on the provided inputs and the strict rules below, which are derived directly from the ${SITE_URL} website.

GUARDRAIL: ${SITE_NAME} is ALWAYS a B2B travel technology infrastructure company that connects venues (like hotels) to AI agents. It is NEVER a chatbot company or a generic AI service. All generated content must reflect this core identity.

--- Input ---

pageTitle: "${simplifiedPageTitle || 'not set'}" 
Webpage Content:
---
${textBlocks.substring(0, 4000)}
---
--- GENERATION PROCESS & RULES ---

1. Generate seo_metadata.title (Mandatory Formula):
You MUST generate the seo_metadata.title by following this exact formula: [Simplified Page Title] | ${SITE_NAME}

* The [Simplified Page Title] part of the formula is the exact string provided in the "pageTitle" input field above. Use it verbatim.
* Identify the main benefit or core theme in the Webpage Content relevant to a venue owner and create a short [Benefit Phrase] (e.g., "AI Direct Bookings", "Data-Driven Revenue", "Fixing Travel Infrastructure"). This phrase must be unique to the Webpage Content.
* Construct the final seo_metadata.title string by LITERALLY concatenating: the "pageTitle" input + " | ${SITE_NAME}".
* The result MUST be between 50-70 characters. You might need to adjust the "pageTitle" input slightly if it's exceptionally long to meet this. The fixed suffix " | ${SITE_NAME}" is recommended.

2. Generate All Other Content

description & headline: These must be creative but accurate summaries of the specific Webpage Content. They must be unique for each page.
articleBody: This must be a faithful summary of the provided Webpage Content. Do not add information not present in the text.
No Colons: The schema_markup.headline must not contain any colons (':').
Tone: The voice must be expert, B2B, and in British English.
Key Vocabulary to Use: Super-Agent, Agent-Ready, orchestrated trips, match on fit, coordinated booking, AI Profile, Character settings, Social Matching Engine, Context-Aware Discovery. Infuse summaries with these where relevant.

3. Final Output

Combine all generated fields into the JSON structure below.

--- JSON STRUCTURE ---
{
  "seo_metadata": {
    "title": "Value generated from the Mandatory Formula",
    "description": "Unique description of the article's specific content, using brand vocabulary.",
    "keywords": ["Array", "of", "3-5", "unique", "keywords", "from brand vocabulary"]
  },
  "schema_markup": {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Unique Headline Without Colons Reflecting Page Content",
    "description": "A unique schema description summarising the specific article.",
  "author": { "@type": "Organization", "name": "${SITE_NAME}" },
  "publisher": { "@type": "Organization", "name": "${SITE_NAME}", "logo": { "@type": "ImageObject", "url": "${SITE_URL}/logo.svg" } },
    "datePublished": "${new Date().toISOString().split('T')[0]}",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "${SITE_URL}/${docSlug || 'your-unique-page-url'}" },
    "articleBody": "A detailed and faithful summary of the Webpage Content provided, using brand vocabulary."
  }
}
  `;
  // Note: existingDescription is not directly used in this prompt version.

  try {
    console.log('Calling Gemini API to generate SEO data...');
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });
    
    const responseText = result.response.text();
    console.log('Gemini API Raw Response:', responseText);

    let jsonString = responseText.trim();
    const firstBrace = jsonString.indexOf('{');
    const lastBrace = jsonString.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonString = jsonString.substring(firstBrace, lastBrace + 1);
    } else {
      console.error("Could not extract a valid JSON object from Gemini's response:", responseText);
      throw new Error("Received non-JSON or malformed response from Gemini.");
    }
    
    if (!jsonString.startsWith("{") || !jsonString.endsWith("}")) {
      console.error("Extracted string is not a valid JSON object:", jsonString);
      throw new Error("Extracted string is not a valid JSON object.");
    }

    const parsedResponse: GeminiFullResponse = JSON.parse(jsonString);
    
    const finalResponse: GeminiFullResponse = {};

    if (parsedResponse.seo_metadata) {
      finalResponse.seo_metadata = {}; 
      if (parsedResponse.seo_metadata.title && typeof parsedResponse.seo_metadata.title === 'string') {
        finalResponse.seo_metadata.title = parsedResponse.seo_metadata.title;
      }
      if (parsedResponse.seo_metadata.description && typeof parsedResponse.seo_metadata.description === 'string') {
        finalResponse.seo_metadata.description = parsedResponse.seo_metadata.description;
      }
      if (Array.isArray(parsedResponse.seo_metadata.keywords) && parsedResponse.seo_metadata.keywords.every(k => typeof k === 'string')) {
        finalResponse.seo_metadata.keywords = parsedResponse.seo_metadata.keywords;
      }
    }

    if (parsedResponse.schema_markup) {
      finalResponse.schema_markup = { ...parsedResponse.schema_markup }; 
      if (!finalResponse.schema_markup['@type'] && parsedResponse.schema_markup) {
         finalResponse.schema_markup['@type'] = 'Article';
      }
    }
    
    console.log('Parsed Gemini Response:', JSON.stringify(finalResponse, null, 2));
    return finalResponse;

  } catch (error) {
    console.error('Error calling Gemini API or parsing response:', error);
    return {
      seo_metadata: {
        title: `Error: Could not generate title`,
        description: `Error: Could not generate description. ${textBlocks.substring(0, 100)}...`,
        keywords: ['error'],
      },
      schema_markup: {
        '@type': 'Article',
        headline: 'Error generating schema',
        articleBody: 'Could not generate article body due to an error.',
      },
    };
  }
}
