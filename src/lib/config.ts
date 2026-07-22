import type { AgentProfile, RuleDraft, SiteRule } from './types';

export function normalizeSite(input: string): string {
  const raw = input.trim().toLowerCase();
  if (!raw) {
    return '';
  }

  const noProtocol = raw.replace(/^https?:\/\//, '').replace(/^\*\./, '');
  return noProtocol.split('/')[0].split(':')[0].trim();
}

export function parseSites(input: string): string[] {
  const set = new Set(
    input
      .split(/[\n, ]+/)
      .map((part) => normalizeSite(part))
      .filter(Boolean)
  );

  return [...set];
}

export function matchesSite(hostname: string, site: string): boolean {
  if (!hostname || !site) {
    return false;
  }

  return hostname === site || hostname.endsWith(`.${site}`);
}

export function getRulesForHost(hostname: string, rules: SiteRule[], includeInactive = false): SiteRule[] {
  const host = normalizeSite(hostname);
  return rules
    .filter((rule) => includeInactive || rule.active)
    .filter((rule) => rule.sites.some((site) => matchesSite(host, site)))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function findRuleForHost(hostname: string, rules: SiteRule[]): SiteRule | undefined {
  const host = normalizeSite(hostname);
  return [...rules]
    .filter((rule) => rule.active)
    .sort((a, b) => longestSiteLength(b.sites) - longestSiteLength(a.sites))
    .find((rule) => rule.sites.some((site) => matchesSite(host, site)));
}

function longestSiteLength(sites: string[]): number {
  return sites.reduce((max, site) => Math.max(max, site.length), 0);
}

export function makeRuleId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createDefaultRuleName(currentSite: string, rules: SiteRule[]): string {
  const site = normalizeSite(currentSite) || 'site';
  const sameSiteCount = rules.filter((rule) => rule.sites.includes(site)).length;
  return `${site} rule #${sameSiteCount + 1}`;
}

export function emptyAgentProfile(): AgentProfile {
  return {
    userAgent: '',
    platform: '',
    appVersion: '',
    secChUa: '',
    secChUaMobile: '',
    secChUaPlatform: ''
  };
}

export function makeDraftForNewRule(currentSite: string, rules: SiteRule[]): RuleDraft {
  const site = normalizeSite(currentSite);
  return {
    id: makeRuleId(),
    name: createDefaultRuleName(site, rules),
    sitesText: site,
    locale: '',
    active: true,
    agent: emptyAgentProfile()
  };
}

export function makeDraftFromRule(rule: SiteRule): RuleDraft {
  return {
    id: rule.id,
    name: rule.name,
    sitesText: rule.sites.join(', '),
    locale: rule.locale,
    active: rule.active,
    agent: { ...rule.agent }
  };
}

export function makeRuleFromDraft(draft: RuleDraft): SiteRule {
  return {
    id: draft.id,
    name: draft.name.trim(),
    sites: parseSites(draft.sitesText),
    locale: draft.locale.trim(),
    active: draft.active,
    agent: {
      userAgent: draft.agent.userAgent.trim(),
      platform: draft.agent.platform.trim(),
      appVersion: draft.agent.appVersion.trim(),
      secChUa: draft.agent.secChUa.trim(),
      secChUaMobile: draft.agent.secChUaMobile.trim(),
      secChUaPlatform: draft.agent.secChUaPlatform.trim()
    }
  };
}

export function hasRuleValues(rule: SiteRule): boolean {
  return Boolean(rule.locale || hasAgentValues(rule.agent));
}

function hasAgentValues(agent: AgentProfile): boolean {
  return Boolean(
    agent.userAgent
    || agent.platform
    || agent.appVersion
    || agent.secChUa
    || agent.secChUaMobile
    || agent.secChUaPlatform
  );
}
