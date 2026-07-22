<script lang="ts">
  import { onMount } from 'svelte';
  import { normalizeSite, type SiteRule } from './lib/config';

  const api = (globalThis as { browser?: any; chrome?: any }).browser
    ?? (globalThis as { browser?: any; chrome?: any }).chrome;

  let rules: SiteRule[] = [];
  let site = '';
  let locale = '';
  let userAgent = '';
  let error = '';

  function saveRules(nextRules: SiteRule[]): void {
    rules = nextRules;
    api.storage.local.set({ siteRules: rules });
  }

  function loadRules(): void {
    api.storage.local.get({ siteRules: [] as SiteRule[] }, (data: { siteRules: SiteRule[] }) => {
      rules = data.siteRules;
    });
  }

  function saveRule(): void {
    const cleanSite = normalizeSite(site);
    const cleanLocale = locale.trim();
    const cleanUserAgent = userAgent.trim();

    if (!cleanSite) {
      error = 'Enter a site name.';
      return;
    }

    if (!cleanLocale && !cleanUserAgent) {
      error = 'Enter a locale, a user-agent, or both.';
      return;
    }

    error = '';
    const nextRule: SiteRule = {
      site: cleanSite,
      locale: cleanLocale,
      userAgent: cleanUserAgent
    };

    const nextRules = [...rules.filter((rule) => rule.site !== cleanSite), nextRule]
      .sort((a, b) => a.site.localeCompare(b.site));

    saveRules(nextRules);

    site = '';
    locale = '';
    userAgent = '';
  }

  function removeRule(siteName: string): void {
    const nextRules = rules.filter((rule) => rule.site !== siteName);
    saveRules(nextRules);
  }

  onMount(loadRules);
</script>

<main>
  <h1>Locale and User-Agent Manager</h1>
  <p>Set one rule for each site. The rule can set locale, user-agent, or both.</p>

  <label for="site">Site</label>
  <input id="site" bind:value={site} placeholder="example.com" />

  <label for="locale">Locale</label>
  <input id="locale" bind:value={locale} placeholder="en-US,en;q=0.9" />

  <label for="user-agent">User-Agent</label>
  <input id="user-agent" bind:value={userAgent} placeholder="Mozilla/5.0 ..." />

  <button class="primary" on:click={saveRule}>Save rule</button>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <ul>
    {#if rules.length === 0}
      <li>No rule saved.</li>
    {:else}
      {#each rules as rule}
        <li>
          <div class="row"><strong>Site:</strong> {rule.site}</div>
          <div class="row"><strong>Locale:</strong> {rule.locale || '(not set)'}</div>
          <div class="row"><strong>User-Agent:</strong> {rule.userAgent || '(not set)'}</div>
          <button class="remove" on:click={() => removeRule(rule.site)}>Remove rule</button>
        </li>
      {/each}
    {/if}
  </ul>
</main>
