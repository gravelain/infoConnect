# infoConnect
Optimisez la gestion de votre communauté WhatsApp grâce à une collecte de données structurée et sécurisée. InfoConnect transforme vos interactions en informations exploitables pour une collaboration renforcée


# 📦 InfoConnect - Backend API

Ce backend fournit une API RESTful pour la gestion des utilisateurs dans le cadre d'un projet de mise en réseau des anciens étudiants. Il est construit avec **NestJS**, utilise **Prisma ORM** pour la base de données **PostgreSQL**.

---

## ⚙️ Technologies utilisées

- [NestJS](https://nestjs.com/) (v11)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- TypeScript
- class-validator

---

🚀 Lancer le projet en local
bash
Copier
Modifier
# Installation des dépendances
```npm install```

# Créer la base de données et lancer les migrations
```npx prisma migrate dev --name init ```

# Démarrer le serveur
```npm run start:dev```


🗂 Structure des dossiers (extrait)
pgsql
Copier
Modifier
```
src/
├── utilisateurs/
│   ├── dto/
│   │   └── create-utilisateur.dto.ts
│   ├── user.controller.ts
│   ├── user.service.ts
├── prisma/
│   └── prisma.service.ts

```
🧪 Requêtes avec Postman / Curl
bash
Copier
Modifier
```curl -X POST http://localhost:3000/utilisateurs \
-H "Content-Type: application/json" \
-d '{
  "prenom": "Marie",
  "nom": "Curie",
  "email": "marie@curie.fr",
  "telephone": "0102030405",
  "dateNaissance": "1987-07-14",
  "villeActuelle": "Paris",
  "paysActuel": "France",
  "porteurProjet": "pas encore",
  "domaineEtude": "Physique",
  "statut": "ancien étudiant"
}'
```

## 🧱 Modèle `Utilisateur` (Prisma)

```ts
model Utilisateur {
  id                 Int      @id @default(autoincrement())
  prenom             String
  nom                String
  email              String   @unique
  telephone          String
  dateNaissance      DateTime
  lieuNaissance      String?   // Optionnel
  villeNaissance     String?   // Optionnel
  villeActuelle      String
  paysActuel         String
  porteurProjet      String    // "oui" | "non" | "pas encore"
  domaineEtude       String
  dernierDiplome     String?   // Optionnel
  statut             String    // "étudiant" | "ancien étudiant"
  posteOccupe        String?   // Optionnel
  nomEntreprise      String?   // Optionnel
  lienLinkedin       String?   // Optionnel
  dateCreation       DateTime @default(now())
}
```
---
🧾 Champs requis et optionnels
Champ	Type	Obligatoire	Remarques
prenom	string	✅ Oui	—
nom	string	✅ Oui	—
email	string	✅ Oui	Doit être unique, format email valide
telephone	string	✅ Oui	—
dateNaissance	string	✅ Oui	Format ISO (YYYY-MM-DD)
lieuNaissance	string	❌ Non	—
villeNaissance	string	❌ Non	—
villeActuelle	string	✅ Oui	—
paysActuel	string	✅ Oui	—
porteurProjet	string	✅ Oui	"oui", "non", "pas encore"
domaineEtude	string	✅ Oui	—
dernierDiplome	string	❌ Non	—
statut	string	✅ Oui	"étudiant", "ancien étudiant"
posteOccupe	string	❌ Non	—
nomEntreprise	string	❌ Non	—
lienLinkedin	string	❌ Non	Doit être une URL valide (si présent)

📡 API Routes
🔹 Créer un utilisateur
POST /utilisateurs

Exemple de body JSON :

json
Copier
Modifier

```
{
  "prenom": "Jean",
  "nom": "Dupont",
  "email": "jean.dupont@email.com",
  "telephone": "0600000000",
  "dateNaissance": "1990-01-01",
  "villeActuelle": "Paris",
  "paysActuel": "France",
  "porteurProjet": "oui",
  "domaineEtude": "Informatique",
  "statut": "étudiant"
}

```

🔹 Obtenir tous les utilisateurs
GET /utilisateurs

🔹 Obtenir un utilisateur par ID
GET /utilisateurs/:id

🔹 Modifier un utilisateur
PATCH /utilisateurs/:id

Exemple de body JSON (partiel possible) :

json
Copier
Modifier
{
  "nomEntreprise": "TechCorp"
}
🔹 Supprimer un utilisateur
DELETE /utilisateurs/:id

🔐 Validation des champs (DTO)
Les données reçues via l’API sont validées avec class-validator.

Si un champ obligatoire est manquant ou mal formé, une erreur HTTP 400 est renvoyée.

Les types sont strictement validés.
