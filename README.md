# InfoConnect

InfoConnect est une plateforme **de mise en réseau des étudiants et anciens étudiants camerounais** à travers le monde.  
Elle permet de **s’inscrire, partager ses projets, retrouver des camarades et accéder à des opportunités académiques ou professionnelles**, le tout via une interface simple et sécurisée.

---

## 🚀 Fonctionnalités principales

- Création et gestion de profils utilisateurs
- Recherche d’utilisateurs par email
- Validation des champs côté serveur et client
- Gestion des emails de confirmation
- Notifications UI/UX modernes (success, erreur, alertes persistantes)
- Affichage responsive et animations au scroll
- Interface moderne et intuitive

---

## ⚙️ Technologies utilisées

### Backend

- [NestJS](https://nestjs.com/) v11 – framework Node.js TypeScript
- [Prisma ORM](https://www.prisma.io/) – gestion de la base de données
- PostgreSQL – base de données relationnelle
- class-validator – validation des DTOs
- Node.js & TypeScript

### Frontend

- Angular 16 (standalone components)
- Angular Material – composants UI modernes
- RxJS – gestion des observables
- HTML5 & SCSS – mise en page et styles modernes

---

## 🗂 Structure du projet

infoConnect/
├── backend/
│ ├── src/
│ │ ├── user/
│ │ │ ├── dto/
│ │ │ │ └── create-utilisateur.dto.ts
│ │ │ ├── user.controller.ts
│ │ │ └── user.service.ts
│ │ ├── prisma/
│ │ │ └── prisma.service.ts
│ │ └── email/
│ │ └── email.service.ts
│ ├── prisma/
│ │ └── schema.prisma
│ └── main.ts
├── frontend/
│ ├── src/app/
│ │ ├── components/
│ │ │ ├── user-form/
│ │ │ └── home/
│ │ ├── services/
│ │ │ └── user.service.ts
│ │ └── app-routing.module.ts
│ ├── assets/
│ └── styles/
├── README.md
└── package.json

yaml
Copier le code

---

## 💾 Setup Backend (NestJS + Prisma + PostgreSQL)

1. **Installation des dépendances**

```bash
cd backend
npm install
Configurer la base de données

Crée une base PostgreSQL infoconnect

Met à jour le .env avec :

ini
Copier le code
DATABASE_URL="postgresql://user:password@localhost:5432/infoconnect?schema=public"
Lancer les migrations Prisma

bash
Copier le code
npx prisma migrate dev --name init
Démarrer le serveur NestJS

bash
Copier le code
npm run start:dev
L’API sera accessible sur http://localhost:3000

🧪 API REST
Modèle Utilisateur (Prisma)
ts
Copier le code
model Utilisateur {
  id              Int      @id @default(autoincrement())
  prenom          String
  nom             String
  email           String   @unique
  telephone       String
  dateNaissance   DateTime
  villeNaissance  String?
  villeActuelle   String
  paysActuel      String
  porteurProjet   String
  domaineEtude    String
  dernierDiplome  String?
  statut          String
  posteOccupe     String?
  nomEntreprise   String?
  lienLinkedin    String?
  dateCreation    DateTime @default(now())
}
Routes API
Méthode	Endpoint	Description
POST	/utilisateurs	Créer un utilisateur
GET	/utilisateurs	Obtenir tous les utilisateurs
GET	/utilisateurs/:id	Obtenir un utilisateur par ID
PATCH	/utilisateurs/:id	Mettre à jour un utilisateur
DELETE	/utilisateurs/:id	Supprimer un utilisateur

Exemple POST

json
Copier le code
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
Validation stricte côté serveur via DTOs

Erreurs 400 si données invalides

Vérification de l’unicité de l’email

⚡ Setup Frontend (Angular + Material)
Installation des dépendances

bash
Copier le code
cd frontend
npm install
Lancer l’application Angular

bash
Copier le code
ng serve --open
Accessible sur http://localhost:4200

Composants principaux
HomeComponent – page d’accueil responsive et moderne

UserFormComponent – formulaire d’inscription avec validations et notifications persistantes

Shared – alertes persistantes, snackbar, animations fade/slide

Notifications UI/UX
Success → vert, texte clair et persistant

Error → rouge, persistant + popup

Warning → orange, persistant

Animations fade-in / slide-in sur scroll

Responsive mobile & desktop

Validations Formulaire Angular
Validators.required

Validators.email

URL LinkedIn valide

Email unique vérifié avant POST

Gestion des erreurs côté serveur et affichage friendly

UI/UX Modern
Hero section avec overlay, titre et CTA clairs

Features : grilles interactives et responsive

Testimonials : cartes modernes et lisibles

CTA final pour inciter à s’inscrire

Animations au scroll pour dynamiser le contenu

Mobile-friendly : boutons empilés, texte lisible, padding adaptatif

📌 Bonnes pratiques
Utiliser HttpClient Angular avec catchError pour gérer les erreurs

Notifications persistantes via BehaviorSubject ou Subject

Tester l’API avec Postman ou Curl

Séparer .env pour dev/prod

Préparer l’authentification (JWT) pour sécuriser les routes sensibles

🖼 Screenshots (optionnel)
Ajouter ici des images de la homepage, formulaire et notifications

📝 Contact
Pour toute question, suggestion ou contribution, contactez l’auteur ou ouvrez une issue sur le dépôt GitHub.

InfoConnect – Connectez, partagez et créez votre réseau mondial !




