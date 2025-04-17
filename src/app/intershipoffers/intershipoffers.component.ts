import { Component } from '@angular/core';

@Component({
  selector: 'app-intershipoffers',
  templateUrl: './intershipoffers.component.html',
  styleUrls: ['./intershipoffers.component.css']
})
export class IntershipoffersComponent {
  specialites: string[] = [
    'Web Developer',
    'Data Scientist',
    'Cybersecurity Analyst'
  ];

  getImagePath(index: number): string {
    const images = [
      'assets/frontassets/img/webDeveloper.png',
      'assets/frontassets/img/datascientist.png',
      'assets/frontassets/img/cyber.png'
    ];
    return images[index] || 'assets/frontassets/img/default.png';
  }

  getCompanyName(index: number): string {
    const companies = [
      'Tech Innovators Inc.',
      'Data Wizards LLC',
      'SecureNet Solutions'
    ];
    return companies[index] || 'Unknown Company';
  }

  getInternshipType(index: number): string {
    const types = [
      'Full-Time | Remote',
      'Part-Time | On-Site',
      'Full-Time | Hybrid'
    ];
    return types[index] || 'Flexible';
  }

  getDescription(index: number): string {
    const descriptions = [
      'Gain hands-on experience with modern web technologies and frameworks.',
      'Work with big data, machine learning models, and data visualization.',
      'Learn to identify vulnerabilities and protect systems from cyber threats.'
    ];
    return descriptions[index] || 'Explore and grow with our internship opportunity.';
  }
}
