export interface InternshipOffer {
    id: number;
    title: string;
    companyName: string;
    location: string;
    duration: number;
    stageType: 'PFE' | 'SUMMER'; // ✅ Correspond à StageType Enum en backend
  
    offerStatus: 'OPEN' | 'CLOSED' | 'ARCHIVED'; // ✅ Correspond à OfferStatus Enum en backend
  
    remote: boolean; // ✅ Correspond à Boolean en Java
    paid: boolean; // ✅ Correspond à Boolean en Java
  
    startDate: string; // ✅ Format date sous forme de string (ex: "2025-08-01")
    jobDescription: string;
  
    imageUrls: string[]; // ✅ Liste des URLs d'images (si vide, pas d'images)
  }
  