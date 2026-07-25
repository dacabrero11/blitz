import { CATEGORIAS } from '@/lib/servicios'
import { CategoriaSection } from '@/components/sections/CategoriaSection'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function ServiciosGrid() {
  return (
    <>
      {CATEGORIAS.map((cat, i) => (
        <CategoriaSection key={cat.slug} cat={cat} index={i} />
      ))}

      <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
        <div className="container">
          <div className="p-8 text-center relative" style={{ border: '1px solid var(--border)', background: 'var(--black-2)' }}>
            <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: 'var(--red)' }} />
            <p className="text-label mb-2">¿No sabés por dónde empezar?</p>
            <h3 className="font-display font-black uppercase mb-4" style={{ fontSize: 28, color: 'var(--white)' }}>
              Primera consulta gratis.
            </h3>
            <p className="mb-6" style={{ fontSize: 13, color: 'var(--gray-1)' }}>
              En 30 minutos por WhatsApp definimos qué servicios necesita tu negocio.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wide text-white px-8 py-3 transition-opacity hover:opacity-90"
              style={{
                background: '#25D366',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.215a.75.75 0 00.921.921l5.357-1.476A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
              Agendar llamada gratis
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
