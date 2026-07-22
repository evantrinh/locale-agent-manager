export type AgentProfile = {
  userAgent: string;
  platform: string;
  appVersion: string;
  secChUa: string;
  secChUaMobile: string;
  secChUaPlatform: string;
};

export type SiteRule = {
  id: string;
  name: string;
  sites: string[];
  locale: string;
  active: boolean;
  agent: AgentProfile;
};

export type RuleDraft = {
  id: string;
  name: string;
  sitesText: string;
  locale: string;
  active: boolean;
  agent: AgentProfile;
};
