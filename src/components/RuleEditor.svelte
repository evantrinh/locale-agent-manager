<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { localeOptions, makeRuleFromDraft } from '../lib/config';
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
      <option value={locale}></option>
    {/each}
  </datalist>

  <label class="inline-control">
    <input type="checkbox" bind:checked={draft.active} />
    Active rule
  </label>

  <h3>Agent manager options</h3>

  <label for="agent-ua">User-Agent</label>
  <input id="agent-ua" bind:value={draft.agent.userAgent} placeholder="Mozilla/5.0 ..." />

  <label for="agent-platform">Platform</label>
  <input id="agent-platform" bind:value={draft.agent.platform} placeholder="Win32" />

  <label for="agent-version">App version</label>
  <input id="agent-version" bind:value={draft.agent.appVersion} placeholder="5.0 (Windows)" />

  <label for="agent-ch-ua">Sec-CH-UA</label>
  <input id="agent-ch-ua" bind:value={draft.agent.secChUa} placeholder='"Chromium";v="126"' />

  <label for="agent-ch-mobile">Sec-CH-UA-Mobile</label>
  <input id="agent-ch-mobile" bind:value={draft.agent.secChUaMobile} placeholder="?0" />

  <label for="agent-ch-platform">Sec-CH-UA-Platform</label>
  <input id="agent-ch-platform" bind:value={draft.agent.secChUaPlatform} placeholder='"Windows"' />

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
