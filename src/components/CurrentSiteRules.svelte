<script lang="ts">
  import type { SiteRule } from '../lib/types';

  export let currentSite = '';
  export let rules: SiteRule[] = [];
  export let showInactive = false;

  export let onToggleShowInactive: () => void;
  export let onToggleActive: (ruleId: string, active: boolean) => void;
  export let onAddRule: () => void;
  export let onEditRule: (ruleId: string) => void;
</script>

<section class="card">
  <div class="section-head">
    <h2>Current site rules</h2>
    <button class="plus" on:click={onAddRule} title="Add rule">+</button>
  </div>

  <p class="muted">Site: {currentSite || 'No site found.'}</p>

  <label class="inline-control">
    <input type="checkbox" checked={showInactive} on:change={onToggleShowInactive} />
    Show inactive rules
  </label>

  {#if rules.length === 0}
    <p class="muted">No rule for this site.</p>
  {:else}
    <ul class="list">
      {#each rules as rule}
        <li>
          <div class="row-head">
            <strong>{rule.name}</strong>
            <button class="ghost" on:click={() => onEditRule(rule.id)}>Edit</button>
          </div>
          <label class="inline-control">
            <input
              type="checkbox"
              checked={rule.active}
              on:change={(event) => onToggleActive(rule.id, (event.currentTarget as HTMLInputElement).checked)}
            />
            Active
          </label>
          <p class="muted small">{rule.sites.join(', ')}</p>
        </li>
      {/each}
    </ul>
  {/if}
</section>
