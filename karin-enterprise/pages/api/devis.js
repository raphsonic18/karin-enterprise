import { createClient } from '@libsql/client'

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS devis (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      nom         TEXT NOT NULL,
      telephone   TEXT NOT NULL,
      email       TEXT,
      date_event  TEXT NOT NULL,
      lieu        TEXT,
      nb_personnes INTEGER,
      articles    TEXT NOT NULL,
      message     TEXT,
      created_at  TEXT DEFAULT (datetime('now'))
    )
  `)
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' })

  try {
    await initDB()

    const {
      nom, telephone, email,
      date_event, lieu, nb_personnes,
      articles, message
    } = req.body

    if (!nom || !telephone || !date_event || !articles || articles.length === 0) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' })
    }

    const articlesJson = JSON.stringify(articles)

    await db.execute({
      sql: `INSERT INTO devis (nom, telephone, email, date_event, lieu, nb_personnes, articles, message)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [nom, telephone, email || null, date_event, lieu || null, nb_personnes || null, articlesJson, message || null]
    })

    // Build WhatsApp message
    const lignesArticles = articles
      .filter(a => a.qte > 0)
      .map(a => `  • ${a.label} : ${a.qte}`)
      .join('\n')

    const whatsappText = encodeURIComponent(
      `Bonjour Kar'in Enterprise 👋\n\n` +
      `Je souhaite un devis pour mon événement :\n\n` +
      `👤 Nom : ${nom}\n` +
      `📞 Téléphone : ${telephone}\n` +
      `📅 Date : ${date_event}\n` +
      (lieu ? `📍 Lieu : ${lieu}\n` : '') +
      (nb_personnes ? `👥 Nombre de personnes : ${nb_personnes}\n` : '') +
      `\n📦 Articles souhaités :\n${lignesArticles}\n` +
      (message ? `\n💬 Message : ${message}\n` : '') +
      `\nMerci !`
    )

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2250747997664' // Remplacez par votre numéro WhatsApp au format international
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

    return res.status(200).json({ success: true, whatsappUrl })
  } catch (err) {
    console.error('Erreur API devis:', err)
    return res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' })
  }
}
