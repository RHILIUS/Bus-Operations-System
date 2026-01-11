import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import styles from "./location-picker.module.css";
import { BusLocation, CreateBusLocationDTO, UpdateBusLocationDTO } from "@/app/interface/bus-location";
import { fetchBusLocations, createBusLocation, updateBusLocation, deleteBusLocation } from "@/lib/apiCalls/bus-location";
import { MapPin, Plus, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const LocationMapPicker = dynamic(() => import("@/components/ui/MapPicker"), { ssr: false });

// Unified interface to handle both formats
interface UnifiedLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type?: 'pickup' | 'destination' | 'both';
  isActive?: boolean;
  source: 'database' | 'api'; // Track the source
  canEdit: boolean; // Whether this location can be edited/deleted
}

interface LocationPickerModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (location: { name: string; latitude: string; longitude: string }) => Promise<boolean>;
  title?: string;
  selectButtonText?: string;
  initialName?: string;
  initialLat?: string;
  initialLng?: string;
  locationType?: 'pickup' | 'destination';
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  show,
  onClose,
  onCreate,
  title = "Select Location",
  selectButtonText = "Set Location",
  initialName = "",
  initialLat = "",
  initialLng = "",
  locationType,
}) => {
  const [name, setName] = useState(initialName);
  const [latitude, setLatitude] = useState(initialLat);
  const [longitude, setLongitude] = useState(initialLng);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  // Unified locations state (combines both formats)
  const [unifiedLocations, setUnifiedLocations] = useState<UnifiedLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Show/hide map section
  const [showMapSection, setShowMapSection] = useState(false);

  // CRUD modal state
  const [showCrudModal, setShowCrudModal] = useState(false);
  const [crudMode, setCrudMode] = useState<'create' | 'edit'>('create');
  const [editingLocation, setEditingLocation] = useState<UnifiedLocation | null>(null);
  const [crudForm, setCrudForm] = useState({
    name: '',
    latitude: '',
    longitude: '',
    type: 'both' as 'pickup' | 'destination' | 'both',
  });

  useEffect(() => {
    if (!show) return;
    setName(initialName);
    setLatitude(initialLat);
    setLongitude(initialLng);
    loadAllLocations();
  }, [show, initialName, initialLat, initialLng]);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  // Helper function to normalize API data (StopID/StopName format) to UnifiedLocation
  const normalizeApiLocation = (apiLocation: any): UnifiedLocation => {
    // Handle both formats: {StopID, StopName, latitude, longitude} OR {id, name, latitude, longitude}
    const id = apiLocation.StopID || apiLocation.id || `api_${Date.now()}_${Math.random()}`;
    const name = apiLocation.StopName || apiLocation.name || 'Unnamed Stop';
    const lat = parseFloat(apiLocation.latitude);
    const lng = parseFloat(apiLocation.longitude);
    
    return {
      id: String(id), // Ensure it's a string
      name: name,
      latitude: lat,
      longitude: lng,
      type: 'both', // API locations are available for both
      isActive: true,
      source: 'api',
      canEdit: false, // API locations cannot be edited
    };
  };

  // Helper function to normalize database BusLocation to UnifiedLocation
  const normalizeDatabaseLocation = (dbLocation: any): UnifiedLocation => {
    // For localStorage custom locations, use the 'id' field
    const locationId = dbLocation.id || dbLocation.StopID;
    
    return {
      id: String(locationId),
      name: dbLocation.name || dbLocation.StopName || 'Unnamed',
      latitude: typeof dbLocation.latitude === 'number' ? dbLocation.latitude : parseFloat(dbLocation.latitude),
      longitude: typeof dbLocation.longitude === 'number' ? dbLocation.longitude : parseFloat(dbLocation.longitude),
      type: dbLocation.type || 'both',
      isActive: dbLocation.isActive !== false,
      source: 'database',
      canEdit: true, // Database locations can be edited
    };
  };

  const loadAllLocations = async () => {
    setLoadingLocations(true);
    try {
      // First, try to load custom locations from localStorage
      const customLocations: UnifiedLocation[] = [];
      try {
        const stored = localStorage.getItem('bus_locations_cache');
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log('Loaded custom locations from localStorage:', parsed);
          
          // These are custom user-created locations with 'id' field
          const custom = parsed
            .filter((loc: any) => loc.id && !loc.StopID) // Only custom locations (have id, no StopID)
            .map((loc: any) => normalizeDatabaseLocation(loc));
          
          customLocations.push(...custom);
          console.log('Normalized custom locations:', custom);
        }
      } catch (storageError) {
        console.warn('Failed to load from localStorage:', storageError);
      }

      // Fetch from API (STOPS_URL - returns StopID/StopName format)
      const apiData = await fetchBusLocations();
      console.log('Fetched API locations (raw data):', apiData);

      let apiLocations: UnifiedLocation[] = [];

      // Check if data has StopID field (API format from STOPS_URL)
      if (apiData && apiData.length > 0) {
        const firstItem = apiData[0];
        
        if (firstItem.StopID) {
          // This is API format with StopID/StopName
          console.log('Detected API format (StopID/StopName)');
          apiLocations = apiData
            .map((stop: any) => normalizeApiLocation(stop))
            .filter((loc: UnifiedLocation) => !isNaN(loc.latitude) && !isNaN(loc.longitude));
        }
      }

      // Combine: custom locations first (user created), then API locations
      let unified = [...customLocations, ...apiLocations];
      
      console.log('Combined locations (custom + API):', unified);

      // Filter by type if needed
      if (locationType) {
        unified = unified.filter(loc => 
          loc.isActive !== false && (loc.type === locationType || loc.type === 'both')
        );
      } else {
        unified = unified.filter(loc => loc.isActive !== false);
      }

      console.log('Final unified locations (after filtering):', unified);
      setUnifiedLocations(unified);
    } catch (error) {
      console.error('Error loading locations:', error);
      setUnifiedLocations([]);
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocationId(locationId);
    const location = unifiedLocations.find(loc => loc.id === locationId);
    if (location) {
      setName(location.name);
      setLatitude(location.latitude.toString());
      setLongitude(location.longitude.toString());
    }
  };

  const handleOpenCrudModal = (mode: 'create' | 'edit', location?: UnifiedLocation) => {
    // Only allow editing database locations
    if (mode === 'edit' && location && location.source === 'api') {
      Swal.fire({
        icon: 'info',
        title: 'Cannot Edit',
        text: 'This location comes from the system and cannot be edited. You can create a new custom location instead.',
      });
      return;
    }

    setCrudMode(mode);
    if (mode === 'edit' && location) {
      setEditingLocation(location);
      setCrudForm({
        name: location.name,
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        type: location.type || 'both',
      });
    } else {
      setEditingLocation(null);
      setCrudForm({
        name: '',
        latitude: latitude || '',
        longitude: longitude || '',
        type: locationType || 'both',
      });
    }
    setShowCrudModal(true);
  };

  const handleCloseCrudModal = () => {
    setShowCrudModal(false);
    setEditingLocation(null);
    setCrudForm({
      name: '',
      latitude: '',
      longitude: '',
      type: 'both',
    });
  };

  const handleSaveCrudLocation = async () => {
    if (!crudForm.name.trim() || !crudForm.latitude || !crudForm.longitude) {
      await Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please provide name, latitude, and longitude.',
      });
      return;
    }

    try {
      if (crudMode === 'create') {
        const newLocation: CreateBusLocationDTO = {
          name: crudForm.name.trim(),
          latitude: parseFloat(crudForm.latitude),
          longitude: parseFloat(crudForm.longitude),
          type: crudForm.type,
          isActive: true,
        };
        await createBusLocation(newLocation);
        await Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Location created successfully.',
          timer: 1500,
        });
      } else if (crudMode === 'edit' && editingLocation && editingLocation.source === 'database') {
        const updateData: UpdateBusLocationDTO = {
          id: editingLocation.id,
          name: crudForm.name.trim(),
          latitude: parseFloat(crudForm.latitude),
          longitude: parseFloat(crudForm.longitude),
          type: crudForm.type,
        };
        await updateBusLocation(updateData);
        await Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Location updated successfully.',
          timer: 1500,
        });
      }
      handleCloseCrudModal();
      await loadAllLocations();
    } catch (error) {
      console.error('Error saving bus location:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save location. Please try again.',
      });
    }
  };

  const handleDeleteLocation = async (location: UnifiedLocation) => {
    // Only allow deleting database locations
    if (location.source === 'api') {
      await Swal.fire({
        icon: 'info',
        title: 'Cannot Delete',
        text: 'This location comes from the system and cannot be deleted.',
      });
      return;
    }

    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete Location?',
      text: `Are you sure you want to delete "${location.name}"?`,
      showCancelButton: true,
      confirmButtonColor: '#961c1e',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deleteBusLocation(location.id);
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Location deleted successfully.',
          timer: 1500,
        });
        await loadAllLocations();
        if (selectedLocationId === location.id) {
          setSelectedLocationId('');
        }
      } catch (error) {
        console.error('Error deleting bus location:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete location. Please try again.',
        });
      }
    }
  };

  const handleCreate = async () => {
    if (!name && !latitude && !longitude) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please select a location or pick one on the map.",
      });
      return;
    }

    try {
      const success = await onCreate({
        name: name || `${latitude}, ${longitude}`,
        latitude: latitude || "",
        longitude: longitude || "",
      });

      if (success) {
        setName("");
        setLatitude("");
        setLongitude("");
        setSelectedLocationId("");
        setShowMapSection(false);
        onClose();
      }
    } catch (err) {
      console.error("LocationPickerModal onCreate error:", err);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to set location. Please try again.",
      });
    }
  };

  if (!show) return null;

  const selectedLocation = unifiedLocations.find(loc => loc.id === selectedLocationId);
  const canEditSelected = selectedLocation?.canEdit ?? false;

  return (
    <>
      {/* Main Location Selection Modal */}
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>

          <div className={styles.body}>
            {/* Predefined Locations Dropdown Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <label className={styles.label}>
                  <MapPin size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                  Select Location
                </label>
                <div className={styles.crudButtons}>
                  <button
                    type="button"
                    className={styles.crudBtn}
                    onClick={() => handleOpenCrudModal('create')}
                    title="Add new custom location"
                  >
                    <Plus size={16} />
                  </button>
                  {selectedLocationId && canEditSelected && (
                    <>
                      <button
                        type="button"
                        className={styles.crudBtn}
                        onClick={() => {
                          if (selectedLocation) handleOpenCrudModal('edit', selectedLocation);
                        }}
                        title="Edit selected location"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        className={`${styles.crudBtn} ${styles.crudBtnDelete}`}
                        onClick={() => {
                          if (selectedLocation) handleDeleteLocation(selectedLocation);
                        }}
                        title="Delete selected location"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <select
                className={styles.input}
                value={selectedLocationId}
                onChange={(e) => handleLocationSelect(e.target.value)}
                disabled={loadingLocations}
              >
                <option value="">
                  {loadingLocations ? "Loading locations..." : "-- Select a location --"}
                </option>
                {unifiedLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} {loc.source === 'api' ? '🗺️' : '📍'}
                  </option>
                ))}
              </select>
              <small className={styles.inputHint}>
                🗺️ = System locations | 📍 = Custom locations (editable)
              </small>
            </div>

            {/* Show source info for selected location */}
            {selectedLocation && (
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: selectedLocation.source === 'api' ? '#eff6ff' : '#f0fdf4',
                borderRadius: '6px',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                border: selectedLocation.source === 'api' ? '1px solid #bfdbfe' : '1px solid #bbf7d0'
              }}>
                <strong>
                  {selectedLocation.source === 'api' ? '🗺️ System Location' : '📍 Custom Location'}
                </strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280' }}>
                  {selectedLocation.source === 'api' 
                    ? 'This location is managed by the system and cannot be edited.'
                    : 'You can edit or delete this custom location using the buttons above.'
                  }
                </p>
              </div>
            )}

            {/* Toggle Map Section Button */}
            <button
              type="button"
              className={styles.toggleMapBtn}
              onClick={() => setShowMapSection(!showMapSection)}
            >
              {showMapSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              <span>Want more specific location?</span>
            </button>

            {/* Collapsible Map Section */}
            {showMapSection && (
              <div className={styles.mapSection}>
                {/* Custom Name Input */}
                <div className={styles.section}>
                  <label className={styles.label}>Custom Name (Optional)</label>
                  <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a custom name"
                  />
                  <small className={styles.inputHint}>
                    Override the selected location name with a custom one.
                  </small>
                </div>

                {/* Map Picker */}
                <label className={styles.label} style={{ marginBottom: 6 }}>
                  Click on the map to set precise coordinates:
                </label>
                <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
                  <LocationMapPicker
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                  />
                </div>

                {/* Coordinates Display */}
                <div className={styles.coords}>
                  <div style={{ flex: 1 }}>
                    <label className={styles.label}>Latitude</label>
                    <input className={styles.input} value={latitude} readOnly />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className={styles.label}>Longitude</label>
                    <input className={styles.input} value={longitude} readOnly />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.footer}>
            <small className={styles.currentTime}>{currentTime}</small>
            <button className={styles.setLocationBtn} onClick={handleCreate} type="button">
              {selectButtonText}
            </button>
          </div>
        </div>
      </div>

      {/* CRUD Modal for Creating/Editing Bus Locations */}
      {showCrudModal && (
        <div className={styles.crudOverlay}>
          <div className={styles.crudModal}>
            <div className={styles.header}>
              <h2 className={styles.title}>
                {crudMode === 'create' ? 'Add New Custom Location' : 'Edit Custom Location'}
              </h2>
              <button className={styles.closeBtn} onClick={handleCloseCrudModal} aria-label="Close">
                ×
              </button>
            </div>

            <div className={styles.body}>
              <div className={styles.section}>
                <label className={styles.label}>Location Name *</label>
                <input
                  className={styles.input}
                  type="text"
                  value={crudForm.name}
                  onChange={(e) => setCrudForm({ ...crudForm, name: e.target.value })}
                  placeholder="e.g., City Terminal"
                />
              </div>

              <div className={styles.section}>
                <label className={styles.label}>Location Type *</label>
                <select
                  className={styles.input}
                  value={crudForm.type}
                  onChange={(e) => setCrudForm({ ...crudForm, type: e.target.value as any })}
                >
                  <option value="pickup">Pickup Only</option>
                  <option value="destination">Destination Only</option>
                  <option value="both">Both (Pickup & Destination)</option>
                </select>
              </div>

              {/* Map Picker for CRUD Modal */}
              <div className={styles.section}>
                <label className={styles.label}>Pick Location on Map *</label>
                <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
                  <LocationMapPicker
                    latitude={crudForm.latitude}
                    longitude={crudForm.longitude}
                    setLatitude={(lat) => setCrudForm({ ...crudForm, latitude: lat })}
                    setLongitude={(lng) => setCrudForm({ ...crudForm, longitude: lng })}
                  />
                </div>
                <small className={styles.inputHint}>
                  Click on the map to set the coordinates for this location.
                </small>
              </div>

              <div className={styles.coords}>
                <div style={{ flex: 1 }}>
                  <label className={styles.label}>Latitude *</label>
                  <input
                    className={styles.input}
                    type="number"
                    step="any"
                    value={crudForm.latitude}
                    onChange={(e) => setCrudForm({ ...crudForm, latitude: e.target.value })}
                    placeholder="e.g., 14.5995"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className={styles.label}>Longitude *</label>
                  <input
                    className={styles.input}
                    type="number"
                    step="any"
                    value={crudForm.longitude}
                    onChange={(e) => setCrudForm({ ...crudForm, longitude: e.target.value })}
                    placeholder="e.g., 120.9842"
                  />
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <div></div>
              <button className={styles.setLocationBtn} onClick={handleSaveCrudLocation} type="button">
                {crudMode === 'create' ? 'Create Location' : 'Update Location'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationPickerModal;