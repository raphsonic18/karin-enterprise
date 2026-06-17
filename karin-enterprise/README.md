# Kar'in Enterprise — Site vitrine + formulaire de devis

Site vitrine de location de matériel événementiel avec formulaire de devis connecté à **Turso (SQLite)** et redirection **WhatsApp**.

## Stack

- **Frontend** : React 18 + Vite + CSS Modules
- **Backend** : Vercel Serverless Functions (Node.js)
- **Base de données** : Turso (SQLite distribué, gratuit)
- **Déploiement** : Vercel

---

## 🚀 Déploiement en 5 étapes

### 1. Créer une base Turso (gratuit)

```bash
# Installer la CLI Turso
curl -sSfL https://get.tur.so/install.sh | bash

# Se connecter
turso auth login

# Créer la base de données
turso db create karin-enterprise

# Récupérer l'URL
turso db show karin-enterprise --url

# Créer un token d'accès
turso db tokens create karin-enterprise
```

### 2. Configurer les variables d'environnement

Copier `.env.example` en `.env` et remplir :

```
TURSO_DATABASE_URL=libsql://karin-enterprise-VOTRE-ORG.turso.io
TURSO_AUTH_TOKEN=votre-token-ici
WHATSAPP_NUMBER=2250000000000   # votre numéro sans + ni espaces
```

### 3. Installer les dépendances et tester localement

```bash
npm install

# Pour tester l'API en local, lancer avec Vercel CLI :
npm install -g vercel
vercel dev
```

### 4. Pousser sur GitHub

```bash
git init
git add .
git commit -m "Initial commit — Kar'in Enterprise"
git remote add origin https://github.com/VOTRE-USER/karin-enterprise.git
git push -u origin main
```

### 5. Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com) → **New Project**
2. Importer votre repo GitHub
3. Dans **Settings → Environment Variables**, ajouter :
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `WHATSAPP_NUMBER`
4. Cliquer **Deploy** ✅

---

## Personnalisation

| Élément | Fichier |
|---|---|
| Numéro WhatsApp | `.env` → `WHATSAPP_NUMBER` |
| Email de contact | `src/components/CTA.jsx` et `Footer.jsx` |
| Adresse | `src/components/Footer.jsx` |
| Articles du formulaire | `src/components/DevisModal.jsx` → `ARTICLES` |
| Couleurs | `src/styles/global.css` → `:root` |
| Images | Remplacer les URLs Unsplash dans chaque composant |
| Nom/liens réseaux | `src/components/Footer.jsx` → `SOCIALS` |

---

## Consulter les devis reçus

Via la CLI Turso :

```bash
turso db shell karin-enterprise

# Dans le shell SQLite :
SELECT id, nom, telephone, date_event, articles, created_at FROM devis ORDER BY created_at DESC;
```

---

## Structure du projet

```
karin-enterprise/
├── api/
│   └── devis.js          # API Vercel serverless → Turso
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .module.css
│   │   ├── Hero.jsx / .module.css
│   │   ├── Services.jsx / .module.css
│   │   ├── WhyUs.jsx / .module.css
│   │   ├── Gallery.jsx / .module.css
│   │   ├── CTA.jsx / .module.css
│   │   ├── Footer.jsx / .module.css
│   │   ├── DevisModal.jsx / .module.css
│   │   └── useReveal.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
├── .env.example
└── .gitignore
```
