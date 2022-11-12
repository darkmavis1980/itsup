<script lang="ts">
  import { setContext, getContext } from 'svelte';
  import type { DropdownOptions, StoreHomepage, InputEvent } from '../lib/interfaces/common';

  const homepageStore: StoreHomepage = getContext('homepage');

  export let selectName: string;
  export let options: DropdownOptions[] = [{
    label: 'Select an option',
    value: '',
    selected: true,
  }];

  const onChange = ({target}: InputEvent) => {
    setContext('homepage', {
      ...homepageStore,
      currentFrency: target.value,
    })
  }
</script>

<select name={selectName} on:change={onChange}>
  {#if options && options.length > 0}
    {#each options as option}
      <option value={option.value} selected={option.selected}>{option.label}</option>
    {/each}
  {/if}
</select>