import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar({ onDevisClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo}>
        Kar<span>'</span>in Enterprise
      </a>

      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        <li><a href="#services" onClick={close}>Services</a></li>
        <li><a href="#why" onClick={close}>À propos</a></li>
        <li><a href="#gallery" onClick={close}>Galerie</a></li>
        <li><a href="#cta" onClick={close}>Contact</a></li>
      </ul>

      <button className={styles.cta} onClick={() => { onDevisClick(); close() }}>
        📋 Demander un devis
      </button>

      <button
        className={styles.burger}
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
      >
        <span className={open ? styles.bOpen : ''}></span>
        <span className={open ? styles.bOpen : ''}></span>
        <span className={open ? styles.bOpen : ''}></span>
      </button>
    </nav>
  )
}
