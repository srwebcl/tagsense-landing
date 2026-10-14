'use client';

import { useState } from 'react';
import Link from 'next/link';

const capabilities = [
  { n: '01', title: 'Información técnica', text: 'Consulta manuales OEM, especificaciones, procedimientos y datos clave del activo desde un solo lugar.', icon: 'book' },
  { n: '02', title: 'Historial y trazabilidad', text: 'Registra intervenciones, fechas, evidencias y componentes para mantener una historia técnica ordenada.', icon: 'history' },
  { n: '03', title: 'Fotografías y evidencias', text: 'Asocia imágenes, notas y registros a cada intervención para respaldar el trabajo realizado.', icon: 'camera' },
  { n: '04', title: 'Informes técnicos', text: 'Genera informes estandarizados con la información registrada y la validación del mantenedor.', icon: 'file' },
  { n: '05', title: 'Asistente Técnico Virtual', text: 'Recibe orientación paso a paso basada en información técnica disponible. El mantenedor evalúa y decide.', icon: 'spark' },
  { n: '06', title: 'Acceso online y offline', text: 'Consulta información disponible desde terreno y sincroniza cuando existe conexión, según la operación de la plataforma.', icon: 'signal' },
];

const applications = [
  { title: 'Equipos móviles de minería', text: 'Camiones mineros, scooptrams y maquinaria de apoyo.' },
  { title: 'Planta y procesos', text: 'Chancadores, correas transportadoras y equipos rotativos.' },
  { title: 'Eléctrico e instrumentación', text: 'Salas eléctricas, CCM, instrumentos y sensores.' },
  { title: 'Componentes reparables', text: 'Cilindros hidráulicos, motores, transmisiones y módulos.' },
  { title: 'Infraestructura y activos fijos', text: 'Puentes grúa, sistemas de ventilación y equipos de planta.' },
];

function Icon({ name }: { name: string }) {
  const common = { width: 25, height: 25, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, React.ReactNode> = {
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20M8 7h8M8 11h8"/></>,
    history: <><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></>,
    camera: <><path d="M4 7h4l2-3h4l2 3h4v13H4z"/><circle cx="12" cy="13" r="4"/></>,
    file: <><path d="M6 2h8l5 5v15H6z"/><path d="M14 2v6h5M9 13h7M9 17h7"/></>,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></>,
    signal: <><path d="M5 9a11 11 0 0 1 14 0M8 12a6.5 6.5 0 0 1 8 0M11 15a2 2 0 0 1 2 0"/><path d="M12 18h.01"/><path d="M3 4a15 15 0 0 1 18 0"/></>,
  };
  return <svg {...common} aria-hidden="true">{paths[name] || paths.file}</svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', role: '', need: '', honeypot: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tagsense.cl';

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error al enviar el formulario.');
      }

      setSent(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado. Por favor intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="TAGSENSE, inicio">
          <img src="/logo.svg" alt="TAGSENSE" />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navegación principal">
          <a href="#plataforma" onClick={() => setMenuOpen(false)}>Plataforma</a>
          <a href="#funcionalidades" onClick={() => setMenuOpen(false)}>Funcionalidades</a>
          <a href="#aplicaciones" onClick={() => setMenuOpen(false)}>Aplicaciones</a>
          <a href="#asistente" onClick={() => setMenuOpen(false)}>Asistente virtual</a>
          <a href="#instalacion" onClick={() => setMenuOpen(false)}>Instalación</a>
          <a
            className="nav-app-btn"
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Ir al acceso operativo de la plataforma TAGSENSE"
          >
            Ingresar a la app <span>↗</span>
          </a>
          <a className="nav-cta" href="#contacto" onClick={() => setMenuOpen(false)}>
            Solicitar demostración <span>↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse" /> PLATAFORMA INTELIGENTE PARA ACTIVOS INDUSTRIALES
          </div>
          <h1>
            La información de cada activo.<br />
            <em>Cuando tu equipo la necesita.</em>
          </h1>
          <p className="hero-lead">
            Identifica equipos, consulta información técnica y registra intervenciones desde una sola plataforma.
            Menos tiempo buscando. Más información para mantener.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contacto">
              Solicitar una demostración <span>↗</span>
            </a>
            <a className="button button-ghost" href="#plataforma">
              Conocer cómo funciona <span>↓</span>
            </a>
          </div>
          <div className="hero-points">
            <span><b>✓</b> Información centralizada</span>
            <span><b>✓</b> Trazabilidad técnica</span>
            <span><b>✓</b> Online y offline</span>
          </div>
          <div style={{ marginTop: '16px', fontSize: '12px', color: '#8d8f94' }}>
            ¿Ya eres cliente?{' '}
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--orange)', textDecoration: 'underline', fontWeight: 600 }}
            >
              Ingresa directamente a app.tagsense.cl ↗
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-glow" />
          <div className="visual-label label-top">
            <span className="mini-dot" /> IDENTIFICACIÓN INTELIGENTE
          </div>
          <div className="device-wrap">
            <img src="/tag-device.png" alt="Dispositivo TAGSENSE para identificar activos industriales" />
          </div>
          <div className="visual-label label-bottom">
            <span className="scan-icon">⌁</span>
            <span>
              <strong>Un código. Toda la información.</strong>
              <small>Acceso rápido a la ficha técnica del activo</small>
            </span>
          </div>
          <div className="visual-index">
            TS / INDUSTRIAL ASSET PLATFORM <span>01—05</span>
          </div>
        </div>
        <div className="hero-bottomline">
          <span>DISEÑADO PARA OPERACIONES INDUSTRIALES</span>
          <span>IDENTIFICAR <i>·</i> CONSULTAR <i>·</i> TRAZAR</span>
        </div>
      </section>

      <section className="proof-strip">
        <div>
          <span className="proof-icon">01</span>
          <p>
            <strong>Información en un solo lugar</strong>
            <small>Manuales, datos, imágenes e historial</small>
          </p>
        </div>
        <div>
          <span className="proof-icon">02</span>
          <p>
            <strong>Registros estandarizados</strong>
            <small>Intervenciones con datos ordenados</small>
          </p>
        </div>
        <div>
          <span className="proof-icon">03</span>
          <p>
            <strong>Apoyo al mantenedor</strong>
            <small>Información para evaluar y decidir</small>
          </p>
        </div>
        <div>
          <span className="proof-icon">04</span>
          <p>
            <strong>Continuidad operacional</strong>
            <small>Acceso online y offline</small>
          </p>
        </div>
      </section>

      <section className="section problem-section" id="plataforma">
        <div className="section-kicker">01 / EL DESAFÍO</div>
        <div className="section-heading">
          <h2>
            El problema no siempre es la falla.<br />
            <span>Es encontrar la información correcta.</span>
          </h2>
          <p>
            Cuando los datos están repartidos entre documentos, carpetas y personas, el equipo pierde tiempo reuniendo
            antecedentes antes de actuar.
          </p>
        </div>
        <div className="problem-grid">
          <article className="problem-card">
            <div className="card-symbol negative">×</div>
            <h3>Información dispersa</h3>
            <p>Manuales, especificaciones e historial en distintas ubicaciones y formatos.</p>
          </article>
          <article className="problem-card">
            <div className="card-symbol negative">×</div>
            <h3>Dependencia de personas</h3>
            <p>Parte del conocimiento técnico queda en la experiencia individual y cuesta compartirlo.</p>
          </article>
          <article className="problem-card">
            <div className="card-symbol negative">×</div>
            <h3>Registros poco uniformes</h3>
            <p>Sin un formato común, comparar intervenciones y revisar antecedentes se vuelve más difícil.</p>
          </article>
          <article className="solution-card">
            <div className="card-symbol positive">✓</div>
            <div>
              <h3>TAGSENSE reúne la información del activo</h3>
              <p>
                Una plataforma para consultar antecedentes, registrar trabajos y mantener la historia técnica más
                accesible y ordenada.
              </p>
              <a href="#funcionalidades" className="text-link">
                Ver funcionalidades <span>→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section how-section" id="como-funciona">
        <div className="section-kicker">02 / CÓMO FUNCIONA</div>
        <div className="section-heading">
          <h2>
            De la identificación<br />
            <span>a la información útil.</span>
          </h2>
          <p>
            Un flujo simple para que el mantenedor llegue a los antecedentes del equipo sin depender de búsquedas manuales.
          </p>
        </div>
        <div className="steps">
          <article className="step">
            <span className="step-number">01</span>
            <div className="step-art step-art-tag">
              <div className="tag-mini">
                <div className="tag-mark">T</div>
                <span>TAG<span>SENSE</span></span>
                <div className="tag-wave">)))</div>
                <small>IDENTIFICADOR DE ACTIVO</small>
              </div>
            </div>
            <h3>Identifica el activo</h3>
            <p>Acerca el dispositivo compatible o utiliza el código asociado al equipo.</p>
          </article>
          <div className="step-arrow">→</div>
          <article className="step">
            <span className="step-number">02</span>
            <div className="step-art">
              <div className="data-lines">
                <span /><span /><span /><span /><span />
              </div>
              <div className="data-chip">FICHA DEL ACTIVO <b>✓</b></div>
            </div>
            <h3>Consulta sus antecedentes</h3>
            <p>Accede a la información técnica, documentos, fotografías e historial disponible.</p>
          </article>
          <div className="step-arrow">→</div>
          <article className="step">
            <span className="step-number">03</span>
            <div className="step-art">
              <div className="report-sheet">
                <b>INFORME TÉCNICO</b>
                <span /><span /><span /><span />
                <div className="report-check">✓</div>
              </div>
            </div>
            <h3>Registra y documenta</h3>
            <p>Guarda la intervención, incorpora evidencias y genera un informe para validar y compartir.</p>
          </article>
        </div>
      </section>

      <section className="section capabilities-section" id="funcionalidades">
        <div className="section-kicker">03 / LA PLATAFORMA</div>
        <div className="section-heading">
          <h2>
            Todo lo que necesitas.<br />
            <span>En la ficha de cada activo.</span>
          </h2>
          <p>
            Información técnica organizada para facilitar el trabajo diario de mantenimiento y mejorar la continuidad del
            conocimiento.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability" key={item.n}>
              <div className="capability-top">
                <span className="cap-icon"><Icon name={item.icon} /></span>
                <span className="cap-number">{item.n}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="cap-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="assistant-section" id="asistente">
        <div className="assistant-orb">
          <div className="orb-ring ring-one" />
          <div className="orb-ring ring-two" />
          <div className="orb-center">
            <span>TS</span>
            <small>ASISTENTE</small>
          </div>
          <div className="orb-node node-one" />
          <div className="orb-node node-two" />
          <div className="orb-node node-three" />
        </div>
        <div className="assistant-copy">
          <div className="section-kicker">04 / APOYO TÉCNICO</div>
          <h2>
            Un asistente que orienta.<br />
            <span>El mantenedor decide.</span>
          </h2>
          <p>
            El Asistente Técnico Virtual guía al usuario con preguntas y pasos de revisión, utilizando la información
            técnica disponible para ayudar a evaluar posibles causas.
          </p>
          <ul className="check-list">
            <li><span>✓</span> Orientación paso a paso según el problema descrito.</li>
            <li><span>✓</span> Consulta de procedimientos y antecedentes técnicos disponibles.</li>
            <li><span>✓</span> Apoyo para reducir la incertidumbre antes de intervenir.</li>
          </ul>
          <div className="note-box">
            <span>i</span>
            <p>
              <strong>Importante:</strong> TAGSENSE no reemplaza la inspección en terreno ni el criterio técnico. El
              mantenedor valida la condición y toma la decisión.
            </p>
          </div>
        </div>
      </section>

      <section className="report-section">
        <div className="report-copy">
          <div className="section-kicker">05 / DOCUMENTACIÓN</div>
          <h2>
            Del trabajo realizado<br />
            <span>a un informe claro.</span>
          </h2>
          <p>
            Registra la intervención y reúne sus datos en un informe técnico estandarizado, con antecedentes del activo,
            resumen del trabajo y evidencias incorporadas.
          </p>
          <ul className="check-list">
            <li><span>✓</span> Información organizada en un formato común.</li>
            <li><span>✓</span> Evidencias y registros asociados a la intervención.</li>
            <li><span>✓</span> Revisión y validación por parte del mantenedor.</li>
          </ul>
          <a className="button button-primary" href="#contacto">
            Conocer la plataforma <span>↗</span>
          </a>
        </div>
        <div className="report-visual">
          <div className="report-window">
            <div className="window-bar">
              <span /><span /><span />
              <small>VISTA REFERENCIAL DEL INFORME</small>
            </div>
            <div className="report-inner">
              <div className="report-heading">
                <div className="report-emblem">TS</div>
                <div>
                  <small>TAGSENSE / MANTENIMIENTO</small>
                  <h3>Informe técnico de intervención</h3>
                </div>
                <span className="pdf-badge">PDF</span>
              </div>
              <div className="report-table">
                <div>
                  <small>ACTIVO</small>
                  <b>Identificación del equipo</b>
                </div>
                <div>
                  <small>FECHA</small>
                  <b>Registro de intervención</b>
                </div>
                <div>
                  <small>RESUMEN</small>
                  <b>Descripción del trabajo realizado</b>
                </div>
                <div>
                  <small>EVIDENCIAS</small>
                  <div className="evidence-row"><i /><i /><i /></div>
                </div>
              </div>
              <div className="report-sign">
                <span>RESPONSABLE TÉCNICO</span>
                <b>Validación del mantenedor</b>
                <div>✓</div>
              </div>
            </div>
          </div>
          <div className="report-caption">
            <span className="caption-dot" /> Diseño ilustrativo de informe técnico
          </div>
        </div>
      </section>

      <section className="section applications-section" id="aplicaciones">
        <div className="section-kicker">06 / APLICACIONES</div>
        <div className="section-heading">
          <h2>
            Una plataforma.<br />
            <span>Distintos tipos de activos.</span>
          </h2>
          <p>
            Organiza la información técnica de equipos, componentes e infraestructura en un mismo entorno.
          </p>
        </div>
        <div className="applications-grid">
          {applications.map((a, i) => (
            <article className="application" key={a.title}>
              <div className={`application-number app-${i + 1}`}>0{i + 1}</div>
              <div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
              <span className="application-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="installation-section" id="instalacion">
        <div className="installation-head">
          <div className="section-kicker">07 / INSTALACIÓN DEL TAG</div>
          <h2>
            Un formato de instalación<br />
            <span>para cada necesidad.</span>
          </h2>
          <p>
            El documento de producto contempla tres versiones del identificador, según la forma de fijación requerida.
          </p>
        </div>
        <div className="install-grid">
          <article>
            <span className="install-num">01</span>
            <div className="install-visual adhesive">
              <div className="plate">
                <b>TS</b><span>TAG<span>SENSE</span></span><i>)))</i><small>IDENTIFICADOR</small>
              </div>
            </div>
            <h3>Versión adhesiva</h3>
            <p>Con autoadhesivo industrial 3M VHB. Para superficies limpias y secas, sin perforación.</p>
          </article>
          <article>
            <span className="install-num">02</span>
            <div className="install-visual hanging">
              <div className="cable-loop" />
              <div className="plate">
                <b>TS</b><span>TAG<span>SENSE</span></span><i>)))</i><small>IDENTIFICADOR</small>
              </div>
            </div>
            <h3>Versión colgante</h3>
            <p>Con cable de acero y seguro. Para equipos portátiles, herramientas y activos móviles.</p>
          </article>
          <article>
            <span className="install-num">03</span>
            <div className="install-visual screw">
              <div className="plate">
                <b>TS</b><span>TAG<span>SENSE</span></span><i>)))</i><small>IDENTIFICADOR</small>
                <em /><em /><em /><em />
              </div>
            </div>
            <h3>Versión atornillable</h3>
            <p>Con cuatro orificios para fijación a la superficie de montaje.</p>
          </article>
        </div>
        <div className="spec-strip">
          <div>
            <small>DIMENSIONES INDICADAS</small>
            <strong>30 × 30 × 10 mm</strong>
          </div>
          <div>
            <small>MATERIAL</small>
            <strong>Acero inoxidable 316L</strong>
          </div>
          <div>
            <small>PROTECCIÓN</small>
            <strong>IP68 indicada en ficha</strong>
          </div>
          <div>
            <small>TEMPERATURA DE OPERACIÓN</small>
            <strong>−40 °C a +85 °C</strong>
          </div>
        </div>
        <p className="spec-note">
          Las características corresponden a la ficha de producto entregada. La compatibilidad y configuración deben
          confirmarse según el activo y las condiciones de instalación.
        </p>
      </section>

      <section className="final-cta" id="contacto">
        <div className="cta-pattern" />
        <div className="cta-copy">
          <div className="section-kicker">08 / CONVERSEMOS</div>
          <h2>
            ¿Cuánto tiempo pierde tu equipo<br />
            buscando información técnica?
          </h2>
          <p>
            Conoce cómo TAGSENSE puede ayudar a organizar los antecedentes de tus activos y dar mayor trazabilidad al
            mantenimiento.
          </p>
          <div className="cta-benefits">
            <span>✓ Demostración de la plataforma</span>
            <span>✓ Revisión de tu caso de uso operacional</span>
          </div>
        </div>
        <div className="contact-card">
          <div className="contact-card-head">
            <span className="contact-step">SOLICITUD COMERCIAL</span>
            <h3>Hablemos de tus activos.</h3>
            <p>Déjanos tus datos para coordinar una conversación y demostración técnica.</p>
          </div>
          {sent ? (
            <div className="form-success">
              <span>✓</span>
              <h4>¡Solicitud recibida con éxito!</h4>
              <p>
                Muchas gracias, <strong>{form.name}</strong>. Hemos registrado la información de{' '}
                <strong>{form.company}</strong>. Nuestro equipo comercial se comunicará a la brevedad al correo{' '}
                <strong>{form.email}</strong> para coordinar la demostración personalizada.
              </p>
              <button
                type="button"
                className="reset-form"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', company: '', email: '', role: '', need: '', honeypot: '' });
                }}
              >
                ← Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={submitForm}>
              {error && <div className="form-error">{error}</div>}

              {/* Bot trap */}
              <input
                type="text"
                name="website"
                className="honey-field"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              />

              <label>
                Nombre y apellido
                <input
                  required
                  disabled={loading}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre completo"
                />
              </label>
              <label>
                Empresa
                <input
                  required
                  disabled={loading}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Nombre de la empresa u operación"
                />
              </label>
              <label>
                Correo corporativo
                <input
                  required
                  type="email"
                  disabled={loading}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nombre@empresa.cl"
                />
              </label>
              <label>
                Área o cargo
                <select
                  required
                  disabled={loading}
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="">Selecciona una opción</option>
                  <option>Mantenimiento</option>
                  <option>Confiabilidad</option>
                  <option>Operaciones</option>
                  <option>Abastecimiento / Compras</option>
                  <option>Gerencia / Administración</option>
                  <option>Otra área técnica</option>
                </select>
              </label>
              <label>
                ¿Qué necesitas gestionar? <span className="optional">Opcional</span>
                <textarea
                  disabled={loading}
                  value={form.need}
                  onChange={(e) => setForm({ ...form, need: e.target.value })}
                  placeholder="Ej.: equipos móviles, componentes de chancado, salas eléctricas..."
                  rows={3}
                />
              </label>
              <button className="button button-primary submit-button" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner" /> Enviando solicitud...
                  </>
                ) : (
                  <>
                    Solicitar contacto <span>↗</span>
                  </>
                )}
              </button>
              <small className="form-privacy">
                Al enviar tus datos, aceptas el tratamiento conforme a nuestra{' '}
                <Link href="/privacidad" style={{ color: 'var(--orange)', textDecoration: 'underline' }}>
                  política de privacidad
                </Link>
                .
              </small>

              <div className="contact-direct">
                <span><b>Canales directos:</b></span>
                <span>Contacto directo: <a href="mailto:contacto@tagsense.cl">contacto@tagsense.cl</a></span>
                <span>Acceso a usuarios registrados: <a href={appUrl} target="_blank" rel="noopener noreferrer">app.tagsense.cl ↗</a></span>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#inicio">
            <img src="/logo.svg" alt="TAGSENSE" />
          </a>
          <p>
            Información que conecta.<br />
            <span>Conocimiento que transforma.</span>
          </p>
          <a className="back-top" href="#inicio">Volver arriba ↑</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TAGSENSE. Todos los derechos reservados.</span>
          <div className="footer-links">
            <a href={appUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)' }}>
              Acceso App (app.tagsense.cl) ↗
            </a>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
            <a href="#contacto">Solicitar demostración</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
