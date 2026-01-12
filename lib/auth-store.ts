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
 * - Initialization tracking for app bootstrapping
 */
type Listener = () => void;

interface AuthState {
  accessToken: string | null;
  role: string | null;
  tokenVersion: number;
  isInitialized: boolean;
}

const state: AuthState = {
  accessToken: null,
  role: null,
  tokenVersion: 0,
  isInitialized: false,
};

const listeners = new Set<Listener>();
const initCallbacks: (() => void)[] = [];

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

/**
 * In-memory authentication store.
 * 
 * Usage:
 * ```typescript
 * import { authStore } from '@/lib/auth-store';
 * 
 * // Get current state
 * const { accessToken, role, isInitialized } = authStore.get();
 * 
 * // Update state
 * authStore.setAccessToken('eyJhbGci...');
 * authStore.setRole('Admin');
 * 
 * // Mark initialization complete (called by Token_Generation)
 * authStore.markInitialized();
 * 
 * // Wait for initialization before doing auth-dependent actions
 * authStore.onInitialized(() => {
 *   console.log('Auth system ready');
 * });
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
   * Mark authentication system as initialized.
   * Should be called by Token_Generation after refresh attempt completes.
   * Triggers all pending initialization callbacks.
   */
  markInitialized(): void {
    state.isInitialized = true;
    notifyListeners();
    
    // Execute all pending callbacks
    initCallbacks.forEach((callback) => callback());
    initCallbacks.length = 0; // Clear the array
  },

  /**
   * Register a callback to be invoked when auth system is initialized.
   * If already initialized, callback is invoked immediately.
   * 
   * Use this to delay navigation or data fetching until tokens are ready.
   * 
   * @param callback - Function to invoke on initialization
   * 
   * @example
   * ```typescript
   * authStore.onInitialized(() => {
   *   const { accessToken } = authStore.get();
   *   if (accessToken) {
   *     router.push('/dashboard');
   *   } else {
   *     router.push('/login');
   *   }
   * });
   * ```
   */
  onInitialized(callback: () => void): void {
    if (state.isInitialized) {
      // Already initialized - execute immediately
      callback();
    } else {
      // Not yet initialized - queue for later
      initCallbacks.push(callback);
    }
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