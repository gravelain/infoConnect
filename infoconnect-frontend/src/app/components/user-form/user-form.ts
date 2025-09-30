import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  userForm: FormGroup;

  // Options pour selects
  statutOptions = ['étudiant', 'ancien étudiant'];
  porteurProjetOptions = ['oui', 'non', 'pas encore'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      lieuNaissance: [''],
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

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('✅ Données formulaire:', this.userForm.value);
      // TODO: connecter au UserService pour POST sur ton backend
    } else {
      console.warn('❌ Formulaire invalide');
    }
  }
}
