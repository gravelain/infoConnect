import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  userForm: FormGroup;
  isLoading = false;

  // Messages persistants
  persistentMessage: { type: 'success' | 'error' | 'warning'; text: string } | null = null;

  statutOptions = ['étudiant', 'ancien étudiant'];
  porteurProjetOptions = ['oui', 'non', 'pas encore'];

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      villeNaissance: [''],
      villeActuelle: ['', Validators.required],
      paysActuel: ['', Validators.required],
      porteurProjet: ['', Validators.required],
      domaineEtude: ['', Validators.required],
      dernierDiplome: [''],
      statut: ['', Validators.required],
      posteOccupe: [''],
      nomEntreprise: [''],
      lienLinkedin: [''],
    });
  }

  showSnack(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'Fermer', {
      duration: 4000,
      panelClass: [`snackbar-${type}`],
    });
  }

  setPersistentMessage(type: 'success' | 'error' | 'warning', text: string) {
    this.persistentMessage = { type, text };
  }

  clearPersistentMessage() {
    this.persistentMessage = null;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.clearPersistentMessage();

      this.userService.checkEmailExists(this.userForm.value.email).subscribe({
        next: (res) => {
          if (res.exists) {
            this.setPersistentMessage('warning', '⚠️ Cet email est déjà utilisé.');
            this.showSnack('Cet email est déjà utilisé 🚫', 'warning');
            this.isLoading = false;
          } else {
            this.userService.createUser(this.userForm.value).subscribe({
              next: () => {
                this.setPersistentMessage('success', '✅ Inscription réussie, bienvenue !');
                this.showSnack('Bienvenue 🎉 Inscription réussie', 'success');
                this.userForm.reset();
                this.isLoading = false;
              },
              error: () => {
                this.setPersistentMessage('error', '❌ Erreur serveur, réessayez plus tard.');
                this.showSnack('Erreur serveur ⚠️', 'error');
                this.isLoading = false;
              },
            });
          }
        },
        error: () => {
          this.setPersistentMessage('error', '❌ Impossible de vérifier l’email.');
          this.showSnack('Problème de connexion 🔌', 'error');
          this.isLoading = false;
        },
      });
    } else {
      this.setPersistentMessage('warning', '⚠️ Merci de remplir tous les champs obligatoires (*).');
      this.showSnack('Formulaire incomplet 📝', 'warning');
    }
  }
}
