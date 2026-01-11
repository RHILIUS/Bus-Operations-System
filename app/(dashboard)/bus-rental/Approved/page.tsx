'use client';

import React, { useEffect, useState } from 'react';
import styles from './approved.module.css';
import '../../../../styles/globals.css';
import Swal from 'sweetalert2';
import ApprovedBusReadinessModal from '@/components/modal/Approved-Bus-Readiness-Modal/ApprovedBusReadinessModal';
import AssignRentalDriverModal from '@/components/modal/Assign-Rental-Driver-Modal/AssignRentalDriverModal';
import DamageCheckModal from '@/components/modal/Damage-Check-Modal/DamageCheckModal';
import RouteMapModal from '@/components/modal/Route-Map-Modal/RouteMapModal';
import CustomerInfoModal from '@/components/modal/Customer-Info-Modal/CustomerInfoModal';
import { Loading, FilterDropdown, PaginationComponent } from '@/shared/imports';
import { FilterSection } from '@/components/ui/FilterDropDown/FilterDropdown';

import { fetchRentalRequestsByStatus, updateRentalRequest } from '@/lib/apiCalls/rental-request';
import { fetchBackendToken } from '@/lib/backend';

interface Driver {
  id: string;
  name: string;
  job: string;
  contactNo: string;
  address: string;
  image?: string;
}

interface BusRental {
  id: string;
  rentalBusAssignmentId?: string;
  customerName: string;
  contactNo: string;
  email: string;
  homeAddress: string;
  validIdType: string;
  validIdNumber: string;
  validIdImage: string | null;
  busType: string;
  bus: string;
  rentalDate: string;
  duration: string;
  distance: string;
  destination: string;
  pickupLocation: string;
  pickupLat?: number;
  pickupLng?: number;
  dropoffLat?: number;
  dropoffLng?: number;
  passengers: number;
  price: number;
  note: string;
  status: 'Not Ready' | 'Ready' | 'Ongoing' | 'Completed';
  assignedDrivers?: { mainDriver: Driver; assistantDriver: Driver };
  readinessDone?: boolean;
  damageCheckDone?: boolean;
  damageData?: { vehicleCondition: Record<string, boolean>; note: string };
}

const ApprovedNotReadyPage: React.FC = () => {
  const [rentals, setRentals] = useState<BusRental[]>([]);
  const [displayedRentals, setDisplayedRentals] = useState<BusRental[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRental, setSelectedRental] = useState<BusRental | null>(null);
  const [showReadinessModal, setShowReadinessModal] = useState(false);
  const [showAssignDriversModal, setShowAssignDriversModal] = useState(false);
  const [showDamageCheckModal, setShowDamageCheckModal] = useState(false);
  const [showRouteMapModal, setShowRouteMapModal] = useState(false);
  const [showCustomerInfoModal, setShowCustomerInfoModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<BusRental | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState<{ sortBy: string }>({
    sortBy: 'created_newest',
  });
  const [activeTab, setActiveTab] = useState<BusRental['status']>('Not Ready');
  const tabs: BusRental['status'][] = ['Not Ready', 'Ready', 'Ongoing', 'Completed'];
  const activeTabIndex = tabs.indexOf(activeTab);

  // --- Fetch and validate data ---
  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchRentalRequestsByStatus('Approved');

      if (!Array.isArray(res)) throw new Error('Invalid API response');

      const mappedData: BusRental[] = res.map((r: any) => {
        // Map first two drivers as mainDriver & assistantDriver
        const drivers = r.RentalBusAssignment?.RentalDrivers ?? [];
        const mainDriver = drivers[0]
          ? { 
              id: drivers[0].DriverID, 
              name: drivers[0].Driver?.DriverName || drivers[0].DriverID, 
              job: '', 
              contactNo: '', 
              address: '' 
            }
          : null;
        const assistantDriver = drivers[1]
          ? { 
              id: drivers[1].DriverID, 
              name: drivers[1].Driver?.DriverName || drivers[1].DriverID, 
              job: '', 
              contactNo: '', 
              address: '' 
            }
          : null;


        // Parse RouteName to extract pickup and dropoff locations
        const parseRouteName = (routeName: string) => {
          if (!routeName) return { pickup: 'N/A', dropoff: 'N/A' };
          
          // Support multiple separators: "to", "→", "->", "-", "—"
          const separators = [' to ', '→', '->', '—', ' - '];
          
          for (const separator of separators) {
            if (routeName.includes(separator)) {
              const parts = routeName.split(separator);
              if (parts.length >= 2) {
                return {
                  pickup: parts[0].trim(),
                  dropoff: parts.slice(1).join(separator).trim() // Handle multiple separators
                };
              }
            }
          }
          
          // If no separator found, return the whole string as pickup
          return { pickup: routeName.trim(), dropoff: 'N/A' };
        };

      const { pickup: pickupName, dropoff: dropoffName } = parseRouteName(r.RouteName || '');
      
      // Parse coordinates for map functionality
      const pickupLat = r.Pickuplatitude ? parseFloat(r.Pickuplatitude) : undefined;
      const pickupLng = r.Pickuplongitude ? parseFloat(r.Pickuplongitude) : undefined;
      const dropoffLat = r.Dropofflatitude ? parseFloat(r.Dropofflatitude) : undefined;
      const dropoffLng = r.Dropofflongitude ? parseFloat(r.Dropofflongitude) : undefined;

      return {
        id: r.RentalRequestID ?? '',
        rentalBusAssignmentId: r.RentalBusAssignmentID ?? undefined,
        customerName: r.CustomerName ?? 'N/A',
        contactNo: r.CustomerContact ?? 'N/A',
        email: r.CustomerEmail ?? 'N/A',
        homeAddress: r.HomeAddress ?? 'N/A',
        validIdType: r.IDType ?? 'N/A',
        validIdNumber: r.IDNumber ?? 'N/A',
        validIdImage: r.IDImageUrl ?? null,
        busType: r.BusType ?? 'N/A',
        bus: r.PlateNumber ?? 'N/A',
        rentalDate: r.RentalDate ? new Date(r.RentalDate).toISOString().split('T')[0] : '',
        duration: r.Duration ? `${r.Duration} day${r.Duration > 1 ? 's' : ''}` : '',
        distance: r.DistanceKM ? `${r.DistanceKM} km` : '',
        destination: dropoffName,
        pickupLocation: pickupName,
        pickupLat: pickupLat,
        pickupLng: pickupLng,
        dropoffLat: dropoffLat,
        dropoffLng: dropoffLng,
        passengers: Number(r.NumberOfPassengers ?? 0),
        price: Number(r.TotalRentalAmount ?? 0),
        note: r.SpecialRequirements ?? '',
        // Determine status based on backend data
        status: (() => {
          const busStatus = r.RentalBusAssignment?.BusAssignment?.Status;
          const hasReadinessChecks = r.RentalBusAssignment?.BusAssignment && (
            r.RentalBusAssignment.BusAssignment.Battery || 
            r.RentalBusAssignment.BusAssignment.Lights ||
            r.RentalBusAssignment.BusAssignment.Oil || 
            r.RentalBusAssignment.BusAssignment.Water ||
            r.RentalBusAssignment.BusAssignment.Brake ||
            r.RentalBusAssignment.BusAssignment.Air ||
            r.RentalBusAssignment.BusAssignment.Gas || 
            r.RentalBusAssignment.BusAssignment.Engine ||
            r.RentalBusAssignment.BusAssignment.TireCondition
          );
          
          if (busStatus === 'Completed') return 'Completed';
          if (busStatus === 'InOperation') return 'Ongoing';
          if (busStatus === 'NotStarted') return hasReadinessChecks ? 'Ready' : 'Not Ready';
          if (busStatus === 'NotReady' && hasReadinessChecks) return 'Ready';
          return 'Not Ready';
        })() as 'Not Ready' | 'Ready' | 'Ongoing' | 'Completed',
        assignedDrivers:
          mainDriver && assistantDriver
            ? { mainDriver, assistantDriver }
            : drivers.length >= 2 
            ? { 
                mainDriver: { 
                  id: drivers[0].DriverID, 
                  name: drivers[0].Driver?.DriverName || drivers[0].DriverID, 
                  job: '', 
                  contactNo: '', 
                  address: '' 
                },
                assistantDriver: { 
                  id: drivers[1].DriverID, 
                  name: drivers[1].Driver?.DriverName || drivers[1].DriverID, 
                  job: '', 
                  contactNo: '', 
                  address: '' 
                }
              }
            : undefined,
        readinessDone: r.RentalBusAssignment?.BusAssignment && (
          r.RentalBusAssignment.BusAssignment.Battery || 
          r.RentalBusAssignment.BusAssignment.Lights ||
          r.RentalBusAssignment.BusAssignment.Oil || 
          r.RentalBusAssignment.BusAssignment.Water ||
          r.RentalBusAssignment.BusAssignment.Brake ||
          r.RentalBusAssignment.BusAssignment.Air ||
          r.RentalBusAssignment.BusAssignment.Gas || 
          r.RentalBusAssignment.BusAssignment.Engine ||
          r.RentalBusAssignment.BusAssignment.TireCondition
        ) || false,
        damageCheckDone: false,
        damageData: r.RentalBusAssignment?.BusAssignment
          ? {
              vehicleCondition: {
                Battery: r.RentalBusAssignment.BusAssignment.Battery ?? false,
                Lights: r.RentalBusAssignment.BusAssignment.Lights ?? false,
                Oil: r.RentalBusAssignment.BusAssignment.Oil ?? false,
                Water: r.RentalBusAssignment.BusAssignment.Water ?? false,
                Brake: r.RentalBusAssignment.BusAssignment.Brake ?? false,
                Air: r.RentalBusAssignment.BusAssignment.Air ?? false,
                Gas: r.RentalBusAssignment.BusAssignment.Gas ?? false,
                Engine: r.RentalBusAssignment.BusAssignment.Engine ?? false,
                TireCondition: r.RentalBusAssignment.BusAssignment.TireCondition ?? false,
              },
              note: r.RentalBusAssignment.BusAssignment.Note ?? '',
            }
          : undefined,
      };
    });

      setRentals(mappedData);
    } catch (err: any) {
      console.error('Error fetching approved rentals:', err);
      Swal.fire('Error', err.message || 'Failed to load approved rentals.', 'error');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // --- FilterDropdown configuration ---
  const filterSections: FilterSection[] = [
    {
      id: 'sortBy',
      title: 'Sort By',
      type: 'radio',
      options: [
        { id: 'name_az', label: 'Customer Name A-Z' },
        { id: 'name_za', label: 'Customer Name Z-A' },
        { id: 'created_newest', label: 'Created (Newest)' },
        { id: 'created_oldest', label: 'Created (Oldest)' },
      ],
      defaultValue: 'created_newest',
    },
  ];

  const handleApplyFilters = (filterValues: Record<string, any>) => {
    setActiveFilters({
      sortBy: filterValues.sortBy || 'created_newest',
    });
    setCurrentPage(1);
  };

  // --- Handle search & filtering logic ---
  useEffect(() => {
    try {
      let filtered = rentals.filter(r => r.status === activeTab);

      if (searchQuery) {
        const lower = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) => r.customerName?.toLowerCase().includes(lower)
        );
      }

      switch (activeFilters.sortBy) {
        case 'name_az':
          filtered.sort((a, b) => a.customerName.localeCompare(b.customerName));
          break;
        case 'name_za':
          filtered.sort((a, b) => b.customerName.localeCompare(a.customerName));
          break;
        default:
          break;
      }

      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      setDisplayedRentals(filtered.slice(start, end));
      setTotalPages(Math.max(Math.ceil(filtered.length / pageSize), 1));
    } catch (err: any) {
      console.error('Error filtering rentals:', err);
      Swal.fire('Error', 'Failed to filter rentals.', 'error');
    }
  }, [rentals, searchQuery, activeFilters, currentPage, pageSize, activeTab]);

  const handleViewCustomerInfo = (rental: BusRental) => {
    setSelectedCustomer(rental);
    setShowCustomerInfoModal(true);
  };

  const handleViewRoute = (rental: BusRental) => {
    if (!rental.pickupLat || !rental.pickupLng || !rental.dropoffLat || !rental.dropoffLng) {
      Swal.fire({
        title: 'No Route Data',
        text: 'Coordinate information is not available for this rental.',
        icon: 'warning',
      });
      return;
    }
    setSelectedRental(rental);
    setShowRouteMapModal(true);
  };

  const handleReadinessCheck = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    setSelectedRental(rental);
    setShowReadinessModal(true);
  };

  const handleAssignDrivers = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    setSelectedRental(rental);
    setShowAssignDriversModal(true);
  };

  const handleDamageCheck = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    
    if (rental.status !== 'Ongoing' && (!rental.assignedDrivers || !rental.readinessDone)) {
      return Swal.fire(
        'Error',
        'Cannot perform damage check before readiness and driver assignment.',
        'warning'
      );
    }
    
    setSelectedRental(rental);
    setShowDamageCheckModal(true);
  };

  const renderStatusBadge = (status: BusRental['status']) => {
    let badgeColor = '';
    switch (status) {
      case 'Not Ready':
        badgeColor = styles.statusNotReady;
        break;
      case 'Ready':
        badgeColor = styles.statusReady || styles.statusNotStarted;
        break;
      case 'Ongoing':
        badgeColor = styles.statusOngoing;
        break;
      case 'Completed':
        badgeColor = styles.statusCompleted || styles.statusOngoing;
        break;
    }
    return <span className={`${styles.statusBadge} ${badgeColor}`}>{status}</span>;
  };

  const handleStatusUpdate = async (rental: BusRental, newStatus: BusRental['status']) => {
    if (!rental) return;

    try {
      setLoading(true);
      
      const token = await fetchBackendToken();
      if (!token) {
        throw new Error('Authentication failed');
      }

      // Debug: Log current rental state
      console.log('🔍 Current rental state:', {
        id: rental.id,
        currentFrontendStatus: rental.status,
        newFrontendStatus: newStatus,
        hasDrivers: !!rental.assignedDrivers,
        readinessDone: rental.readinessDone
      });

      if (rental.status === 'Ongoing' && newStatus === 'Completed') {
        await updateRentalRequest(token, rental.id, {
          command: 'complete'
        });
      } else if (rental.status === 'Ready' && newStatus === 'Ongoing') {
        // Backend is at NotStarted, use the 'toInOperation' command
        
        if (!rental.assignedDrivers?.mainDriver || !rental.assignedDrivers?.assistantDriver) {
          throw new Error('Drivers must be assigned before starting operation');
        }

        console.log('📤 Using toInOperation command to start operation');
        
        // Use the toInOperation command for NotStarted -> InOperation transition
        await updateRentalRequest(token, rental.id, {
          command: 'toInOperation'
        });
      } else {
        let backendStatus = '';
        switch (newStatus) {
          case 'Ongoing':
            backendStatus = 'InOperation';
            break;
          case 'Completed':
            backendStatus = 'Completed';
            break;
          default:
            throw new Error('Invalid status transition');
        }

        const payload: any = {
          busAssignmentUpdates: {
            Status: backendStatus
          }
        };

        if (rental.assignedDrivers?.mainDriver && rental.assignedDrivers?.assistantDriver) {
          payload.drivers = [
            rental.assignedDrivers.mainDriver.id,
            rental.assignedDrivers.assistantDriver.id
          ];
        } else {
          throw new Error('Drivers must be assigned before starting operation');
        }

        console.log('📤 Sending payload:', payload);
        await updateRentalRequest(token, rental.id, payload);
      }

      setRentals((prev) =>
        prev.map((r) => (r.id === rental.id ? { ...r, status: newStatus } : r))
      );

      Swal.fire('Success', `Rental status updated to ${newStatus}.`, 'success');
    } catch (error: any) {
      console.error('❌ Error updating status:', error);
      Swal.fire('Error', error.message || 'Failed to update rental status.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Group rentals by status
  const groupedRentals = {
    'Not Ready': rentals.filter(r => r.status === 'Not Ready'),
    'Ready': rentals.filter(r => r.status === 'Ready'),
    'Ongoing': rentals.filter(r => r.status === 'Ongoing'),
    'Completed': rentals.filter(r => r.status === 'Completed')
  };

  // Get status counts for tab badges
  const statusCounts = {
    'Not Ready': groupedRentals['Not Ready'].length,
    'Ready': groupedRentals['Ready'].length,
    'Ongoing': groupedRentals['Ongoing'].length,
    'Completed': groupedRentals['Completed'].length
  };

  const renderRentalTable = (rentalsToShow: BusRental[]) => (
    <div className={styles.styledTableWrapper}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Contact No.</th>
            <th>Bus Type</th>
            <th>Bus</th>
            <th>Rental Date</th>
            <th>Duration</th>
            <th>Distance</th>
            <th>Destination</th>
            <th>Pickup Location</th>
            <th>Passengers</th>
            <th>Price</th>
            <th>Status</th>
            <th>Drivers</th>
            <th>Customer Info</th>
            <th className={styles.centeredColumn}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rentalsToShow.length > 0 ? (
            rentalsToShow.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.customerName || 'N/A'}</td>
                <td>{rental.contactNo || 'N/A'}</td>
                <td>{rental.busType || 'N/A'}</td>
                <td>{rental.bus || 'N/A'}</td>
                <td>{rental.rentalDate || 'N/A'}</td>
                <td>{rental.duration || 'N/A'}</td>
                <td>{rental.distance || 'N/A'}</td>
                <td>
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      cursor: rental.pickupLat && rental.dropoffLat ? 'pointer' : 'default',
                      color: rental.pickupLat && rental.dropoffLat ? '#3b82f6' : 'inherit'
                    }}
                    onClick={() => rental.pickupLat && rental.dropoffLat && handleViewRoute(rental)}
                    title={rental.pickupLat && rental.dropoffLat ? 'Click to view route on map' : ''}
                  >
                    {rental.destination || 'N/A'}
                    {rental.pickupLat && rental.dropoffLat && ' 🗺️'}
                  </div>
                </td>
                <td>
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      cursor: rental.pickupLat && rental.dropoffLat ? 'pointer' : 'default',
                      color: rental.pickupLat && rental.dropoffLat ? '#3b82f6' : 'inherit'
                    }}
                    onClick={() => rental.pickupLat && rental.dropoffLat && handleViewRoute(rental)}
                    title={rental.pickupLat && rental.dropoffLat ? 'Click to view route on map' : ''}
                  >
                    {rental.pickupLocation || 'N/A'}
                    {rental.pickupLat && rental.dropoffLat && ' 🗺️'}
                  </div>
                </td>
                <td>{rental.passengers ?? 'N/A'}</td>
                <td>₱{rental.price?.toLocaleString() ?? '0'}</td>
                <td>{renderStatusBadge(rental.status)}</td>
                <td>
                  {rental.assignedDrivers
                    ? `${rental.assignedDrivers.mainDriver.name} / ${rental.assignedDrivers.assistantDriver.name}`
                    : '—'}
                </td>
                <td>
                  <button
                    className={styles.noteBtn}
                    onClick={() => handleViewCustomerInfo(rental)}
                  >
                    View Details
                  </button>
                </td>
                <td className={styles.centeredColumn}>
                  {rental.status === 'Not Ready' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleReadinessCheck(rental)}
                      >
                        Readiness Check
                      </button>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleAssignDrivers(rental)}
                      >
                        Assign Drivers
                      </button>
                    </div>
                  )}
                  {rental.status === 'Ready' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleAssignDrivers(rental)}
                      >
                        Reassign Drivers
                      </button>
                      <button
                        className={styles.confirmBtn}
                        disabled={!rental.assignedDrivers || !rental.assignedDrivers.mainDriver || !rental.assignedDrivers.assistantDriver}
                        onClick={() => handleStatusUpdate(rental, 'Ongoing')}
                      >
                        Start Operation
                      </button>
                    </div>
                  )}
                  {rental.status === 'Ongoing' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.confirmBtn}
                        onClick={() => handleStatusUpdate(rental, 'Completed')}
                      >
                        Complete
                      </button>
                    </div>
                  )}
                  {rental.status === 'Completed' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleDamageCheck(rental)}
                      >
                        Damage Check
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={15} className={styles.noRecords}>
                No {activeTab.toLowerCase()} rentals found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Approved Bus Rentals</h2>
        
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <FilterDropdown sections={filterSections} onApply={handleApplyFilters} />
        </div>

        <p className={styles.description}>
          Manage rentals that are approved but in different readiness stages.
        </p>

        {/* Status Tabs */}
        <div className={styles.tabContainer}>
          <div 
            className={styles.tabIndicator}
            style={{
              transform: `translateX(calc(${activeTabIndex * 100}% + ${activeTabIndex * 4}px))`,
              width: `calc(${100 / tabs.length}% - ${4 * (tabs.length - 1) / tabs.length}px)`
            }}
          />
          
          {tabs.map((status) => (
            <button
              key={status}
              className={`${styles.tabButton} ${activeTab === status ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab(status)}
            >
              {status}
              {statusCounts[status] > 0 && (
                <span className={styles.tabBadge}>
                  {statusCounts[status]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.tabContentWrapper}>
          {loading ? (
            <Loading />
          ) : (
            <div className={styles.tabContent} key={activeTab}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {activeTab} Rentals ({displayedRentals.length})
                </h3>
              </div>
              
              {renderRentalTable(displayedRentals)}

              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(size: number) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
        </div>

        {/* Readiness Modal */}
        {showReadinessModal && selectedRental && (
          <ApprovedBusReadinessModal
            show={showReadinessModal}
            onClose={() => setShowReadinessModal(false)}
            busInfo={{
              regularBusAssignmentID: selectedRental.id,
              busNumber: selectedRental.bus,
              driver:
                selectedRental.assignedDrivers?.mainDriver.name || 'Juan Dela Cruz',
            }}
           onSave={async (data) => {
              try {
                setLoading(true);
                
                const token = await fetchBackendToken();
                if (!token) {
                  throw new Error('Authentication failed');
                }

                const payload: any = {
                  busAssignmentUpdates: {
                    Battery: data.vehicleCondition.Battery || false,
                    Lights: data.vehicleCondition.Lights || false,
                    Oil: data.vehicleCondition.Oil || false,
                    Water: data.vehicleCondition.Water || false,
                    Brake: data.vehicleCondition.Brake || false,
                    Air: data.vehicleCondition.Air || false,
                    Gas: data.vehicleCondition.Gas || false,
                    Engine: data.vehicleCondition.Engine || false,
                    TireCondition: data.vehicleCondition.TireCondition || false,
                    Self_Driver: data.personnelCondition.driverReady || false,
                  }
                };

                if (selectedRental.assignedDrivers?.mainDriver && selectedRental.assignedDrivers?.assistantDriver) {
                  payload.drivers = [
                    selectedRental.assignedDrivers.mainDriver.id,
                    selectedRental.assignedDrivers.assistantDriver.id
                  ];
                  // Also update status to NotStarted when readiness is complete and drivers are assigned
                  payload.busAssignmentUpdates.Status = 'NotStarted';
                }

                await updateRentalRequest(token, selectedRental.id, payload);

                setRentals((prev) =>
                  prev.map((r) =>
                    r.id === selectedRental.id
                      ? { 
                          ...r, 
                          readinessDone: true, 
                          status: r.assignedDrivers && r.assignedDrivers.mainDriver && r.assignedDrivers.assistantDriver 
                            ? 'Ready' 
                            : 'Not Ready'
                        }
                      : r
                  )
                );

                setLoading(false);
                setShowReadinessModal(false);
                const hasDrivers = selectedRental.assignedDrivers && 
                                selectedRental.assignedDrivers.mainDriver && 
                                selectedRental.assignedDrivers.assistantDriver;
                
                await Swal.fire(
                  'Success',
                  hasDrivers 
                    ? 'Bus readiness completed! Status changed to Ready.' 
                    : 'Bus readiness completed! Assign drivers to change status to Ready.',
                  'success'
                );
                return true;
              } catch (error: any) {
                console.error('Error updating readiness:', error);
                setLoading(false);
                await Swal.fire('Error', error.message || 'Failed to update readiness.', 'error');
                return false;
              }
            }
          }
          />
        )}

        {/* Assign Drivers Modal */}
        {showAssignDriversModal && selectedRental && (
            <AssignRentalDriverModal
            isOpen={showAssignDriversModal}
            onClose={() => setShowAssignDriversModal(false)}
            busData={{
                busName: selectedRental.bus,
                status: selectedRental.status,
            }}
            rentalDate={selectedRental.rentalDate}
            duration={selectedRental.duration ? parseInt(selectedRental.duration.split(' ')[0]) : undefined}
            onSave={async (assignedDrivers) => {
                try {
                    setLoading(true);
                    
                    const token = await fetchBackendToken();
                    if (!token) {
                        throw new Error('Authentication failed');
                    }

                    // Simple payload: just send drivers array
                    // Backend will handle it appropriately based on current status
                    const payload: any = {
                        drivers: [assignedDrivers.mainDriver.id, assignedDrivers.assistantDriver.id]
                    };

                    // Only add status update if in Not Ready and readiness is done
                    if (selectedRental.status === 'Not Ready' && selectedRental.readinessDone) {
                        payload.busAssignmentUpdates = {
                            Status: 'NotStarted'
                        };
                    }

                    await updateRentalRequest(token, selectedRental.id, payload);

                    setRentals((prev) =>
                        prev.map((r) =>
                            r.id === selectedRental.id
                            ? { 
                                ...r, 
                                assignedDrivers,
                                // Only change status if transitioning from Not Ready with readiness done
                                status: (r.status === 'Not Ready' && r.readinessDone) ? 'Ready' : r.status
                              }
                            : r
                        )
                    );
                    
                    setLoading(false);
                    setShowAssignDriversModal(false);
                    
                    // Dynamic success message
                    const isStatusChanged = selectedRental.status === 'Not Ready' && selectedRental.readinessDone;
                    await Swal.fire(
                      'Success', 
                      isStatusChanged 
                        ? 'Drivers assigned! Status changed to Ready.' 
                        : selectedRental.status === 'Ready'
                        ? 'Drivers reassigned successfully!'
                        : 'Drivers assigned! Complete readiness check to change status to Ready.', 
                      'success'
                    );
                } catch (error: any) {
                    console.error('Error assigning drivers:', error);
                    setLoading(false);
                    await Swal.fire('Error', error.message || 'Failed to assign drivers.', 'error');
                }
            }}
            />
        )}

        {/* Damage Check Modal */}
        {showDamageCheckModal && selectedRental && (
          <DamageCheckModal
            show={showDamageCheckModal}
            onClose={() => setShowDamageCheckModal(false)}
            busInfo={{
              rentalId: selectedRental.id,
              busNumber: selectedRental.bus,
              driver:
                selectedRental.assignedDrivers?.mainDriver.name || 'Juan Dela Cruz',
            }}
            damageData={selectedRental.damageData}
            onSave={async (data) => {
              try {
                setLoading(true);
                
                const token = await fetchBackendToken();
                if (!token) {
                  throw new Error('Authentication failed');
                }

                if (!selectedRental.rentalBusAssignmentId) {
                  throw new Error('RentalBusAssignmentID is missing. Cannot save damage report.');
                }

                await updateRentalRequest(token, selectedRental.id, {
                  rentalRequestUpdates: {
                    damageReport: {
                      vehicleCondition: data.vehicleCondition,
                      note: data.note,
                      checkDate: new Date().toISOString()
                    }
                  }
                });

                setRentals((prev) =>
                  prev.map((r) =>
                    r.id === selectedRental.id
                      ? { ...r, damageCheckDone: true }
                      : r
                  )
                );
                
                setLoading(false);
                setShowDamageCheckModal(false);
                await Swal.fire('Success', 'Damage check saved successfully!', 'success');
                return true;
              } catch (error: any) {
                console.error('Error saving damage check:', error);
                setLoading(false);
                await Swal.fire('Error', error.message || 'Failed to save damage check.', 'error');
                return false;
              }
            }}
          />
        )}

        {/* Route Map Modal */}
        {showRouteMapModal && selectedRental && selectedRental.pickupLat && selectedRental.pickupLng && selectedRental.dropoffLat && selectedRental.dropoffLng && (
          <RouteMapModal
            show={showRouteMapModal}
            onClose={() => setShowRouteMapModal(false)}
            routeData={{
              pickupLocation: selectedRental.pickupLocation,
              pickupLat: selectedRental.pickupLat,
              pickupLng: selectedRental.pickupLng,
              dropoffLocation: selectedRental.destination,
              dropoffLat: selectedRental.dropoffLat,
              dropoffLng: selectedRental.dropoffLng,
              distance: selectedRental.distance
            }}
          />
        )}

        {/* Customer Info Modal */}
        {showCustomerInfoModal && selectedCustomer && (
          <CustomerInfoModal
            show={showCustomerInfoModal}
            onClose={() => setShowCustomerInfoModal(false)}
            customerInfo={{
              customerName: selectedCustomer.customerName,
              email: selectedCustomer.email,
              contact: selectedCustomer.contactNo,
              homeAddress: selectedCustomer.homeAddress,
              validIdType: selectedCustomer.validIdType,
              validIdNumber: selectedCustomer.validIdNumber,
              validIdImage: selectedCustomer.validIdImage,
              note: selectedCustomer.note
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ApprovedNotReadyPage;