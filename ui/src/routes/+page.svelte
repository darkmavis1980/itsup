<script lang="ts">
  import Chart from '../components/Chart.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import { FREQUENCY_OPTIONS } from '../config';

</script>

<h2>Activity</h2>
<Dropdown selectName={'frequency'} options={FREQUENCY_OPTIONS} />
<Chart />
