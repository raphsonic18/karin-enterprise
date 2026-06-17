import { useState, useEffect } from 'react'
import styles from './DevisModal.module.css'

const ARTICLES = [
  { id: 'chaises',   label: '🪑 Chaises',           unit: 'pièce(s)' },
  { id: 'tables',    label: '🪵 Tables',             unit: 'pièce(s)' },
  { id: 'treteaux',  label: '🪜 Tréteaux',           unit: 'pièce(s)' },
  { id: 'baches',    label: '🛖 Bâches / Tentes',    unit: 'pièce(s)' },
  { id: 'nappes',    label: '🎀 Nappes',             unit: 'pièce(s)' },
  { id: 'vaisselle', label: '🍽️ Vaisselle (lot)',    unit: 'lot(s) de 10' },
]

const INITIAL_ARTICLES = ARTICLES.map(a => ({ ...a, qte: 0 }))

const INITIAL_FORM = {
  nom: '', telephone: '', email: '',
  date_event: '', lieu: '', nb_personnes: '',
  message: '',
}

export default function DevisModal({ open, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [articles, setArticles] = useState(INITIAL_ARTICLES)
  const [step, setStep] = useState(1) // 1 = infos, 2 = articles, 3 = recap
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Reset on open
  useEffect(() => {
    if (open) {
      setForm(INITIAL_FORM)
      setArticles(INITIAL_ARTICLES)
      setStep(1)
      setError('')
    }
  }, [open])

  if (!open) return null

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setQte = (id, val) => {
    const n = Math.max(0, parseInt(val) || 0)
    setArticles(prev => prev.map(a => a.id === id ? { ...a, qte: n } : a))
  }

  const hasArticles = articles.some(a => a.qte > 0)
  const selectedArticles = articles.filter(a => a.qte > 0)

  // Step 1 validation
  const step1Valid = form.nom.trim() && form.telephone.trim() && form.date_event

  async function handleSubmit() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          nb_personnes: form.nb_personnes ? parseInt(form.nb_personnes) : null,
          articles: selectedArticles.map(a => ({ label: a.label.replace(/^.\s/, ''), qte: a.qte })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue')
      // Redirect to WhatsApp
      window.open(data.whatsappUrl, '_blank')
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.headerEyebrow}>Kar'in Enterprise</p>
            <h2 className={styles.headerTitle}>Demande de devis</h2>
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        {/* Steps indicator */}
        <div className={styles.steps}>
          {['Vos infos', 'Articles', 'Récapitulatif'].map((label, i) => (
            <div key={i} className={`${styles.step} ${step === i+1 ? styles.stepActive : ''} ${step > i+1 ? styles.stepDone : ''}`}>
              <div className={styles.stepDot}>{step > i+1 ? '✓' : i+1}</div>
              <span className={styles.stepLabel}>{label}</span>
              {i < 2 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className={styles.body}>

          {/* ── STEP 1: Infos personnelles ── */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Nom complet <span className={styles.req}>*</span></label>
                  <input
                    type="text" placeholder="Ex : Kouadio Marie"
                    value={form.nom}
                    onChange={e => setField('nom', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Téléphone <span className={styles.req}>*</span></label>
                  <input
                    type="tel" placeholder="+225 07 00 00 00 00"
                    value={form.telephone}
                    onChange={e => setField('telephone', e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label>Adresse e-mail <span className={styles.opt}>(optionnel)</span></label>
                <input
                  type="email" placeholder="votre@email.com"
                  value={form.email}
                  onChange={e => setField('email', e.target.value)}
                />
              </div>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Date de l'événement <span className={styles.req}>*</span></label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={form.date_event}
                    onChange={e => setField('date_event', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Nombre de personnes <span className={styles.opt}>(optionnel)</span></label>
                  <input
                    type="number" placeholder="Ex : 150" min="1"
                    value={form.nb_personnes}
                    onChange={e => setField('nb_personnes', e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label>Lieu / Adresse de livraison <span className={styles.opt}>(optionnel)</span></label>
                <input
                  type="text" placeholder="Ex : Cocody, Abidjan"
                  value={form.lieu}
                  onChange={e => setField('lieu', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── STEP 2: Articles ── */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <p className={styles.hint}>Indiquez les quantités souhaitées (0 = non souhaité)</p>
              <div className={styles.articleList}>
                {articles.map(a => (
                  <div key={a.id} className={`${styles.articleRow} ${a.qte > 0 ? styles.articleActive : ''}`}>
                    <span className={styles.articleLabel}>{a.label}</span>
                    <span className={styles.articleUnit}>{a.unit}</span>
                    <div className={styles.qteControl}>
                      <button
                        className={styles.qteBtn}
                        onClick={() => setQte(a.id, a.qte - 1)}
                        aria-label="Diminuer"
                      >−</button>
                      <input
                        type="number" min="0"
                        className={styles.qteInput}
                        value={a.qte}
                        onChange={e => setQte(a.id, e.target.value)}
                      />
                      <button
                        className={styles.qteBtn}
                        onClick={() => setQte(a.id, a.qte + 1)}
                        aria-label="Augmenter"
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
              {!hasArticles && (
                <p className={styles.warn}>⚠️ Sélectionnez au moins un article pour continuer.</p>
              )}
            </div>
          )}

          {/* ── STEP 3: Recap ── */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <div className={styles.recap}>
                <div className={styles.recapSection}>
                  <h4>👤 Vos coordonnées</h4>
                  <div className={styles.recapGrid}>
                    <span>Nom</span><strong>{form.nom}</strong>
                    <span>Téléphone</span><strong>{form.telephone}</strong>
                    {form.email && <><span>Email</span><strong>{form.email}</strong></>}
                    <span>Date</span><strong>{new Date(form.date_event).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}</strong>
                    {form.nb_personnes && <><span>Personnes</span><strong>{form.nb_personnes}</strong></>}
                    {form.lieu && <><span>Lieu</span><strong>{form.lieu}</strong></>}
                  </div>
                </div>
                <div className={styles.recapSection}>
                  <h4>📦 Articles sélectionnés</h4>
                  {selectedArticles.length === 0
                    ? <p className={styles.warn}>Aucun article sélectionné.</p>
                    : <div className={styles.recapArticles}>
                        {selectedArticles.map(a => (
                          <div key={a.id} className={styles.recapArticleRow}>
                            <span>{a.label}</span>
                            <strong>{a.qte} {a.unit}</strong>
                          </div>
                        ))}
                      </div>
                  }
                </div>
                <div className={styles.field}>
                  <label>Message complémentaire <span className={styles.opt}>(optionnel)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Précisions, couleur des nappes, heure de livraison…"
                    value={form.message}
                    onChange={e => setField('message', e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.waInfo}>
                <span>📲</span>
                <p>En cliquant sur <strong>Envoyer</strong>, votre demande sera enregistrée et vous serez redirigé vers <strong>WhatsApp</strong> avec le résumé pré-rempli.</p>
              </div>
              {error && <p className={styles.error}>❌ {error}</p>}
            </div>
          )}
        </div>

        {/* Footer navigation */}
        <div className={styles.footer}>
          {step > 1 && (
            <button className={styles.btnBack} onClick={() => setStep(s => s - 1)}>
              ← Retour
            </button>
          )}
          <div className={styles.footerRight}>
            {step < 3 && (
              <button
                className="btn-primary"
                disabled={step === 1 ? !step1Valid : !hasArticles}
                onClick={() => setStep(s => s + 1)}
              >
                Suivant →
              </button>
            )}
            {step === 3 && (
              <button
                className="btn-primary"
                style={{ background: 'var(--sage-dk)' }}
                disabled={loading || !hasArticles}
                onClick={handleSubmit}
              >
                {loading ? '⏳ Envoi…' : '💬 Envoyer sur WhatsApp'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
