// ✅ Interface pour la météo reçue depuis OpenWeatherMap
export interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}


export interface InternshipOffer {
  lng: any;
  lat: any;
    id: number;
    title: string;
    companyName: string;
    location: string;
    duration: number;
    stageType: 'PFE' | 'SUMMER'; 
  creationDate:string;
    offerStatus: 'OPEN' | 'CLOSED' | 'ARCHIVED';
  
    remote: boolean; 
    paid: boolean; 
  
    startDate: string; 
    jobDescription: string;
  
    imageUrls: string[];
    
  // ✅ Ajout de la météo
  weather?: WeatherData;

  }
  