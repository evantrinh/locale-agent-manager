<script lang="ts">
  import CurrentSiteRules from './components/CurrentSiteRules.svelte';
  import RuleEditor from './components/RuleEditor.svelte';
  import {
    getRulesForHost,
    hasRuleValues,
    makeDraftForNewRule,
    makeDraftFromRule,
    makeRuleFromDraft
  } from './lib/config';
  import { getCurrentSite, getRules, setRules } from './lib/storage';
  import type { RuleDraft, SiteRule } from './lib/types';

  let currentSite = '';
  let showInactive = false;
  let rules: SiteRule[] = [];
  let editorDraft: RuleDraft | null = null;
  let isEditMode = false;

  $: currentSiteRules = getRulesForHost(currentSite, rules, showInactive);
  $: allRules = [...rules].sort((a, b) => a.name.localeCompare(b.name));

  async function loadState(): Promise<void> {
    const [site, savedRules] = await Promise.all([getCurrentSite(), getRules()]);
    currentSite = site;
    rules = savedRules;
  }

  async function saveRules(nextRules: SiteRule[]): Promise<void> {
    rules = nextRules;
    await setRules(nextRules);
  }

  function openNewRule(): void {
    editorDraft = makeDraftForNewRule(currentSite, rules);
    isEditMode = false;
  }

  function openEditRule(ruleId: string): void {
    const rule = rules.find((item) => item.id === ruleId);
    if (!rule) {
      return;
    }

    editorDraft = makeDraftFromRule(rule);
    isEditMode = true;
  }

  async function saveRule(event: CustomEvent<{ draft: RuleDraft }>): Promise<void> {
    const nextRule = makeRuleFromDraft(event.detail.draft);
    if (!hasRuleValues(nextRule)) {
      return;
    }

    const otherRules = rules.filter((rule) => rule.id !== nextRule.id);
    const nextRules = [...otherRules, nextRule].sort((a, b) => a.name.localeCompare(b.name));
    await saveRules(nextRules);
    editorDraft = null;
  }

  async function removeRule(event: CustomEvent<{ id: string }>): Promise<void> {
    const nextRules = rules.filter((rule) => rule.id !== event.detail.id);
    await saveRules(nextRules);
    editorDraft = null;
  }

  async function setRuleActive(ruleId: string, active: boolean): Promise<void> {
    const nextRules = rules.map((rule) => (rule.id === ruleId ? { ...rule, active } : rule));
    await saveRules(nextRules);
  }

  function toggleShowInactive(): void {
    showInactive = !showInactive;
  }

  loadState();
</script>

<main>
  <h1>Locale and User-Agent Manager</h1>

  <CurrentSiteRules
    {currentSite}
    rules={currentSiteRules}
    {showInactive}
    onToggleShowInactive={toggleShowInactive}
    onToggleActive={setRuleActive}
    onAddRule={openNewRule}
    onEditRule={openEditRule}
  />

  {#if editorDraft}
    <RuleEditor
      draft={editorDraft}
      canRemove={isEditMode}
      on:save={saveRule}
      on:remove={removeRule}
      on:close={() => (editorDraft = null)}
    />
  {/if}

  <div class="all-rules-label">All rules for all sites</div>

  <section class="card">
    {#if allRules.length === 0}
      <p class="muted">No rule saved.</p>
    {:else}
      <ul class="list">
        {#each allRules as rule}
          <li>
            <div class="row-head">
              <strong>{rule.name}</strong>
              <button class="ghost" on:click={() => openEditRule(rule.id)}>Edit</button>
            </div>
            <p class="muted small">{rule.active ? 'Active' : 'Inactive'}</p>
            <p class="muted small">{rule.sites.join(', ')}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</main>
