import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:8888/api/documents'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Upload Document (internship report or diary)
  uploadDocument(file: File, description: string, isEndOfInternshipCertificate: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('isEndOfInternshipCertificate', String(isEndOfInternshipCertificate));

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // Download the end of internship certificate (if available)
  downloadCertificate(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${documentId}`, {
      headers: new HttpHeaders(),
      responseType: 'blob'  // To get the file as a Blob
    });
  }

  // Get all documents for the intern
  getDocuments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }
}
