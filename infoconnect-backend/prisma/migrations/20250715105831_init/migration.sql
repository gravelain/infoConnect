-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "lieuNaissance" TEXT NOT NULL,
    "villeNaissance" TEXT NOT NULL,
    "villeActuelle" TEXT NOT NULL,
    "paysActuel" TEXT NOT NULL,
    "porteurProjet" TEXT NOT NULL,
    "domaineEtude" TEXT NOT NULL,
    "dernierDiplome" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "posteOccupe" TEXT NOT NULL,
    "nomEntreprise" TEXT NOT NULL,
    "lienLinkedin" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);
