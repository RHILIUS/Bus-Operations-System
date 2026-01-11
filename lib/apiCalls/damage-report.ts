import { authenticatedFetch } from '@/lib/authenticatedFetch';
import { getBackendBaseURL } from '@/lib/backend';

const DAMAGE_REPORT_URL = `${getBackendBaseURL()}/api/damage-report`;

/**
 * Fetch all damage reports (optionally filtered by status)
 */
export const fetchDamageReports = async (status?: string) => {
  try {
    const url = status 
      ? `${DAMAGE_REPORT_URL}?status=${encodeURIComponent(status)}`
      : DAMAGE_REPORT_URL;
    
    const res = await authenticatedFetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to fetch damage reports');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching damage reports:', error);
    throw error;
  }
};

/**
 * Update damage report status (Accepted or Rejected)
 * The backend will automatically create MaintenanceWork if status is Accepted
 */
export const updateDamageReportStatus = async (
  damageReportId: string,
  status: 'Accepted' | 'Rejected'
) => {
  try {
    const res = await authenticatedFetch(`${DAMAGE_REPORT_URL}/${damageReportId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update damage report status');
    }

    return await res.json();
  } catch (error) {
    console.error('Error updating damage report status:', error);
    throw error;
  }
};

/**
 * Delete a damage report
 */
export const deleteDamageReport = async (damageReportId: string) => {
  try {
    const res = await authenticatedFetch(`${DAMAGE_REPORT_URL}/${damageReportId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete damage report');
    }

    return await res.json();
  } catch (error) {
    console.error('Error deleting damage report:', error);
    throw error;
  }
};

/**
 * Create a new damage report
 */
export const createDamageReport = async (
  token: string, // Kept for backward compatibility, but not used
  data: {
    RentalRequestID: string;
    RentalBusAssignmentID: string;
    vehicleCondition: Record<string, boolean>;
    note?: string;
    checkDate?: string;
  }
) => {
  try {
    const res = await authenticatedFetch(DAMAGE_REPORT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create damage report');
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating damage report:', error);
    throw error;
  }
};

/**
 * Fetch damage reports for a specific rental request
 */
export const fetchDamageReportsByRentalRequest = async (
  rentalRequestId: string
) => {
  try {
    const url = `${DAMAGE_REPORT_URL}?rentalRequestId=${encodeURIComponent(rentalRequestId)}`;
    const res = await authenticatedFetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to fetch damage reports');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching damage reports:', error);
    throw error;
  }
};