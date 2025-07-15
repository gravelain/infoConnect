-- AlterTable
ALTER TABLE "Utilisateur" ALTER COLUMN "lieuNaissance" DROP NOT NULL,
ALTER COLUMN "villeNaissance" DROP NOT NULL,
ALTER COLUMN "dernierDiplome" DROP NOT NULL,
ALTER COLUMN "posteOccupe" DROP NOT NULL,
ALTER COLUMN "nomEntreprise" DROP NOT NULL,
ALTER COLUMN "lienLinkedin" DROP NOT NULL;
