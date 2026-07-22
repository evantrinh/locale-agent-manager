export type SiteRule = {
  site: string;
  locale: string;
  userAgent: string;
};

export function normalizeSite(input: string): string {
  const raw = input.trim().toLowerCase();
  if (!raw) {
    return '';
  }

  const noProtocol = raw.replace(/^https?:\/\//, '').replace(/^\*\./, '');
  const host = noProtocol.split('/')[0].split(':')[0].trim();
  return host;
}

export function matchesSite(hostname: string, site: string): boolean {
  if (!hostname || !site) {
    return false;
  }

  return hostname === site || hostname.endsWith(`.${site}`);
}

export function findRuleForHost(hostname: string, rules: SiteRule[]): SiteRule | undefined {
  const host = normalizeSite(hostname);
  return [...rules]
    .sort((a, b) => b.site.length - a.site.length)
    .find((rule) => matchesSite(host, rule.site));
}
