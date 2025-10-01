import {
  IsString,
  IsDateString,
  IsIn,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateUtilisateurDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsEmail()
  email: string;

  @IsString()
  telephone: string;

  @IsDateString()
  dateNaissance: string;

  @IsOptional()
  @IsString()
  villeNaissance?: string;

  @IsString()
  villeActuelle: string;

  @IsString()
  paysActuel: string;

  @IsIn(['oui', 'non', 'pas encore'])
  porteurProjet: string;

  @IsString()
  domaineEtude: string;

  @IsOptional()
  @IsString()
  dernierDiplome?: string;

  @IsIn(['étudiant', 'ancien étudiant'])
  statut: string;

  @IsOptional()
  @IsString()
  posteOccupe?: string;

  @IsOptional()
  @IsString()
  nomEntreprise?: string;

  @IsOptional()
  @IsString()
  lienLinkedin?: string;
}
