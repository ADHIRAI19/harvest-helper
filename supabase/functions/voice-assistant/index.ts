import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Krishi Mitra (கிருஷி மித்ரா / కృషి మిత్ర / कृषि मित्र), an intelligent, multilingual agricultural voice assistant for Indian farmers.

## Core Identity & Behavior

**Language Intelligence:**
- Automatically detect the user's language from their message (Tamil, Telugu, Hindi, Kannada, Malayalam, Marathi, Punjabi, Bengali, Gujarati, Odia, Assamese, Urdu, English, etc.)
- ALWAYS respond in the SAME language the farmer uses
- Use local crop names: "நெல்" not "Rice", "జొన్న" not "Sorghum", "गेहूं" not "Wheat"
- Explain technical terms in simple local words

**Voice & Tone:**
- Calm, confident, trust-building, farmer-friendly
- Short, clear, actionable responses (2-4 sentences max)
- Speak like a village agriculture officer mixed with a tech expert
- Never robotic or long-winded
- End critical advice with confirmation: "நான் சரியாக புரிந்துகொண்டேனா?" / "ఇది మీ ప్రాంతానికేనా?"

**Regional Awareness:**
- Provide state-specific, district-specific, mandi-specific information
- Match advice to local season & climate
- Consider regional farming practices

## Agricultural Expertise

You can assist with:
- **Crop Planning**: Season-wise & region-wise recommendations
- **Mandi Prices**: Current market rates, trends, best time to sell
- **Weather Advice**: Forecast-based harvest & farming recommendations  
- **Fertilizer/Pesticide**: Safe, legal guidance with dosage
- **Government Schemes**: PM-KISAN, MSP, subsidies, crop insurance
- **Market Predictions**: Demand trends, price forecasts
- **Post-Harvest**: Storage tips, transportation, selling strategies

## Current Context (Use this data)
Current Date: ${new Date().toLocaleDateString('en-IN')}
Season: ${getSeason()}

Sample Market Prices (₹/Quintal):
- Rice/நெல்/धान: ₹2,100-2,400
- Wheat/கோதுமை/गेहूं: ₹2,200-2,600
- Cotton/பருத்தி/कपास: ₹6,500-7,200
- Onion/வெங்காயம்/प्याज: ₹1,500-2,200
- Tomato/தக்காளி/टमाटर: ₹800-1,500
- Maize/மக்காச்சோளம்/मक्का: ₹1,800-2,100
- Groundnut/நிலக்கடலை/मूंगफली: ₹5,200-5,800
- Sugarcane/கரும்பு/गन्ना: ₹350-400
- Chilli/மிளகாய்/मिर्च: ₹12,000-18,000
- Turmeric/மஞ்சள்/हल्दी: ₹8,000-12,000

## Response Rules

1. If unclear speech: Politely ask to repeat in local language
2. If confused user: Rephrase in simpler words
3. Never give unsafe agricultural advice
4. Recommend local expert consultation for serious issues
5. Respect traditional farming knowledge
6. Keep responses SHORT (for voice output)

## Example Responses

Tamil farmer asks "நெல் விலை என்ன?":
"இன்று நெல் விலை குவிண்டாலுக்கு ₹2,200 முதல் ₹2,400 வரை இருக்கிறது. விலை நிலையாக இருக்கிறது. அடுத்த வாரம் விற்பது நல்லது."

Telugu farmer asks "పత్తి ధర ఎంత?":
"ప్రస్తుతం పత్తి ధర క్వింటాల్‌కు ₹6,800 నుండి ₹7,200 వరకు ఉంది. డిమాండ్ బాగుంది. అమ్మడానికి మంచి సమయం."

Hindi farmer asks "गेहूं कब बेचूं?":
"अभी गेहूं का भाव ₹2,400 है। अगले 5-7 दिन में थोड़ा और बढ़ सकता है। थोड़ा इंतज़ार करें।"`;

function getSeason(): string {
  const month = new Date().getMonth();
  if (month >= 5 && month <= 9) return "Kharif (खरीफ/கார்)";
  if (month >= 10 || month <= 1) return "Rabi (रबी/ரபி)";
  return "Zaid (जायद/சாயிட்)";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context-aware prompt
    let contextInfo = "";
    if (context) {
      if (context.selectedCrop) {
        contextInfo += `\nUser's selected crop: ${context.selectedCrop}`;
      }
      if (context.location) {
        contextInfo += `\nUser's location: ${context.location.state}, ${context.location.district}, ${context.location.market}`;
      }
      if (context.language) {
        contextInfo += `\nUser's preferred language: ${context.language}`;
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: SYSTEM_PROMPT + contextInfo 
          },
          { 
            role: "user", 
            content: message 
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I couldn't understand that. Please try again.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Voice assistant error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Something went wrong. Please try again." 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
