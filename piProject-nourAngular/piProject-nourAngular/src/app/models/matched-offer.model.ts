// matched-offer.model.ts

export interface MatchedOffer {
  id: number;
  title: string;
  companyName: string;
  jobDescription: string;
  imageUrls: string[];
  location: string;
  score: number;
  matchScore: number;

  weather?: {
    name: string;
    main: { temp: number };
    weather: { icon: string; description: string }[];
  };
}
