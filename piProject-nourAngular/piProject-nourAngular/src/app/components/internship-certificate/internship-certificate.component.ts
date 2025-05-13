import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-internship-certificate',
  templateUrl: './internship-certificate.component.html',
  styleUrls: ['./internship-certificate.component.css']
})
export class InternshipCertificateComponent {
  internName: string = '';
  supervisorName: string = '';
  companyName: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private http: HttpClient) {}

 
  generateCertificate() {
    const params = {
      internName: this.internName,
      supervisorName: this.supervisorName,
      companyName: this.companyName,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.http.get('http://localhost:8093/api/projects/documents/download/end-of-internship-certificate', { 
      params: params, 
      responseType: 'blob' 
    }).subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EndOfInternshipCertificate.pdf';
      a.click();
    }, error => {
      console.error('Error generating certificate', error);
    });
  }
}
