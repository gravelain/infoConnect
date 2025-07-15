import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule], // <- obligatoire pour injecter EmailService
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
