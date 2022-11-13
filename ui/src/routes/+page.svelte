<script lang="ts">
  import { homepageStore } from '../stores/homepageStore';
  import Chart from '../components/Chart.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import { FREQUENCY_OPTIONS } from '../config';
  import type { InputEvent } from '../lib/interfaces/common';

  const onChange = ({target}: InputEvent) => {
    homepageStore.update(store => {
      store.currentFrequency = target.value;
      return store;
    });
  }
</script>

<h2>Activity</h2>
<Dropdown selectName={'frequency'} options={FREQUENCY_OPTIONS} onChange={onChange} />
<Chart />
