import { normalizeSite } from './config';
import type { SiteRule } from './types';

const STORAGE_KEY = 'siteRules';

type BrowserApi = {
  storage: {
    local: {
      get: (keys: any, cb: (data: any) => void) => void;
      set: (items: any, cb?: () => void) => void;
    };
  };
  tabs?: {
    query: (queryInfo: any, cb: (tabs: Array<{ url?: string }>) => void) => void;
  };
};

function getApi(): BrowserApi | null {
  const globalApi = (globalThis as { browser?: BrowserApi; chrome?: BrowserApi });
  return globalApi.browser ?? globalApi.chrome ?? null;
}

export function getRules(): Promise<SiteRule[]> {
  const api = getApi();
  if (!api) {
    return Promise.resolve([]);
  }

  return new Promise((resolve) => {
    api.storage.local.get({ [STORAGE_KEY]: [] }, (data) => {
      const raw = data[STORAGE_KEY];
      resolve(Array.isArray(raw) ? raw : []);
    });
  });
}

export function setRules(rules: SiteRule[]): Promise<void> {
  const api = getApi();
  if (!api) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    api.storage.local.set({ [STORAGE_KEY]: rules }, () => resolve());
  });
}

export function getCurrentSite(): Promise<string> {
  const api = getApi();
  if (!api?.tabs) {
    return Promise.resolve('');
  }

  return new Promise((resolve) => {
    api.tabs!.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url;
      if (!url) {
        resolve('');
        return;
      }

      try {
        resolve(normalizeSite(new URL(url).hostname));
      } catch {
        resolve('');
      }
    });
  });
}
