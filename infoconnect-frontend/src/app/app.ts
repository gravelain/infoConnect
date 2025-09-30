import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
