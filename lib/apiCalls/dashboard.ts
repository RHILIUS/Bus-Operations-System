import { DASHBOARD_URL } from '@/lib/urls';

export interface MonthlyData {
  month: number;
  year: number;
  data: number[];
}

export interface MonthlyDataWithPrevious extends MonthlyData {
  previous?: MonthlyData;
}

export interface BusStatus {
  NotStarted: number;
  NotReady: number;
  InOperation: number;
  InRental?: number;
}

export interface DashboardSummary {
  earnings: MonthlyDataWithPrevious;
  rentalEarnings?: MonthlyDataWithPrevious;
  busStatus: BusStatus;
  topRoutes: { [routeName: string]: number };
}

interface ApiResponse {
  earnings: {
    operations: MonthlyDataWithPrevious;
    rentals: MonthlyDataWithPrevious;
  };
  busStatus: BusStatus;
  topRoutes: { [routeName: string]: number };
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(DASHBOARD_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard summary: ${response.statusText}`);
  }

  const data: ApiResponse = await response.json();
  
  // Transform API response to match component expectations
  return {
    earnings: data.earnings.operations,
    rentalEarnings: data.earnings.rentals,
    busStatus: {
      NotStarted: data.busStatus.NotStarted || 0,
      NotReady: data.busStatus.NotReady || 0,
      InOperation: data.busStatus.InOperation || 0,
      InRental: data.busStatus.InRental || 0,
    },
    topRoutes: data.topRoutes || {},
  };
}