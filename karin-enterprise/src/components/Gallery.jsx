import styles from './Gallery.module.css'

const ITEMS = [
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=75', label: 'Mariage' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=75', label: 'Réception' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=75', label: 'Anniversaire' },
  { src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&q=75', label: 'Dîner de gala' },
  { src: 'https://images.unsplash.com/photo-1478146059778-26ce0be2bc9a?w=400&q=75', label: 'Séminaire' },
  { src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&q=75', label: 'Baptême' },
  { src: 'https://images.unsplash.com/photo-1543007631-283050bb3e8c?w=400&q=75', label: 'Soirée privée' },
]

// Duplicate for seamless loop
const ALL = [...ITEMS, ...ITEMS]

export default function Gallery() {
  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.track}>
        {ALL.map((item, i) => (
          <div key={i} className={styles.item}>
            <img src={item.src} alt={item.label} loading="lazy" />
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
