import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// When no VITE_BASE44_APP_ID is set (plain `npm run dev`), run in "local mode":
// the storefront works with its built-in product data and no backend is needed.
export const isLocalMode = !appId;

const unavailable = (what) => () =>
  Promise.reject(Object.assign(new Error(`${what} is unavailable in local mode`), { status: 401 }));

const localStub = {
  app: {
    getPublicSettings: () => Promise.resolve({ id: 'local', public_settings: {} }),
  },
  auth: {
    me: unavailable('Auth'),
    isAuthenticated: () => Promise.resolve(false),
    setToken: () => {},
    logout: () => {},
    redirectToLogin: () => {},
    loginWithProvider: unavailable('Social login'),
    resetPasswordRequest: unavailable('Password reset'),
    resetPassword: unavailable('Password reset'),
  },
};

export const base44 = isLocalMode
  ? localStub
  : createClient({
      appId,
      token,
      functionsVersion,
      serverUrl: '',
      requiresAuth: false,
      appBaseUrl,
    });
