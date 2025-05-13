import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profileback.service';

@Component({
  selector: 'app-backprofile',
  templateUrl: './backprofile.component.html',
  styleUrls: ['./backprofile.component.css']
})
export class BackprofileComponent {
 user: any = null;
  errorMessage: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil:', err);
        this.errorMessage = 'Impossible de récupérer le profil.';
      },
    });
  }
}
