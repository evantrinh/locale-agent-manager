<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { makeRuleFromDraft } from '../lib/config';
  import { agentOptionSets, getLocaleLabel, localeOptions } from '../lib/constants';
  import type { RuleDraft } from '../lib/types';

  export let draft: RuleDraft;
  export let canRemove = false;

  let error = '';
  const dispatch = createEventDispatcher<{
    save: { draft: RuleDraft };
    remove: { id: string };
    close: void;
  }>();

  function saveRule(): void {
    const rule = makeRuleFromDraft(draft);

    if (!rule.name) {
      error = 'Enter a rule name.';
      return;
    }

    if (rule.sites.length === 0) {
      error = 'Enter at least one site.';
      return;
    }

    if (!rule.locale && !Object.values(rule.agent).some(Boolean)) {
      error = 'Set locale or agent values.';
      return;
    }

    error = '';
    dispatch('save', { draft });
  }

  function removeRule(): void {
    dispatch('remove', { id: draft.id });
  }
</script>

<section class="card">
  <h2>Rule editor</h2>

  <label for="rule-name">Rule name</label>
  <input id="rule-name" bind:value={draft.name} />

  <label for="rule-sites">Sites applied</label>
  <input id="rule-sites" bind:value={draft.sitesText} placeholder="site.com, blog.site.com" />

  <label for="rule-locale">Locale language picker</label>
  <input id="rule-locale" list="locale-list" bind:value={draft.locale} placeholder="en-US" />
  <datalist id="locale-list">
    {#each localeOptions as locale}
      <option value={locale.code}>{locale.flag} {locale.code} - {locale.name}</option>
    {/each}
  </datalist>
  {#if draft.locale}
    <p class="muted small">{getLocaleLabel(draft.locale)}</p>
  {/if}

  <label class="inline-control">
    <input type="checkbox" bind:checked={draft.active} />
    Active rule
  </label>

  <h3>Agent manager options</h3>

  <label for="agent-ua">User-Agent</label>
  <input id="agent-ua" list="agent-ua-list" bind:value={draft.agent.userAgent} placeholder="Mozilla/5.0 ..." />
  <datalist id="agent-ua-list">
    {#each agentOptionSets.userAgent as option}
      <option value={option}></option>
    {/each}
  </datalist>

  <label for="agent-platform">Platform</label>
  <input id="agent-platform" list="agent-platform-list" bind:value={draft.agent.platform} placeholder="Win32" />
  <datalist id="agent-platform-list">
    {#each agentOptionSets.platform as option}
      <option value={option}></option>
    {/each}
  </datalist>

  <label for="agent-version">App version</label>
  <input id="agent-version" list="agent-version-list" bind:value={draft.agent.appVersion} placeholder="5.0 (Windows)" />
  <datalist id="agent-version-list">
    {#each agentOptionSets.appVersion as option}
      <option value={option}></option>
    {/each}
  </datalist>

  <label for="agent-ch-ua">Sec-CH-UA</label>
  <input
    id="agent-ch-ua"
    list="agent-ch-ua-list"
    bind:value={draft.agent.secChUa}
    placeholder='"Not/A)Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"'
  />
  <datalist id="agent-ch-ua-list">
    {#each agentOptionSets.secChUa as option}
      <option value={option}></option>
    {/each}
  </datalist>

  <label for="agent-ch-mobile">Sec-CH-UA-Mobile</label>
  <input id="agent-ch-mobile" list="agent-ch-mobile-list" bind:value={draft.agent.secChUaMobile} placeholder="?0" />
  <datalist id="agent-ch-mobile-list">
    {#each agentOptionSets.secChUaMobile as option}
      <option value={option}></option>
    {/each}
  </datalist>

  <label for="agent-ch-platform">Sec-CH-UA-Platform</label>
  <input
    id="agent-ch-platform"
    list="agent-ch-platform-list"
    bind:value={draft.agent.secChUaPlatform}
    placeholder='"Windows"'
  />
  <datalist id="agent-ch-platform-list">
    {#each agentOptionSets.secChUaPlatform as option}
      <option value={option}></option>
    {/each}
  </datalist>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <div class="row-actions">
    <button class="primary" on:click={saveRule}>Save rule</button>
    {#if canRemove}
      <button class="danger" on:click={removeRule}>Remove rule</button>
    {/if}
    <button class="ghost" on:click={() => dispatch('close')}>Close</button>
  </div>
</section>
