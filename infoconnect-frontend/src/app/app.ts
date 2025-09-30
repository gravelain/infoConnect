import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuActive = false; // ferme le menu à chaque navigation
      });
  }
  menuActive = false;
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
  closeMenu() {
    this.menuActive = false;
  }
}
