export interface BusLocation {
  // For custom user-created locations (stored in localStorage)
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'pickup' | 'destination' | 'both';
  isActive: boolean;
  
  // For API locations from STOPS_URL (optional, only present in API data)
  StopID?: string;
  StopName?: string;
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBusLocationDTO {
  name: string;
  latitude: number;
  longitude: number;
  type: 'pickup' | 'destination' | 'both';
  isActive?: boolean;
}

export interface UpdateBusLocationDTO {
  id: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  type?: 'pickup' | 'destination' | 'both';
  isActive?: boolean;
}