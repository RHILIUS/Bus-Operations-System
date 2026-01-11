'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './damage-reports.module.css';
import '../../../../styles/globals.css';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';
import { fetchDamageReports, updateDamageReportStatus, deleteDamageReport } from '@/lib/apiCalls/damage-report';

interface DamageReport {
  DamageReportID: string;
  BusAssignmentID: string | null;
  BusID: string | null;
  BusPlateNumber: string | null;
  RouteName: string | null;
  Status: 'NA' | 'Pending' | 'Accepted' | 'Rejected';
  Note: string | null;
  CheckDate: string;
  CreatedAt: string;
  UpdatedAt: string;
  CreatedBy: string | null;
  UpdatedBy: string | null;
  Battery: boolean;
  Lights: boolean;
  Oil: boolean;
  Water: boolean;
  Brake: boolean;
  Air: boolean;
  Gas: boolean;
  Engine: boolean;
  TireCondition: boolean;
}

const DamageReportsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [damageReports, setDamageReports] = useState<DamageReport[]>([]);
  const [displayedData, setDisplayedData] = useState<DamageReport[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Pending' | 'Accepted' | 'Rejected'>('Pending');
  const tabs: ('Pending' | 'Accepted' | 'Rejected')[] = ['Pending', 'Accepted', 'Rejected'];
  const activeTabIndex = tabs.indexOf(activeTab);

  const filterSections: FilterSection[] = [
    {
      id: 'sortBy',
      title: 'Sort By',
      type: 'radio',
      options: [
        { id: 'date_newest', label: 'Check Date (Newest First)' },
        { id: 'date_oldest', label: 'Check Date (Oldest First)' },
        { id: 'bus_asc', label: 'Bus No. (A-Z)' },
        { id: 'bus_desc', label: 'Bus No. (Z-A)' },
      ],
      defaultValue: 'date_newest'
    },
  ];

  const [activeFilters, setActiveFilters] = useState<{
    sortBy: string;
  }>({
    sortBy: 'date_newest',
  });

  const loadDamageReports = async () => {
    setLoading(true);
    try {
      const data = await fetchDamageReports();
      setDamageReports(data);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error?.message || 'Failed to load damage reports.';
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDamageReports();
  }, []);

  const handleApplyFilters = (filterValues: Record<string, any>) => {
    setActiveFilters({
      sortBy: filterValues.sortBy || 'date_newest',
    });
  };

  useEffect(() => {
    let filtered = [...damageReports];

    // Tab filter (status)
    filtered = filtered.filter(record => record.Status === activeTab);

    // Search filter
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(record =>
        (record.BusID?.toLowerCase().includes(lower)) ||
        (record.BusPlateNumber?.toLowerCase().includes(lower)) ||
        (record.Note?.toLowerCase().includes(lower)) ||
        (record.DamageReportID?.toLowerCase().includes(lower)) ||
        (record.RouteName?.toLowerCase().includes(lower))
      );
    }

    // Sorting
    switch (activeFilters.sortBy) {
      case 'date_newest':
        filtered.sort((a, b) => new Date(b.CheckDate).getTime() - new Date(a.CheckDate).getTime());
        break;
      case 'date_oldest':
        filtered.sort((a, b) => new Date(a.CheckDate).getTime() - new Date(b.CheckDate).getTime());
        break;
      case 'bus_asc':
        filtered.sort((a, b) => (a.BusID || '').localeCompare(b.BusID || ''));
        break;
      case 'bus_desc':
        filtered.sort((a, b) => (b.BusID || '').localeCompare(a.BusID || ''));
        break;
      default:
        break;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedData(filtered.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [damageReports, searchQuery, activeFilters, currentPage, pageSize, activeTab]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getDamageItems = (record: DamageReport) => {
    const damaged = [];
    if (!record.Battery) damaged.push('Battery');
    if (!record.Lights) damaged.push('Lights');
    if (!record.Oil) damaged.push('Oil');
    if (!record.Water) damaged.push('Water');
    if (!record.Brake) damaged.push('Brake');
    if (!record.Air) damaged.push('Air');
    if (!record.Gas) damaged.push('Gas');
    if (!record.Engine) damaged.push('Engine');
    if (!record.TireCondition) damaged.push('Tire Condition');
    
    return damaged.length > 0 ? damaged.join(', ') : 'No damage reported';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NA':
        return <span className={styles.statusNA}>N/A</span>;
      case 'Accepted':
        return <span className={styles.statusAccepted}>Accepted</span>;
      case 'Rejected':
        return <span className={styles.statusRejected}>Rejected</span>;
      case 'Pending':
      default:
        return <span className={styles.statusPending}>Pending</span>;
    }
  };

  const handleAccept = async (damageReportId: string) => {
    const result = await Swal.fire({
      title: 'Accept Damage Report?',
      text: 'This will create a maintenance work order for this damage report.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Accept',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await updateDamageReportStatus(damageReportId, 'Accepted');
        
        await Swal.fire({
          icon: 'success',
          title: 'Accepted',
          text: 'Damage report accepted and maintenance work created.',
          timer: 2000,
          showConfirmButton: false
        });

        // Reload damage reports
        await loadDamageReports();
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || error?.message || 'Failed to accept damage report.';
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    }
  };

  const handleReject = async (damageReportId: string) => {
    const result = await Swal.fire({
      title: 'Reject Damage Report?',
      text: 'This will mark the damage report as rejected.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await updateDamageReportStatus(damageReportId, 'Rejected');

        await Swal.fire({
          icon: 'success',
          title: 'Rejected',
          text: 'Damage report has been rejected.',
          timer: 2000,
          showConfirmButton: false
        });

        // Reload damage reports
        await loadDamageReports();
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || error?.message || 'Failed to reject damage report.';
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    }
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Damage Reports</h2>

        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search damage reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <FilterDropdown
            sections={filterSections}
            onApply={handleApplyFilters}
          />
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <div 
            className={styles.tabIndicator}
            style={{
              transform: `translateX(calc(${activeTabIndex * 100}% + ${activeTabIndex * 4}px))`,
              width: `calc(${100 / tabs.length}% - ${4 * (tabs.length - 1) / tabs.length}px)`
            }}
          />
          
          <button
            className={`${styles.tab} ${activeTab === 'Pending' ? styles.activeTab : ''}`}
            onClick={() => {
              setActiveTab('Pending');
              setCurrentPage(1);
            }}
          >
            Pending
            <span className={styles.tabBadge}>
              {damageReports.filter(r => r.Status === 'Pending').length}
            </span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'Accepted' ? styles.activeTab : ''}`}
            onClick={() => {
              setActiveTab('Accepted');
              setCurrentPage(1);
            }}
          >
            Accepted
            <span className={styles.tabBadge}>
              {damageReports.filter(r => r.Status === 'Accepted').length}
            </span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'Rejected' ? styles.activeTab : ''}`}
            onClick={() => {
              setActiveTab('Rejected');
              setCurrentPage(1);
            }}
          >
            Rejected
            <span className={styles.tabBadge}>
              {damageReports.filter(r => r.Status === 'Rejected').length}
            </span>
          </button>
        </div>

        <p className={styles.description}>
          View all damage reports from bus inspections.
        </p>

        {loading ? (
          <div style={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loading />
          </div>
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Bus No.</th>
                  <th>Plate Number</th>
                  <th>Route</th>
                  <th>Check Date</th>
                  <th>Damaged Items</th>
                  <th>Notes</th>
                  <th>Reported By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((record) => (
                    <tr key={record.DamageReportID}>
                      <td>{record.DamageReportID}</td>
                      <td>{record.BusID || 'N/A'}</td>
                      <td>{record.BusPlateNumber || 'N/A'}</td>
                      <td>{record.RouteName || 'N/A'}</td>
                      <td>{new Date(record.CheckDate).toLocaleDateString()}</td>
                      <td>
                        <span className={getDamageItems(record) === 'No damage reported' ? styles.noDamage : styles.hasDamage}>
                          {getDamageItems(record)}
                        </span>
                      </td>
                      <td>{record.Note || '—'}</td>
                      <td>{record.CreatedBy || 'System'}</td>
                      <td>{getStatusBadge(record.Status)}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          {record.Status === 'NA' ? (
                            <span className={styles.noActionNeeded}>No Action Needed</span>
                          ) : (
                            <>
                              <button 
                                className={styles.acceptBtn}
                                onClick={() => handleAccept(record.DamageReportID)}
                                title="Accept Report"
                                disabled={record.Status !== 'Pending'}
                              >
                                Accept
                              </button>
                              <button 
                                className={styles.rejectBtn}
                                onClick={() => handleReject(record.DamageReportID)}
                                title="Reject Report"
                                disabled={record.Status !== 'Pending'}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className={styles.noRecords}>
                      No damage reports found.
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
          onPageChange={handlePageChange}
          onPageSizeChange={(size: number) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default DamageReportsPage;