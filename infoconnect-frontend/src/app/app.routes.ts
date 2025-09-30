import { Routes } from '@angular/router';
import { UserForm } from './components/user-form/user-form';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-form', component: UserForm },
  { path: 'about', component: HomeComponent }, // placeholder, tu peux créer AboutComponent
];
