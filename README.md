# TAGSENSE.CL — Landing Comercial Operativa

Landing page comercial para **www.tagsense.cl**, desarrollada en Next.js (App Router), React y TypeScript.

La arquitectura del ecosistema TAGSENSE se divide en:
- **Landing comercial:** `www.tagsense.cl` (este repositorio / carpeta `tagsense-landing`)
- **Plataforma operativa y admin:** `app.tagsense.cl` (aplicación web y administración de activos)

---

## Estado Operativo

- [x] **Compilación y Build:** Validado y libre de errores (`npm run build`).
- [x] **Enlace al aplicativo:** Integrado botón *"Ingresar a la app ↗"* en el navbar, en el hero y en el footer, apuntando a `app.tagsense.cl` (configurable vía variable de entorno `NEXT_PUBLIC_APP_URL`).
- [x] **Formulario comercial:** Conectado a la ruta API `/api/contact` con validación de campos, protección anti-spam honeypot, estados de carga/error y confirmación personalizada. Soporte opcional de notificación por Webhook o Resend.
- [x] **Páginas Legales:** Incorporadas `/privacidad` y `/terminos` con estética industrial dark idéntica a la landing.
- [x] **SEO y Metadatos:** Configurados OpenGraph, Twitter Cards, robots.txt dinámico (`/robots.txt`) y sitemap dinámico (`/sitemap.xml`).
- [x] **Hydration Warning:** Sanitizado con `suppressHydrationWarning` para extensiones de navegador.

---

## Ejecución Local

1. En la carpeta `tagsense-landing`:
   ```bash
   npm install
   npm run dev
   ```
2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
3. Para validar el build de producción:
   ```bash
   npm run build
   npm run start
   ```

---

## Variables de Entorno (.env.local)

Copia `.env.example` a `.env.local`:
```env
# URL de la aplicación de gestión
NEXT_PUBLIC_APP_URL="https://app.tagsense.cl"

# Correo de destino para contactos comerciales
CONTACT_NOTIFICATION_EMAIL="contacto@tagsense.cl"

# (Opcional) Webhook para Slack, Discord, CRM o Zapier
# CONTACT_WEBHOOK_URL="https://hooks.slack.com/services/..."

# (Opcional) Notificaciones vía Resend
# RESEND_API_KEY="re_..."
```

---

## Estructura del Proyecto

- `app/page.tsx`: Landing comercial completa (Hero, Desafío, Flujo, Capacidades, Asistente Virtual, Informe Técnico, Aplicaciones, Instalación y Formulario de Demostración).
- `app/api/contact/route.ts`: Endpoint backend para procesar y notificar solicitudes de demostración comercial.
- `app/privacidad/page.tsx`: Política de Privacidad y Tratamiento de Datos.
- `app/terminos/page.tsx`: Términos y Condiciones de Uso del servicio.
- `app/robots.ts` y `app/sitemap.ts`: Generadores de robots.txt y sitemap.xml para indexación en Google.
- `app/globals.css`: Sistema de diseño, tokens, tipografías y responsividad mobile/desktop.
- `app/layout.tsx`: Metadatos, etiquetas OpenGraph y estructura raíz.
- `public/`: Activos visuales (isologotipo SVG, logo corporativo y fotografía del tag industrial).
