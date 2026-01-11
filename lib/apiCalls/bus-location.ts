import { BusLocation, CreateBusLocationDTO, UpdateBusLocationDTO } from '@/app/interface/bus-location';
import { STOPS_URL } from '@/lib/urls';

const STORAGE_KEY = 'bus_locations_cache';

function getLocalStorageLocations(): BusLocation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

function saveLocalStorageLocations(locations: BusLocation[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export async function fetchBusLocations(): Promise<any[]> {
  try {
    // Fetch from backend API (STOPS_URL returns StopID/StopName format)
    const response = await fetch(STOPS_URL, {
      credentials: 'include',
    });
    
    if (response.ok) {
      const apiData = await response.json();
      // Return API data as-is (with StopID/StopName format)
      return apiData;
    }

    // Fallback: return empty array if API fails
    return [];
  } catch (error) {
    console.error('Error fetching bus locations:', error);
    return [];
  }
}

export async function createBusLocation(data: CreateBusLocationDTO): Promise<BusLocation> {
  try {
    // Backend API call would go here in the future
    // const response = await fetch('/api/bus-locations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (response.ok) return await response.json();
    
    // For now, use localStorage for custom locations
    const locations = getLocalStorageLocations();
    const newLocation: BusLocation = {
      id: `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      StopID: undefined, // Custom locations don't have StopID
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      type: data.type,
      isActive: data.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    locations.push(newLocation);
    saveLocalStorageLocations(locations);
    return newLocation;
  } catch (error) {
    console.error('Error creating bus location:', error);
    throw error;
  }
}

export async function updateBusLocation(data: UpdateBusLocationDTO): Promise<BusLocation> {
  try {
    // Backend API call would go here in the future
    // const response = await fetch(`/api/bus-locations/${data.id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (response.ok) return await response.json();
    
    // For now, use localStorage for custom locations
    const locations = getLocalStorageLocations();
    const index = locations.findIndex(loc => loc.id === data.id);
    if (index === -1) {
      throw new Error('Location not found');
    }
    
    const updatedLocation: BusLocation = {
      ...locations[index],
      ...data,
      id: data.id, // Preserve the original ID
      updatedAt: new Date().toISOString(),
    };
    locations[index] = updatedLocation;
    saveLocalStorageLocations(locations);
    return updatedLocation;
  } catch (error) {
    console.error('Error updating bus location:', error);
    throw error;
  }
}

export async function deleteBusLocation(id: string): Promise<void> {
  try {
    // Backend API call would go here in the future
    // const response = await fetch(`/api/bus-locations/${id}`, {
    //   method: 'DELETE',
    // });
    // if (response.ok) return;
    
    // For now, use localStorage for custom locations
    const locations = getLocalStorageLocations();
    const filtered = locations.filter(loc => loc.id !== id);
    saveLocalStorageLocations(filtered);
  } catch (error) {
    console.error('Error deleting bus location:', error);
    throw error;
  }
}