/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as os from 'os';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASS');

    if (!user || !pass) {
      throw new Error('❌ EMAIL_USER ou EMAIL_PASS manquant dans le .env');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    this.logger.log('✅ Nodemailer initialisé avec Gmail');
  }

  async sendConfirmationEmail(to: string, prenom: string): Promise<void> {
    const fromEmail = this.configService.get<string>('EMAIL_USER');

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"OIECE - InfoConnect 👨‍💻" <${fromEmail}>`,
      to,
      replyTo: fromEmail,
      subject: `Bienvenue sur InfoConnect, ${prenom} ! 🎉`,
      text: `Bonjour ${prenom},

Merci de votre inscription sur InfoConnect, la plateforme officielle de l’Organisation Internationale des Étudiants et Anciens Étudiants Camerounais à l'Étranger (OIECE).

Nous sommes heureux de vous compter parmi notre communauté dynamique. Très bientôt, vous pourrez utiliser notre plateforme pour déposer et partager vos projets. Restez à l'affût !

Vos données sont collectées et traitées avec le plus grand soin, conformément au RGPD, pour garantir leur confidentialité et leur sécurité.

Vous recevez ce message car vous vous êtes inscrit sur InfoConnect. Si ce n’est pas vous, veuillez ignorer cet email.

À très bientôt,
L'équipe InfoConnect`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden;">
            <div style="padding: 20px; background-color: #007bff; color: white; text-align: center;">
              <h1>InfoConnect</h1>
            </div>
            <div style="padding: 30px; color: #333;">
              <h2>Bonjour ${prenom} 👋</h2>
              <p>
                Merci de vous être inscrit sur <strong>InfoConnect</strong>, la plateforme officielle de renseignements de l’Organisation Internationale des Étudiants et Anciens Étudiants Camerounais à l'Étranger (<strong>OIECE</strong>).
              </p>
              <p>
                Nous sommes ravis de vous accueillir dans notre communauté engagée et dynamique. Très bientôt, vous pourrez déposer et partager vos projets sur notre plateforme innovante. <strong>Restez connectés !</strong>
              </p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              <p style="font-size: 14px; color: #555;">
                Vos données sont collectées et traitées avec le plus grand soin, conformément au <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" style="color: #007bff; text-decoration: none;">RGPD</a>, afin de garantir leur confidentialité et leur sécurité.
              </p>
              <a href="https://infoconnect.com" style="display: inline-block; margin-top: 20px; background: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px;">Découvrir la plateforme</a>
            </div>
            <div style="padding: 20px; font-size: 12px; color: #888; text-align: center;">
              <p>Vous recevez cet email car vous vous êtes inscrit sur InfoConnect.</p>
              <p><a href="https://infoconnect.com/unsubscribe" style="color: #888;">Se désabonner</a></p>
            </div>
          </div>
        </div>
      `,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'InfoConnect Mailer',
      },
      messageId: `<infoconnect-${Date.now()}@${os.hostname()}>`,
      encoding: 'utf-8',
    };

    try {
      const info: nodemailer.SentMessageInfo = await this.transporter.sendMail(mailOptions);
      this.logger.log(`📨 Email envoyé à ${to} (ID: ${info.messageId})`);
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string }).message
          : String(error);
      this.logger.error(`❌ Erreur d’envoi de l’email à ${to}`, errorMessage);
    }
  }
}
