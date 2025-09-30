import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  emailSearch: string = '';
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
}

  onSearch() {
    if (this.emailSearch) {
      console.log('Recherche des infos pour :', this.emailSearch);
      // TODO: appeler le service backend pour récupérer les infos
    }
  }
}
