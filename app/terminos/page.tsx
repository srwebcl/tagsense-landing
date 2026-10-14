import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | TAGSENSE',
  description: 'Términos y condiciones de uso de la plataforma comercial y técnica de TAGSENSE.',
};

export default function TerminosPage() {
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
        <h1>Términos y Condiciones de Uso</h1>
        <p className="legal-update">Última actualización: Octubre 2026</p>

        <section className="legal-section">
          <h2>1. Objeto y Alcance</h2>
          <p>
            El presente sitio web comercial (<strong>www.tagsense.cl</strong>) tiene como fin presentar la solución
            tecnológica TAGSENSE, diseñada para la identificación física y consulta de información técnica de activos
            industriales y mineros. El acceso operativo a la plataforma de gestión se efectúa a través de <strong>app.tagsense.cl</strong> mediante credenciales autorizadas.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Naturaleza del Asistente Técnico y Responsabilidad</h2>
          <p>
            El Asistente Técnico Virtual y las herramientas de apoyo de TAGSENSE constituyen sistemas de consulta 
            y orientación basados en documentación técnica, procedimientos y datos disponibles.
          </p>
          <p>
            <strong>Importante:</strong> TAGSENSE no reemplaza la inspección en terreno, el juicio profesional,
            las normas de seguridad minera o industrial (SERNAGEOMIN, normativas eléctricas, etc.) ni las decisiones
            del mantenedor calificado. El personal técnico es responsable exclusivo de validar la condición física
            del activo antes y durante cualquier intervención mecánica, eléctrica o hidráulica.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Especificaciones Técnicas de Tags</h2>
          <p>
            Las dimensiones, grado de protección IP68, temperaturas y materiales (acero inoxidable 316L) indicados
            en este sitio web representan especificaciones referenciales de producto. La adecuación a cada ambiente
            operacional (química de procesos, vibraciones, impacto mecánico) se valida en el plan de implementación.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Propiedad Intelectual</h2>
          <p>
            La marca TAGSENSE, sus logotipos, interfaces, diseños y algoritmos de software son propiedad exclusiva 
            de TAGSENSE SpA.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Contacto</h2>
          <p>
            Para consultas comerciales o contractuales, comuníquese a <strong>contacto@tagsense.cl</strong>.
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
