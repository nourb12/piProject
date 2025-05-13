import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:8093/api/projects/documents';

  constructor(private http: HttpClient) { }


  uploadDocument(file: File, description: string, isEndOfInternshipCertificate: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('isEndOfInternshipCertificate', String(isEndOfInternshipCertificate));

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }


  downloadCertificate(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${documentId}`, {
      headers: new HttpHeaders(),
      responseType: 'blob'
    });
  }
  getDocuments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }
}
