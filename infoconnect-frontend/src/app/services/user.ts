// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/utilisateurs'; // URL backend NestJS

  constructor(private http: HttpClient) {}

  // Création d'un utilisateur
  createUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un utilisateur par ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Mise à jour d'un utilisateur
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, userData);
  }

  // Suppression
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Vérifier si un email existe
  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-email/${email}`);
  }

  // Trouver un utilisateur par email
  findUserByEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/find-user-by-email`, { email });
  }
}
