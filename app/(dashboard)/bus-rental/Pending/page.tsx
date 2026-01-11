'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './pending.module.css';
import '../../../../styles/globals.css';
import { Loading, FilterDropdown, PaginationComponent, Swal } from '@/shared/imports';
import { FilterSection } from '@/components/ui/FilterDropDown/FilterDropdown';
import { fetchRentalRequestsByStatus, updateRentalRequest } from '@/lib/apiCalls/rental-request';
import { sendEmail } from '@/lib/apiCalls/send-email';
import { fetchBackendToken } from '@/lib/backend';
import RouteMapModal from '@/components/modal/Route-Map-Modal/RouteMapModal';
import CustomerInfoModal from '@/components/modal/Customer-Info-Modal/CustomerInfoModal';
import PaymentEmailModal from '@/components/modal/Payment-Email-Modal/PaymentEmailModal';

interface BusRental {
  id: string;
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
  status: string;
}

const PendingRentalPage: React.FC = () => {
  const [rentals, setRentals] = useState<BusRental[]>([]);
  const [displayedRentals, setDisplayedRentals] = useState<BusRental[]>([]);
  const [selectedRental, setSelectedRental] = useState<BusRental | null>(null);
  const [showRouteMapModal, setShowRouteMapModal] = useState(false);
  const [showCustomerInfoModal, setShowCustomerInfoModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<BusRental | null>(null);
  const [showPaymentEmailModal, setShowPaymentEmailModal] = useState(false);
  const [rentalForEmail, setRentalForEmail] = useState<BusRental | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState<{ sortBy: string }>({
    sortBy: 'created_newest',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchRentalRequestsByStatus('Pending');

        if (!Array.isArray(data)) {
          throw new Error('Invalid response format from server.');
        }

        const mappedData: BusRental[] = data.map((r: any) => {


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
            status: r.Status ?? 'Pending',
          };
        });

        setRentals(mappedData);
      } catch (err: any) {
        console.error('Error fetching rentals:', err);
        Swal.fire('Error', err.message || 'Failed to load rentals.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    try {
      let filtered = [...rentals];

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
  }, [rentals, searchQuery, activeFilters, currentPage, pageSize]);

  const handleApprove = async (id: string) => {
    const rental = rentals.find((r) => r.id === id);
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');

    if (rental.status !== 'Pending') {
      return Swal.fire('Error', 'Rental is not pending.', 'warning');
    }

    setRentalForEmail(rental);
    setShowPaymentEmailModal(true);
  };

  const handleSendPaymentEmail = async (emailContent: string) => {
    if (!rentalForEmail) return;

    try {
      setLoading(true);
      
      const token = await fetchBackendToken();
      if (!token) {
        throw new Error('Authentication failed');
      }

      // Send payment instructions email
      await sendEmail(token, {
        to: rentalForEmail.email,
        subject: 'Bus Rental Request Approved - Payment Instructions',
        html: emailContent,
      });

      // Approve the rental request
      await updateRentalRequest(token, rentalForEmail.id, { command: 'approve' });

      // Remove from local state since it's no longer pending
      setRentals((prev) => prev.filter((r) => r.id !== rentalForEmail.id));
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'The rental has been approved and payment instructions have been sent to the customer.',
        confirmButtonColor: '#10b981'
      });

      setShowPaymentEmailModal(false);
      setRentalForEmail(null);
    } catch (error: any) {
      console.error('Error approving rental:', error);
      Swal.fire('Error', error.message || 'Failed to approve rental request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleViewNote = (note?: string) => {
    Swal.fire({
      title: 'Rental Note',
      text: note || 'No note provided.',
      icon: 'info',
    });
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

  const handleViewCustomerInfo = (rental: BusRental) => {
    setSelectedCustomer(rental);
    setShowCustomerInfoModal(true);
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Pending Bus Rental Requests</h2>

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
          Review and approve valid rental requests that have passed automatic vicinity validation. Rejected requests (outside service area) are automatically filtered out.
        </p>

        {loading ? (
          <Loading />
        ) : (
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
                  <th className={styles.centeredColumn}>Customer Info</th>
                  <th className={styles.centeredColumn}>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedRentals.length > 0 ? (
                  displayedRentals.map((rental) => (
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
                      <td className={styles.centeredColumn}>
                        <button
                          className={styles.noteBtn}
                          onClick={() => handleViewCustomerInfo(rental)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={styles.approveBtn}
                          onClick={() => handleApprove(rental.id)}
                        >
                          Approve & Send Payment Info
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13} className={styles.noRecords}>
                      No pending rentals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

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

      {showPaymentEmailModal && rentalForEmail && (
        <PaymentEmailModal
          show={showPaymentEmailModal}
          onClose={() => {
            setShowPaymentEmailModal(false);
            setRentalForEmail(null);
          }}
          onSendEmail={handleSendPaymentEmail}
          customerEmail={rentalForEmail.email}
          rentalDetails={{
            customerName: rentalForEmail.customerName,
            busType: rentalForEmail.busType,
            busName: rentalForEmail.bus,
            rentalDate: new Date(rentalForEmail.rentalDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            duration: rentalForEmail.duration,
            distance: rentalForEmail.distance,
            pickupLocation: rentalForEmail.pickupLocation,
            destination: rentalForEmail.destination,
            passengers: rentalForEmail.passengers,
            totalPrice: rentalForEmail.price
          }}
        />
      )}
    </div>
  );
};

export default PendingRentalPage;