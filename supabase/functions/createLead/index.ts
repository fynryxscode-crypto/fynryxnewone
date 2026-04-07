import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    const { name, email, phone, service, message } = body

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert([{ name, email, phone, service, message, status: 'New' }])
      .select()
      .single()

    if (leadError) throw leadError

    // Create notification
    const notificationTitle = `New lead from ${name}`
    const notificationMessage = service
      ? `${name} is interested in ${service}`
      : `${name} submitted a contact form`

    await supabase.from('notifications').insert([
      {
        title: notificationTitle,
        message: notificationMessage,
        type: 'lead',
        is_read: false,
      },
    ])

    return new Response(
      JSON.stringify({ success: true, lead }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
