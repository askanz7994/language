
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audioBase64, originalText, language } = await req.json();

    if (!audioBase64 || !originalText) {
      throw new Error('Audio data and original text are required');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Post-reading analysis prompt for complete paragraph feedback
    const prompt = `Analyze this Malayalam pronunciation recording and provide feedback by marking incorrect words with "x" and providing the correct pronunciation in parentheses with a tick mark (✓).

Original Malayalam text: "${originalText}"

Please analyze the pronunciation and respond with the same text but:
- Mark incorrect words with "x" before the word
- Add the correct pronunciation in parentheses after incorrect words with (✓ correct_pronunciation)
- Keep correctly pronounced words unchanged

Example format: "x കേരളം (✓ kēraḷam) പ്രകൃതിരമണീയമായ x ഭൂപ്രദേശമാണ് (✓ bhūpradēśamāṇ)"

Provide only the marked text, no additional explanations.`;

    // Use Gemini 1.5 Pro for analysis
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: "audio/wav",
                data: audioBase64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2000,
        }
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response:', JSON.stringify(geminiData, null, 2));

    const feedback = geminiData.candidates[0]?.content?.parts[0]?.text || 'Unable to analyze pronunciation';
    
    return new Response(JSON.stringify({ 
      feedback: feedback
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-pronunciation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      feedback: "Unable to analyze pronunciation at this time. Please try again."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
