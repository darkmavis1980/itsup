<script lang="ts">
  import { homepageStore } from '../stores/homepageStore';
  import type { DropdownOptions, InputEvent } from '../lib/interfaces/common';

  export let selectName: string;
  export let options: DropdownOptions[] = [{
    label: 'Select an option',
    value: '',
    selected: true,
  }];

  const onChange = ({target}: InputEvent) => {
    homepageStore.update(store => {
      store.currentFrequency = target.value;
      return store;
    });
  }
</script>

<select name={selectName} on:change={onChange}>
  {#if options && options.length > 0}
    {#each options as option}
      <option value={option.value} selected={option.selected}>{option.label}</option>
    {/each}
  {/if}
</select>