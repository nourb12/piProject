import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent {
  file: File | null = null;
  description: string = '';
  isEndOfInternshipCertificate: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private documentService: DocumentService) { }

  // Handle file selection
  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  // Upload Document
  uploadDocument(): void {
    if (this.file && this.description) {
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      if (this.file.size > maxFileSize) {
        this.errorMessage = 'File size exceeds the maximum limit of 10MB.';
        return;
      }
  
      this.documentService.uploadDocument(this.file, this.description, this.isEndOfInternshipCertificate)
        .subscribe(
          response => {
            this.successMessage = 'Document uploaded successfully!';
            this.errorMessage = '';
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = 'Failed to upload the document.';
            this.successMessage = '';
          }
        );
    } else {
      this.errorMessage = 'Please provide a valid file and description.';
    }
  }
  
}
