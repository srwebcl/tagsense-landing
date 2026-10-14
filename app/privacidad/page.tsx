import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad | TAGSENSE',
  description: 'Tratamiento, protección y privacidad de datos recopilados a través de la plataforma TAGSENSE.',
};

export default function PrivacidadPage() {
  return (
    <div className="legal-page">
      <header className="header">
        <Link className="brand" href="/" aria-label="TAGSENSE, inicio">
          <img src="/logo.svg" alt="TAGSENSE" />
        </Link>
        <Link className="button button-ghost" href="/">
          ← Volver al inicio
        </Link>
      </header>

      <main className="legal-content">
        <div className="section-kicker">DOCUMENTO LEGAL</div>
        <h1>Política de Privacidad y Tratamiento de Datos</h1>
        <p className="legal-update">Última actualización: Octubre 2026</p>

        <section className="legal-section">
          <h2>1. Identificación del Responsable</h2>
          <p>
            TAGSENSE SpA (en adelante, &quot;TAGSENSE&quot;) es responsable del tratamiento de los datos personales 
            recopilados a través de este sitio web comercial (<strong>www.tagsense.cl</strong>) y su plataforma asociada.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Datos Recopilados</h2>
          <p>A través de nuestro formulario de contacto comercial, recopilamos únicamente:</p>
          <ul>
            <li>Nombre y apellido del contacto.</li>
            <li>Empresa u organización en la que se desempeña.</li>
            <li>Correo electrónico corporativo.</li>
            <li>Área funcional o cargo técnico.</li>
            <li>Descripción general de necesidades operacionales o de mantenimiento industrial.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Finalidad del Tratamiento</h2>
          <p>Los datos suministrados se utilizan exclusivamente para:</p>
          <ul>
            <li>Coordinar reuniones demostrativas de la plataforma TAGSENSE.</li>
            <li>Evaluar la viabilidad técnica y casos de uso en faenas mineras o plantas industriales.</li>
            <li>Responder dudas técnicas y comerciales solicitadas por el usuario.</li>
            <li>Envío de propuestas técnicas y cotizaciones autorizadas por el cliente.</li>
          </ul>
          <p>TAGSENSE no comercializa, cede ni transfiere datos de contacto a terceros ajenos a la operación del servicio.</p>
        </section>

        <section className="legal-section">
          <h2>4. Seguridad y Confidencialidad</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger la confidencialidad 
            e integridad de los antecedentes técnicos e información de las empresas clientes, conforme 
            a la legislación vigente en Chile (Ley N° 19.628 y sus modificaciones).
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Derechos del Titular y Contacto</h2>
          <p>
            En cualquier momento, usted puede solicitar el acceso, rectificación o eliminación de sus datos de contacto 
            escribiéndonos a <strong>contacto@tagsense.cl</strong>.
          </p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TAGSENSE. Todos los derechos reservados.</span>
          <Link href="/">Volver a inicio</Link>
        </div>
      </footer>
    </div>
  );
}
