<script lang="ts">
  import type { DropdownOptions } from '../lib/interfaces/common';

  export let selectName: string;
  export let onChange = (e: any) => {};
  export let options: DropdownOptions[] = [{
    label: 'Select an option',
    value: '',
    selected: true,
  }];
</script>

<select name={selectName} on:change={onChange} class="dropdown">
  {#if options && options.length > 0}
    {#each options as option}
      <option value={option.value} selected={option.selected}>{option.label}</option>
    {/each}
  {/if}
</select>

<style>
  .dropdown {
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
</style>