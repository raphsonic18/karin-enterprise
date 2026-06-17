import styles from './Hero.module.css'

export default function Hero({ onDevisClick }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroContent}>
        <span className={styles.eyebrow}>Location événementielle</span>
        <h1 className={styles.h1}>
          Votre événement,<br />
          <em>habillé</em> avec<br />
          élégance.
        </h1>
        <p className={styles.sub}>
          Chaises, tables, bâches, nappes, tréteaux, vaisselle… Kar'in Enterprise vous fournit tout le matériel pour des réceptions inoubliables, livré et récupéré à votre convenance.
        </p>
        <div className={styles.actions}>
          <button className="btn-primary" onClick={onDevisClick}>
            🎉 Demander un devis
          </button>
          <a href="#services" className="btn-secondary">
            Voir nos services →
          </a>
        </div>
        <div className={styles.statBar}>
          <div className={styles.stat}>
            <span className={styles.statNum}>3 000</span>
            <span className={styles.statLabel}>Chaises disponibles</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Clients satisfaits</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>24h</span>
            <span className={styles.statLabel}>Délai de réponse</span>
          </div>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <div className={styles.imgFrame}>
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80"
            alt="Salle décorée avec tables et chaises élégantes"
          />
        </div>
        <div className={styles.goldRing} />
      </div>
    </section>
  )
}
