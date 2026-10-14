import { NextResponse } from 'next/server';

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  role?: string;
  need?: string;
  honeypot?: string; // Bot trap
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    // 1. Silent rejection for bot submissions
    if (body.honeypot) {
      return NextResponse.json({ ok: true, message: 'Solicitud procesada' }, { status: 200 });
    }

    // 2. Validate required fields
    const name = body.name?.trim();
    const company = body.company?.trim();
    const email = body.email?.trim().toLowerCase();
    const role = body.role?.trim();
    const need = body.need?.trim() || '';

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Por favor ingresa tu nombre y apellido.' },
        { status: 400 }
      );
    }

    if (!company || company.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Por favor ingresa el nombre de tu empresa.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Por favor ingresa un correo electrónico corporativo válido.' },
        { status: 400 }
      );
    }

    if (!role) {
      return NextResponse.json(
        { ok: false, error: 'Por favor selecciona tu área o cargo.' },
        { status: 400 }
      );
    }

    const leadData = {
      name,
      company,
      email,
      role,
      need,
      timestamp: new Date().toISOString(),
      source: 'landing_tagsense_cl',
    };

    // 3. Log lead cleanly to server logs
    console.log('[TAGSENSE LEAD RECEIVED]', JSON.stringify(leadData, null, 2));

    // 4. If a Webhook is configured (Slack, Discord, CRM, Zapier, Make)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🎯 *Nuevo contacto comercial TAGSENSE:*\n• *Nombre:* ${name}\n• *Empresa:* ${company}\n• *Email:* ${email}\n• *Cargo:* ${role}\n• *Necesidad:* ${need || 'No especificada'}`,
            data: leadData,
          }),
        });
      } catch (webhookErr) {
        console.error('[TAGSENSE LEAD WEBHOOK ERROR]', webhookErr);
      }
    }

    // 5. If Resend email service is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'contacto@tagsense.cl';
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'TAGSENSE Leads <noreply@tagsense.cl>',
            to: [notificationEmail],
            reply_to: email,
            subject: `Nuevo contacto comercial: ${name} (${company})`,
            html: `
              <h2>Nueva solicitud de demostración TAGSENSE</h2>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Empresa:</strong> ${company}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Área / Cargo:</strong> ${role}</p>
              <p><strong>Necesidad descrita:</strong> ${need || 'Sin detalles adicionales'}</p>
              <hr />
              <small>Recibido el ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })} desde www.tagsense.cl</small>
            `,
          }),
        });
      } catch (emailErr) {
        console.error('[TAGSENSE LEAD EMAIL ERROR]', emailErr);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Solicitud recibida exitosamente.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[TAGSENSE CONTACT API ERROR]', error);
    return NextResponse.json(
      { ok: false, error: 'Hubo un error al procesar tu solicitud. Por favor intenta más tarde.' },
      { status: 500 }
    );
  }
}
