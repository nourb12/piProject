import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class StatisticsService {
  
  private baseUrl = 'http://localhost:8093/api/internship-offers/statistics';

  constructor(private http: HttpClient) {}

  // 📊 Nombre d’offres par entreprise (Admin)
  getOffersByCompany(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/global/offers-by-company`);
  }

  // 📈 Nombre d’offres créées par jour (Admin)
  getOffersByDay(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/global/offers-by-day`);
  }

  // 📍 Répartition des offres par ville (Admin)
  getOffersByLocation(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/global/offers-by-location`);
  }

  // 🎯 Répartition des types de stages (PFE vs Summer) (Admin)
  getOffersByType(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/global/offers-by-type`);
  }

  // 📌 Statut des offres (Open/Closed/Archived) (Admin)
  getOffersByStatus(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/global/offers-by-status`);
  }

  // 📊 Nombre de candidatures par offre (Admin)
  getApplicationsByOffer(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/global/applications-by-offer`);
  }

  // 🏢 Nombre de candidatures par entreprise (Admin)
  getApplicationsByCompany(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/global/applications-by-company`);
  }

  // 🌐 Technologies les plus mentionnées (Admin - Word Cloud)
  getMostUsedTechnologies(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/global/technologies`);
  }

  // 🔥 Ratio candidatures/offres (Admin)
  getSubmissionToOfferRatio(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/global/submission-to-offer-ratio`);
  }

  // 📊 Nombre total d’offres publiées pour une entreprise spécifique (RH)
  getOffersByCompanyRH(companyName: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/company/${companyName}/offers`);
  }

  // 📈 Nombre d’offres créées par jour pour une entreprise spécifique (RH)
  getOffersByCompanyPerDay(companyName: string): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/company/${companyName}/offers-by-day`);
  }

  // 📊 Nombre de candidatures reçues pour une entreprise spécifique (RH)
  getApplicationsByCompanyRH(companyName: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/company/${companyName}/applications`);
  }

  // 🔢 Ratio candidatures/offres pour une entreprise spécifique (RH)
  getSubmissionToOfferRatioByCompany(companyName: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/company/${companyName}/submission-to-offer-ratio`);
  }
}

