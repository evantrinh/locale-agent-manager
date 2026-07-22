import { describe, expect, it } from 'vitest';
import { findRuleForHost, normalizeSite, type SiteRule } from '../src/lib/config';

describe('normalizeSite', () => {
  it('removes protocol and path', () => {
    expect(normalizeSite('https://www.example.com/path')).toBe('www.example.com');
  });

  it('removes wildcard prefix', () => {
    expect(normalizeSite('*.example.com')).toBe('example.com');
  });
});

describe('findRuleForHost', () => {
  const rules: SiteRule[] = [
    { site: 'example.com', locale: 'en-US', userAgent: '' },
    { site: 'shop.example.com', locale: 'fr-FR', userAgent: 'agent-a' }
  ];

  it('matches an exact host', () => {
    expect(findRuleForHost('shop.example.com', rules)?.locale).toBe('fr-FR');
  });

  it('matches a parent host when exact match is not set', () => {
    expect(findRuleForHost('blog.example.com', rules)?.locale).toBe('en-US');
  });
});
