import { InternshipOffer } from "./internship-offer.model";

export interface Application {
  id: number;
  userId: number;
  internshipOffer: InternshipOffer;

  fullName: string;
  email: string;
  phone: string;
  city: string;

  careerObjective: string;
  technologyProfile: string;
  skills: string; // ✅ Le backend renvoie un string (et pas un tableau !)
  experiences: string; // ✅ Correction de `experience` → `experiences` comme en back

  submissionDate: Date | string;
  status: 'ACCEPTED' | 'WAITING' | 'DENIED';

  // Liens utiles
  photoUrl: string;
  linkedinProfile: string;
  portfolio: string;

  cvPdfUrl: string;
  motivationPdfUrl: string;
  prediction: any;  // Add the prediction field
}
