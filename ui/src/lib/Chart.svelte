<script lang="ts">
  import axios from 'axios';
  import dayjs from 'dayjs'
  import { Line } from 'svelte-chartjs'
  import { onMount } from 'svelte';

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  let data;

  onMount(async() => {
    const response = await axios.get('http://localhost:7879/jobs/logs?timeframe=1h');
    data = {
      labels: response.data.map(({created_at}) => dayjs(created_at).format('hh:mm:ss')),
      datasets: [{
        label: 'Response Time',
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(184, 185, 210, .3)',
        borderColor: 'rgb(35, 26, 136)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(35, 26, 136)',
        pointBackgroundColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: response.data.map(({response_time}) => response_time)
      }]
    }
    
  });
  console.log(data)
</script>

<div class="chart">
  {#if data === undefined}
    <span>Loading...</span>
  {:else}
    <Line
      data={data}
      width={700}
      height={300}
      options={{ maintainAspectRatio: false }}
    />
  {/if}
</div>