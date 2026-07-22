const api = globalThis.browser ?? globalThis.chrome;
const STORAGE_KEY = 'siteRules';

let rules = [];

function normalizeSite(input) {
  const raw = String(input ?? '').trim().toLowerCase();
  if (!raw) {
    return '';
  }

  const noProtocol = raw.replace(/^https?:\/\//, '').replace(/^\*\./, '');
  return noProtocol.split('/')[0].split(':')[0].trim();
}

function matchesSite(hostname, site) {
  if (!hostname || !site) {
    return false;
  }

  return hostname === site || hostname.endsWith(`.${site}`);
}

function findRule(hostname) {
  const host = normalizeSite(hostname);
  const sortedRules = [...rules].sort((a, b) => b.site.length - a.site.length);
  return sortedRules.find((rule) => matchesSite(host, rule.site));
}

function updateRules() {
  api.storage.local.get({ [STORAGE_KEY]: [] }, (data) => {
    const nextRules = data[STORAGE_KEY];
    rules = Array.isArray(nextRules) ? nextRules : [];
  });
}

updateRules();

api.runtime.onInstalled.addListener(() => {
  updateRules();
});

api.runtime.onStartup.addListener(() => {
  updateRules();
});

api.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes[STORAGE_KEY]) {
    rules = Array.isArray(changes[STORAGE_KEY].newValue) ? changes[STORAGE_KEY].newValue : [];
  }
});

api.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const hostname = new URL(details.url).hostname.toLowerCase();
    const rule = findRule(hostname);

    if (!rule) {
      return {};
    }

    const requestHeaders = details.requestHeaders ?? [];

    if (rule.locale) {
      const localeHeader = requestHeaders.find((header) => header.name.toLowerCase() === 'accept-language');
      if (localeHeader) {
        localeHeader.value = rule.locale;
      } else {
        requestHeaders.push({ name: 'Accept-Language', value: rule.locale });
      }
    }

    if (rule.userAgent) {
      const userAgentHeader = requestHeaders.find((header) => header.name.toLowerCase() === 'user-agent');
      if (userAgentHeader) {
        userAgentHeader.value = rule.userAgent;
      } else {
        requestHeaders.push({ name: 'User-Agent', value: rule.userAgent });
      }
    }

    return { requestHeaders };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders', 'extraHeaders']
);
