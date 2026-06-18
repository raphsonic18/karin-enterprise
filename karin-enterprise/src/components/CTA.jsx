import { useReveal } from './useReveal'
import styles from './CTA.module.css'

export default function CTA({ onDevisClick }) {
  const ref = useReveal()

  return (
    <section id="cta" className={styles.section} ref={ref}>
      <p className={`section-eyebrow reveal`} style={{ color: 'var(--gold-lt)' }}>Prêt à organiser ?</p>
      <h2 className={`section-title reveal`} style={{ color: 'var(--cream)' }}>
        Votre prochain événement<br />mérite le <em>meilleur</em>
      </h2>
      <div className={`divider reveal`} style={{ margin: '1.2rem auto 1.6rem' }} />
      <p className={`${styles.sub} reveal`}>
        Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé. Nos équipes vous répondent dans les 24h.
      </p>
      <div className={`${styles.buttons} reveal`}>
        <button className="btn-primary" onClick={onDevisClick}>
          📋 Demander un devis
        </button>
        <a
          href="https://wa.me/2250747997664?text=Bonjour%20Kar'in%20Enterprise%2C%20je%20voudrais%20un%20devis."
          target="_blank" rel="noopener noreferrer"
          className="btn-primary"
          style={{ background: 'var(--sage-dk)' }}
        >
          💬 WhatsApp direct
        </a>
        <a href="mailto:contact@karinenterprise.com" className="btn-outline">
          ✉️ Envoyer un e-mail
        </a>
      </div>
    </section>
  )
}
