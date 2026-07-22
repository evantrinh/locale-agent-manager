import { describe, expect, it } from 'vitest';
import {
  createDefaultRuleName,
  findRuleForHost,
  getRulesForHost,
  normalizeSite,
  parseSites
} from '../src/lib/config';
import type { SiteRule } from '../src/lib/types';

const baseRule: SiteRule = {
  id: 'r1',
  name: 'example.com rule #1',
  sites: ['example.com'],
  locale: 'en-US',
  active: true,
  agent: {
    userAgent: '',
    platform: '',
    appVersion: '',
    secChUa: '',
    secChUaMobile: '',
    secChUaPlatform: ''
  }
};

describe('normalizeSite', () => {
  it('removes protocol and path', () => {
    expect(normalizeSite('https://www.example.com/path')).toBe('www.example.com');
  });

  it('removes wildcard prefix', () => {
    expect(normalizeSite('*.example.com')).toBe('example.com');
  });
});

describe('parseSites', () => {
  it('creates a clean unique site list', () => {
    expect(parseSites('example.com, blog.example.com example.com')).toEqual([
      'example.com',
      'blog.example.com'
    ]);
  });
});

describe('findRuleForHost', () => {
  it('returns active exact match first', () => {
    const rules: SiteRule[] = [
      {
        ...baseRule,
        id: 'r2',
        name: 'shop rule',
        sites: ['shop.example.com'],
        locale: 'fr-FR'
      },
      { ...baseRule }
    ];

    expect(findRuleForHost('shop.example.com', rules)?.locale).toBe('fr-FR');
  });

  it('skips inactive rules', () => {
    const rules: SiteRule[] = [
      { ...baseRule, id: 'r3', active: false, locale: 'de-DE' }
    ];

    expect(findRuleForHost('example.com', rules)).toBeUndefined();
  });
});

describe('getRulesForHost', () => {
  it('filters inactive rules by default', () => {
    const rules: SiteRule[] = [
      { ...baseRule },
      { ...baseRule, id: 'r4', name: 'inactive', active: false }
    ];

    expect(getRulesForHost('example.com', rules).map((rule) => rule.id)).toEqual(['r1']);
  });

  it('can include inactive rules', () => {
    const rules: SiteRule[] = [
      { ...baseRule },
      { ...baseRule, id: 'r4', name: 'inactive', active: false }
    ];

    expect(getRulesForHost('example.com', rules, true).length).toBe(2);
  });
});

describe('createDefaultRuleName', () => {
  it('uses site and count', () => {
    const rules: SiteRule[] = [{ ...baseRule }, { ...baseRule, id: 'r5' }];
    expect(createDefaultRuleName('example.com', rules)).toBe('example.com rule #3');
  });
});
