import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { EmailService } from '../email/email.service'; // ✅ import

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService, // ✅ injecte le service d'email
  ) {}

  async create(createUtilisateurDto: CreateUtilisateurDto) {
    const user = await this.prisma.utilisateur.create({
      data: {
        prenom: createUtilisateurDto.prenom,
        nom: createUtilisateurDto.nom,
        email: createUtilisateurDto.email,
        telephone: createUtilisateurDto.telephone,
        dateNaissance: new Date(createUtilisateurDto.dateNaissance),
        lieuNaissance: createUtilisateurDto.lieuNaissance,
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
