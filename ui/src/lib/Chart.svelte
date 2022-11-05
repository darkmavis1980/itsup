<script lang="ts">
  import axios from 'axios';
  import { Line } from 'svelte-chartjs'
  import { onMount } from 'svelte';
  
  let chartData;

  onMount(async() => {
    const { data } = await axios.get('http://localhost:7879/jobs/list');
    chartData = {
      labels: data.map(({created_at}) => created_at),
      datasets: [{
        data: data.map(({response_time}) => response_time)
      }]
    }
  });
  
</script>

<div class="chart">
  {#if chartData === undefined}
    <span>Loading...</span>
  {:else}
    <Line
      data={chartData}
      width={100}
      height={50}
      options={{ maintainAspectRatio: false }}
    />
  {/if}
</div>