
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { whatsappNumber } = await req.json()

    if (!whatsappNumber) {
      return new Response(JSON.stringify({ error: 'whatsappNumber is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('whatsapp_number', whatsappNumber)
      .limit(1)
      .single()

    // .single() throws an error if no rows are found.
    // The error code for no rows is PGRST116.
    if (error && error.code !== 'PGRST116') {
      console.error('Error checking referrer:', error)
      throw new Error('Error checking referrer number')
    }

    const isValid = !!data

    return new Response(JSON.stringify({ isValid }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
