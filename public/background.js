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

function normalizeRule(rawRule, index) {
  if (Array.isArray(rawRule?.sites)) {
    return {
      id: String(rawRule.id ?? `rule-${index}`),
      name: String(rawRule.name ?? `rule-${index}`),
      sites: rawRule.sites.map((site) => normalizeSite(String(site))).filter(Boolean),
      locale: String(rawRule.locale ?? ''),
      active: rawRule.active !== false,
      agent: {
        userAgent: String(rawRule.agent?.userAgent ?? ''),
        platform: String(rawRule.agent?.platform ?? ''),
        appVersion: String(rawRule.agent?.appVersion ?? ''),
        secChUa: String(rawRule.agent?.secChUa ?? ''),
        secChUaMobile: String(rawRule.agent?.secChUaMobile ?? ''),
        secChUaPlatform: String(rawRule.agent?.secChUaPlatform ?? '')
      }
    };
  }

  const legacySite = normalizeSite(String(rawRule?.site ?? ''));
  return {
    id: `legacy-${index}`,
    name: `${legacySite || 'site'} rule #1`,
    sites: legacySite ? [legacySite] : [],
    locale: String(rawRule?.locale ?? ''),
    active: true,
    agent: {
      userAgent: String(rawRule?.userAgent ?? ''),
      platform: '',
      appVersion: '',
      secChUa: '',
      secChUaMobile: '',
      secChUaPlatform: ''
    }
  };
}

function findRule(hostname) {
  const host = normalizeSite(hostname);
  const sortedRules = [...rules]
    .filter((rule) => rule.active)
    .sort((a, b) => {
      const aLen = Math.max(...a.sites.map((site) => site.length), 0);
      const bLen = Math.max(...b.sites.map((site) => site.length), 0);
      return bLen - aLen;
    });

  return sortedRules.find((rule) => rule.sites.some((site) => matchesSite(host, site)));
}

function updateRules() {
  api.storage.local.get({ [STORAGE_KEY]: [] }, (data) => {
    const nextRules = data[STORAGE_KEY];
    const source = Array.isArray(nextRules) ? nextRules : [];
    rules = source.map((rule, index) => normalizeRule(rule, index)).filter((rule) => rule.sites.length > 0);
  });
}

function setOrPushHeader(headers, name, value) {
  if (!value) {
    return;
  }

  const lower = name.toLowerCase();
  const found = headers.find((header) => header.name.toLowerCase() === lower);
  if (found) {
    found.value = value;
    return;
  }

  headers.push({ name, value });
}

updateRules();

api.runtime.onInstalled.addListener(updateRules);
api.runtime.onStartup.addListener(updateRules);

api.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes[STORAGE_KEY]) {
    updateRules();
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

    setOrPushHeader(requestHeaders, 'Accept-Language', rule.locale);
    setOrPushHeader(requestHeaders, 'User-Agent', rule.agent.userAgent);
    setOrPushHeader(requestHeaders, 'Sec-CH-UA', rule.agent.secChUa);
    setOrPushHeader(requestHeaders, 'Sec-CH-UA-Mobile', rule.agent.secChUaMobile);
    setOrPushHeader(requestHeaders, 'Sec-CH-UA-Platform', rule.agent.secChUaPlatform);

    return { requestHeaders };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders', 'extraHeaders']
);
