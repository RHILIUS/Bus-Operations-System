/**
 * In-memory authentication state store for web-ems.
 * 
 * Security: No persistence to localStorage/sessionStorage.
 * State is cleared on page refresh and restored via silent refresh.
 * 
 * Features:
 * - Subscriber pattern for React integration
 * - Type-safe accessors
 * - Zero dependencies
 */
type Listener = () => void;

interface AuthState {
  accessToken: string | null;
  role: string | null;
  tokenVersion: number;
}

const state: AuthState = {
  accessToken: null,
  role: null,
  tokenVersion: 0,
};

const listeners = new Set<Listener>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

/**
 * In-memory authentication store.
 * 
 * Usage:
 * ```typescript
 * import { authStore } from '@/auth/auth-store';
 * 
 * // Get current state
 * const { accessToken, role } = authStore.get();
 * 
 * // Update state
 * authStore.setAccessToken('eyJhbGci...');
 * authStore.setRole('Admin');
 * 
 * // Subscribe to changes (for React hooks)
 * const unsubscribe = authStore.subscribe(() => {
 *   console.log('Auth state changed');
 * });
 * ```
 */
export const authStore = {
  /**
   * Get current authentication state.
   * @returns Current state object
   */
  get(): AuthState {
    return state;
  },

  /**
   * Set access token and notify subscribers.
   * @param token - JWT access token or null to clear
   */
  setAccessToken(token: string | null): void {
    state.accessToken = token;
    state.tokenVersion++;
    notifyListeners();
  },

  /**
   * Set user role and notify subscribers.
   * @param role - User role string or null to clear
   */
  setRole(role: string | null): void {
    state.role = role;
    notifyListeners();
  },

  /**
   * Clear all authentication state.
   */
  clear(): void {
    state.accessToken = null;
    state.role = null;
    state.tokenVersion++;
    notifyListeners();
  },

  /**
   * Subscribe to state changes.
   * @param listener - Callback invoked on state changes
   * @returns Unsubscribe function
   */
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};