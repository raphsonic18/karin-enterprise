import { useReveal } from './useReveal'
import styles from './Services.module.css'

const SERVICES = [
  { icon: '🪑', name: 'Chaises', desc: 'Chaises Tiffany, banquet, pliantes et de réception disponibles en grande quantité pour tout type d\'événement.', tag: 'Location à la pièce' },
  { icon: '🛖', name: 'Bâches & Tentes', desc: 'Grandes bâches imperméables et tentes de réception pour protéger vos invités en toutes circonstances, soleil ou pluie.', tag: 'Sur mesure', featured: true },
  { icon: '🍽️', name: 'Vaisselle', desc: 'Assiettes, couverts, verres et plats de service pour que votre table soit aussi belle que votre menu.', tag: 'Par lot ou à l\'unité' },
  { icon: '🪵', name: 'Tables & Tréteaux', desc: 'Tables rondes, rectangulaires et tréteaux solides pour monter votre salle rapidement et efficacement.', tag: 'Toutes dimensions' },
  { icon: '🎀', name: 'Nappes & Housses', desc: 'Nappes satin, organza, polyester et housses de chaises dans une large gamme de couleurs pour s\'accorder à votre thème.', tag: 'Toutes couleurs' },
  { icon: '🚚', name: 'Livraison & Récupération', desc: 'Nous livrons le matériel à votre lieu d\'événement et venons le récupérer après. Simple, rapide, sans stress.', tag: 'Inclus dans nos offres' },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" className={styles.section} ref={ref}>
      <div className={`${styles.intro} reveal`}>
        <p className="section-eyebrow">Ce que nous proposons</p>
        <h2 className="section-title">Du mobilier à la <em>vaisselle</em>, nous avons tout</h2>
        <div className="divider" />
      </div>
      <div className={styles.grid}>
        {SERVICES.map((s, i) => (
          <div
            key={s.name}
            className={`${styles.card} ${s.featured ? styles.featured : ''} reveal d${(i % 3) + 1}`}
          >
            <div className={styles.iconWrap}>{s.icon}</div>
            <p className={styles.name}>{s.name}</p>
            <p className={styles.desc}>{s.desc}</p>
            <span className={styles.tag}>{s.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
