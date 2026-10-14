import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TAGSENSE | Información técnica para activos industriales',
  description:
    'Identifica tus activos industriales y accede a manuales, especificaciones, historial técnico, evidencias e informes desde una sola plataforma. Diseñado para minería e industria pesada.',
  icons: { icon: '/favicon.svg' },
  metadataBase: new URL('https://www.tagsense.cl'),
  alternates: {
    canonical: 'https://www.tagsense.cl',
  },
  keywords: [
    'gestión de activos',
    'mantenimiento industrial',
    'minería chile',
    'trazabilidad de equipos',
    'asistente técnico virtual',
    'ficha técnica industrial',
    'tagsense',
    'identificación nfc rfid lora',
  ],
  openGraph: {
    title: 'TAGSENSE | Información que conecta. Conocimiento que transforma.',
    description:
      'Información técnica de tus activos, disponible cuando el equipo de mantenimiento la necesita.',
    url: 'https://www.tagsense.cl',
    siteName: 'TAGSENSE',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/tag-device.png',
        width: 800,
        height: 600,
        alt: 'Dispositivo TAGSENSE para identificación de activos industriales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAGSENSE | Información técnica para activos industriales',
    description:
      'Centraliza antecedentes técnicos, historial y evidencias de mantenimiento en faena.',
    images: ['/tag-device.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
