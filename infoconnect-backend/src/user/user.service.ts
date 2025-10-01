import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { EmailService } from '../email/email.service'; // Service d'email
import { BadRequestException } from '@nestjs/common'; // Exception pour les erreurs 400

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService, // injecte le service d'email
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.prisma.utilisateur.findUnique({
      where: { email },
    });
    return !!user; // true si utilisateur trouvé, false sinon
  }
  async create(createUtilisateurDto: CreateUtilisateurDto) {
    // Vérification si l'email existe déjà
    const emailAlreadyUsed = await this.emailExists(createUtilisateurDto.email);

    if (emailAlreadyUsed) {
      throw new BadRequestException(
        `Un utilisateur avec cet email existe déjà.`,
      );
    }
    const user = await this.prisma.utilisateur.create({
      data: {
        prenom: createUtilisateurDto.prenom,
        nom: createUtilisateurDto.nom,
        email: createUtilisateurDto.email,
        telephone: createUtilisateurDto.telephone,
        dateNaissance: new Date(createUtilisateurDto.dateNaissance),
        villeNaissance: createUtilisateurDto.villeNaissance,
        villeActuelle: createUtilisateurDto.villeActuelle,
        paysActuel: createUtilisateurDto.paysActuel,
        porteurProjet: createUtilisateurDto.porteurProjet,
        domaineEtude: createUtilisateurDto.domaineEtude,
        dernierDiplome: createUtilisateurDto.dernierDiplome,
        statut: createUtilisateurDto.statut,
        posteOccupe: createUtilisateurDto.posteOccupe,
        nomEntreprise: createUtilisateurDto.nomEntreprise,
        lienLinkedin: createUtilisateurDto.lienLinkedin ?? '',
      },
    });

    // ✅ Envoi de l’email de confirmation
    await this.emailService.sendConfirmationEmail(user.email, user.prenom);

    return user;
  }

  async findAll() {
    return this.prisma.utilisateur.findMany();
  }

  async findOnebyEmail(email: string) {
    return this.prisma.utilisateur.findUnique({
      where: { email },
    });
  }

  async findOne(id: number) {
    return this.prisma.utilisateur.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateData: Partial<CreateUtilisateurDto>) {
    return this.prisma.utilisateur.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.prisma.utilisateur.delete({
      where: { id },
    });
  }
}
