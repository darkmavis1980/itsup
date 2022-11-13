<script lang="ts">
  import { onDestroy } from 'svelte';
  import dayjs from 'dayjs'
  import cronstrue from 'cronstrue';
  import type { Job } from '../lib/interfaces/common';
  import { Line } from 'svelte-chartjs'
  import { onMount } from 'svelte';
  import { httpRequest } from '../lib/http';
  import { chartColors } from '../config';
  import { HexToRGB, RGBArrayToString } from '../lib/colours';
  import { homepageStore } from '../stores/homepageStore';

  interface JobLog {
    created_at: string;
    response_time: string;
    jobs_id: number;
  }

  interface ChartDataSet {
    data: any;
    [key: string]: any;
  }

  interface ChartData {
    labels: string[];
    datasets: ChartDataSet[];
  }

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

  let data: ChartData | undefined;
  let jobsList: [Job];

  const fetchData = async () => {
    const { currentFrequency } = $homepageStore;
    const { data: jobs } = await httpRequest.get('jobs');
    jobsList = jobs.map((item: Job) => {
      item.humanCron = cronstrue.toString(item.cron);
      return item;
    });

    const response: {data: [JobLog]} = await httpRequest.get(`jobs/logs?timeframe=${currentFrequency}`);
    data = {
      labels: response.data.filter(point => point.jobs_id === jobsList[0].id).map(({created_at}) => dayjs(created_at).format('HH:mm:ss')),
      datasets: jobsList.map((item, index) => {
        const charColor = RGBArrayToString(HexToRGB(chartColors[index]));
        return {
        label: item.name,
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(184, 185, 210, .3)',
        borderColor: charColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: charColor,
        pointBackgroundColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: response.data.filter(point => point.jobs_id === item.id).map(({response_time}) => response_time)
      }}),
    }
  }

  onMount(async() => {
    console.log($homepageStore);
    await fetchData();
  });

  let unsubscribeHomeStore = homepageStore.subscribe(async () => {
    data = undefined;
    await fetchData();
  });

  onDestroy(unsubscribeHomeStore);
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