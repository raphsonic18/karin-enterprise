import { useReveal } from './useReveal'
import styles from './WhyUs.module.css'

const POINTS = [
  { icon: '✅', title: 'Matériel propre et impeccable', desc: 'Chaque article est nettoyé, vérifié et conditionné avant chaque location.' },
  { icon: '⚡', title: 'Disponibilité & réactivité', desc: 'Devis rapide, livraison ponctuelle. Votre événement ne peut pas attendre.' },
  { icon: '💰', title: 'Tarifs transparents', desc: 'Pas de mauvaises surprises. Nous proposons des forfaits adaptés à tous les budgets.' },
  { icon: '🚚', title: 'Livraison & récupération incluses', desc: 'Nous apportons le matériel et venons le récupérer après l\'événement. Rien de plus à faire.' },
]

export default function WhyUs() {
  const ref = useReveal()

  return (
    <section id="why" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.visual} reveal`}>
          <div className={styles.imgStack}>
            <div className={styles.imgMain}>
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80"
                alt="Salle de mariage décorée"
              />
            </div>
            <div className={styles.imgAccent}>
              <img
                src="https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&q=80"
                alt="Vaisselle élégante dressée"
              />
            </div>
            <div className={styles.badge}>⭐ Fiable & rapide</div>
          </div>
        </div>

        <div>
          <p className={`section-eyebrow reveal`}>Pourquoi nous choisir</p>
          <h2 className={`section-title reveal`}>La fiabilité au <em>service</em> de vos moments précieux</h2>
          <div className={`divider reveal`} />
          <div className={styles.points}>
            {POINTS.map((p, i) => (
              <div key={p.title} className={`${styles.point} reveal d${i + 1}`}>
                <div className={styles.pointIcon}>{p.icon}</div>
                <div className={styles.pointText}>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
