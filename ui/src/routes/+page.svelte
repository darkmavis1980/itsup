<script lang="ts">
  import { setContext } from 'svelte';
  import Chart from '../components/Chart.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import { FREQUENCY_OPTIONS } from '../config';

  const homepageStore = {
    currentFrequency: '3h',
  }
  setContext('homepage', homepageStore);
</script>

<h2>Activity</h2>
<Dropdown selectName={'frequency'} options={FREQUENCY_OPTIONS} />
<Chart />
