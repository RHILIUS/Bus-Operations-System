'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './task-management.module.css';
import '../../../../styles/globals.css';
import ViewTasksModal from '@/components/modal/View-Task-Modal/ViewTasksModal';
import { authenticatedFetch } from '@/lib/authenticatedFetch';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal, LoadingModal, Image } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

const BASE_URL = process.env.NEXT_PUBLIC_Backend_BaseURL?.replace(/['"]/g, "");
const TASK_MANAGEMENT_URL = `${BASE_URL}/api/task-management`;

interface TaskTool {
  TaskToolID?: string;
  ToolID?: string | null;
  QuantityUsed?: number | null;
  Unit?: string | null;
  SourceType?: string | null;
  CostPerUnit?: number | null;
  TotalCost?: number | null;
  Notes?: string | null;
}

interface Task {
  TaskID?: string;
  TaskName: string;
  TaskType: 'Inspection' | 'Repair' | 'Replacement' | 'Cleaning' | 'Testing' | 'Documentation' | null;
  TaskDescription?: string | null;
  AssignedTo: string;
  Status: 'Pending' | 'InProgress' | 'Completed' | 'Cancelled';
  StartDate?: string | null;
  CompletedDate?: string | null;
  EstimatedHours?: number | null;
  ActualHours?: number | null;
  Notes?: string | null;
  ToolsUsed?: TaskTool[];
  isNew?: boolean;
}

interface MaintenanceRecord {
  MaintenanceWorkID: string;
  WorkTitle: string;
  Priority: string;
  Status: string;
  WorkNotes: string;
  DamageReportedBy: string | null;
  BusPlateNumber: string | null;
  Tasks: Task[];
}

const TaskManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceRecord[]>([]);
  const [displayedData, setDisplayedData] = useState<MaintenanceRecord[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    sortBy: string;
    priorityFilter?: string;
    statusFilter?: string;
  }>({
    sortBy: 'work_title_asc'
  });

  // Modal states
  const [showViewTasksModal, setShowViewTasksModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);

  const filterSections: FilterSection[] = [
    {
      id: 'sortBy',
      title: 'Sort By',
      type: 'radio',
      options: [
        { id: 'work_title_asc', label: 'Work Title (A-Z)' },
        { id: 'work_title_desc', label: 'Work Title (Z-A)' },
        { id: 'bus_plate_asc', label: 'Bus Plate (A-Z)' },
        { id: 'bus_plate_desc', label: 'Bus Plate (Z-A)' },
        { id: 'priority_asc', label: 'Priority (Low to High)' },
        { id: 'priority_desc', label: 'Priority (High to Low)' }
      ],
      defaultValue: 'work_title_asc'
    },
    {
      id: 'priorityFilter',
      title: 'Priority',
      type: 'radio',
      options: [
        { id: 'Low', label: 'Low' },
        { id: 'Medium', label: 'Medium' },
        { id: 'High', label: 'High' },
        { id: 'Critical', label: 'Critical' }
      ]
    },
    {
      id: 'statusFilter',
      title: 'Status',
      type: 'radio',
      options: [
        { id: 'Pending', label: 'Pending' },
        { id: 'InProgress', label: 'In Progress' },
        { id: 'Completed', label: 'Completed' },
        { id: 'Cancelled', label: 'Cancelled' }
      ]
    }
  ];

  // Fetch maintenance works from task-management endpoint
  const fetchMaintenanceWorks = async () => {
    setLoading(true);
    try {
      const response = await authenticatedFetch(TASK_MANAGEMENT_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch maintenance works');
      }

      const data: MaintenanceRecord[] = await response.json();
      setMaintenanceData(data);
    } catch (error) {
      console.error('Error fetching maintenance works:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load maintenance works. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenanceWorks();
  }, []);

  const handleApplyFilters = (filterValues: Record<string, any>) => {
    setActiveFilters({
      sortBy: filterValues.sortBy || 'work_title_asc',
      priorityFilter: filterValues.priorityFilter,
      statusFilter: filterValues.statusFilter
    });
  };

  const getPriorityValue = (priority: string): number => {
    const priorityMap: Record<string, number> = {
      'Low': 1,
      'Medium': 2,
      'High': 3,
      'Critical': 4
    };
    return priorityMap[priority] || 0;
  };

  useEffect(() => {
    let filtered = [...maintenanceData];

    // Search filter
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(record =>
        record.WorkTitle?.toLowerCase().includes(lower) ||
        record.BusPlateNumber?.toLowerCase().includes(lower) ||
        record.Priority?.toLowerCase().includes(lower) ||
        record.Status?.toLowerCase().includes(lower) ||
        record.DamageReportedBy?.toLowerCase().includes(lower)
      );
    }

    // Priority filter
    if (activeFilters.priorityFilter) {
      filtered = filtered.filter(record => record.Priority === activeFilters.priorityFilter);
    }

    // Status filter
    if (activeFilters.statusFilter) {
      filtered = filtered.filter(record => record.Status === activeFilters.statusFilter);
    }

    // Sorting
    switch (activeFilters.sortBy) {
      case 'work_title_asc':
        filtered.sort((a, b) => (a.WorkTitle || '').localeCompare(b.WorkTitle || ''));
        break;
      case 'work_title_desc':
        filtered.sort((a, b) => (b.WorkTitle || '').localeCompare(a.WorkTitle || ''));
        break;
      case 'bus_plate_asc':
        filtered.sort((a, b) => (a.BusPlateNumber || '').localeCompare(b.BusPlateNumber || ''));
        break;
      case 'bus_plate_desc':
        filtered.sort((a, b) => (b.BusPlateNumber || '').localeCompare(a.BusPlateNumber || ''));
        break;
      case 'priority_asc':
        filtered.sort((a, b) => getPriorityValue(a.Priority) - getPriorityValue(b.Priority));
        break;
      case 'priority_desc':
        filtered.sort((a, b) => getPriorityValue(b.Priority) - getPriorityValue(a.Priority));
        break;
      default:
        break;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedData(filtered.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [maintenanceData, searchQuery, activeFilters, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewTasks = async (record: MaintenanceRecord) => {
    setSelectedRecord(record);
    setShowViewTasksModal(true);
  };

  const handleUpdateTasks = async (tasks: Task[]) => {
    if (!selectedRecord) return;

    try {
      setLoadingModal(true);

      console.log('Updating tasks for MaintenanceWorkID:', selectedRecord.MaintenanceWorkID);
      console.log('Tasks payload:', tasks);

      // Prepare tasks for backend API
      const tasksPayload = tasks.map(task => ({
        TaskID: task.TaskID,
        TaskName: task.TaskName,
        TaskType: task.TaskType,
        TaskDescription: task.TaskDescription,
        AssignedTo: task.AssignedTo,
        Status: task.Status,
        StartDate: task.StartDate,
        CompletedDate: task.CompletedDate,
        EstimatedHours: task.EstimatedHours,
        ActualHours: task.ActualHours,
        Notes: task.Notes,
        ToolsUsed: task.ToolsUsed || []
      }));

      console.log('Sending PUT request with payload:', {
        Tasks: tasksPayload
      });

      // Use PUT endpoint to update tasks by maintenance work
      const updateResponse = await authenticatedFetch(`${TASK_MANAGEMENT_URL}/${selectedRecord.MaintenanceWorkID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Tasks: tasksPayload
        }),
      });

      console.log('Update response status:', updateResponse.status);
      
      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.error('Update error response:', errorData);
        throw new Error(errorData.error || 'Failed to update tasks');
      }

      const result = await updateResponse.json();
      console.log('Tasks updated successfully:', result);

      // Refresh maintenance data
      await fetchMaintenanceWorks();

      setLoadingModal(false);

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tasks saved successfully!',
      });

      setShowViewTasksModal(false);
      setSelectedRecord(null);
    } catch (error) {
      setLoadingModal(false);
      console.error('Error updating tasks:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to save tasks. Please try again.',
      });
    }
  };

  const handleAddTask = async (task: Omit<Task, 'TaskID'>) => {
    console.log('Add task called:', task);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return styles.statusCompleted;
      case 'InProgress':
        return styles.statusInProgress;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusPending;
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Critical':
      case 'High':
        return styles.priorityHigh;
      case 'Medium':
        return styles.priorityMedium;
      default:
        return styles.priorityLow;
    }
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.pageTitle}>Task Management</h2>

        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search maintenance works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <FilterDropdown
            sections={filterSections}
            onApply={handleApplyFilters}
          />
        </div>

        <p className={styles.description}>
          Manage tasks for maintenance work orders.
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
                  <th>Work Title</th>
                  <th>Bus Plate Number</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Damage Reported By</th>
                  <th>Total Tasks</th>
                  <th className={styles.centeredColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((record) => (
                    <tr key={record.MaintenanceWorkID}>
                      <td>{record.WorkTitle || '—'}</td>
                      <td>{record.BusPlateNumber || '—'}</td>
                      <td>
                        <span className={getPriorityBadgeClass(record.Priority)}>
                          {record.Priority}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusBadgeClass(record.Status)}>
                          {record.Status === 'InProgress' ? 'In Progress' : record.Status}
                        </span>
                      </td>
                      <td>{record.DamageReportedBy || '—'}</td>
                      <td>
                        <span className={styles.taskCount}>
                          {record.Tasks?.length || 0}
                        </span>
                      </td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={`${styles.actionBtn} ${styles.viewTasksBtn}`}
                          onClick={() => handleViewTasks(record)}
                          title="View Tasks"
                        >
                          <Image src="/assets/images/eye-line.png" alt="View Tasks" width={20} height={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className={styles.noRecords}>
                      No maintenance works found.
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

        {/* View Tasks Modal */}
        {selectedRecord && (
          <ViewTasksModal
            show={showViewTasksModal}
            onClose={() => {
              setShowViewTasksModal(false);
              setSelectedRecord(null);
            }}
            workOrder={{
              id: 0,
              work_no: selectedRecord.MaintenanceWorkID,
              work_title: selectedRecord.WorkTitle,
              bus_no: selectedRecord.BusPlateNumber || '',
              priority: selectedRecord.Priority,
              overall_status: selectedRecord.Status === 'InProgress' 
                ? 'In Progress' 
                : selectedRecord.Status === 'Completed' 
                ? 'Done' 
                : 'Pending',
              tasks: selectedRecord.Tasks || [],
              maintenanceWorkId: selectedRecord.MaintenanceWorkID
            }}
            onUpdateTasks={handleUpdateTasks}
            onAddTask={handleAddTask}
          />
        )}

        {loadingModal && <LoadingModal />}
      </div>
    </div>
  );
};

export default TaskManagementPage;