import { getBackendBaseURL } from '@/lib/backend';

const MAINTENANCE_WORK_URL = `${getBackendBaseURL()}/api/maintenance-work`;

/**
 * Fetch all maintenance works (optionally filtered by status and/or priority)
 */
export const fetchMaintenanceWorks = async (status?: string, priority?: string) => {
  try {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    
    const url = params.toString() 
      ? `${MAINTENANCE_WORK_URL}?${params.toString()}`
      : MAINTENANCE_WORK_URL;
    
    const res = await fetch(url, {
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to fetch maintenance works');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching maintenance works:', error);
    throw error;
  }
};

/**
 * Update maintenance work details
 */
export const updateMaintenanceWork = async (
  maintenanceWorkId: string,
  data: {
    Status?: string;
    Priority?: string;
    WorkTitle?: string;
    ScheduledDate?: string;
    DueDate?: string;
    CompletedDate?: string;
    EstimatedCost?: number;
    ActualCost?: number;
    WorkNotes?: string;
    AssignedTo?: string;
  }
) => {
  try {
    const res = await fetch(`${MAINTENANCE_WORK_URL}/${maintenanceWorkId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update maintenance work');
    }

    return await res.json();
  } catch (error) {
    console.error('Error updating maintenance work:', error);
    throw error;
  }
};

/**
 * Create a new maintenance work (usually done automatically when accepting damage report)
 */
export const createMaintenanceWork = async (data: {
  damageReportId: string;
  priority?: string;
}) => {
  try {
    const res = await fetch(MAINTENANCE_WORK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create maintenance work');
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating maintenance work:', error);
    throw error;
  }
};