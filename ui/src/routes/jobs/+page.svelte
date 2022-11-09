<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import cronstrue from 'cronstrue';
  import type { Job } from '../../lib/interfaces/common';
  import { API_BASEURL } from '../../config';
  import Label from '../../components/Label.svelte';

  let jobs: [Job];

  onMount(async () => {
    const { data } = await axios.get(`${API_BASEURL}jobs`);
    jobs = data.map(item => {
      item.humanCron = cronstrue.toString(item.cron);
      return item;
    });
  });

</script>

<h2>Jobs list</h2>

{#if jobs === undefined}
  <span>No jobs found</span>
{:else}
  <div class="styled-table-container">
    <table class="styled-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Cron</th>
          <th>Url</th>
          <th>Method</th>
        </tr>
      </thead>
      <tbody>
      {#each jobs as job }
        <tr>
          <td>{job.name}</td>
          <td>{job.humanCron}</td>
          <td>{job.url}</td>
          <td><Label>{job.method}</Label></td>
        </tr>
      {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  .styled-table-container {
    border-radius: 0.5rem;
  }

  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    border-radius: 0.5rem;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .styled-table thead {
    border-radius: 0.5rem;
  }

  .styled-table thead tr th{
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  .styled-table thead tr th:first-child {
    border-top-left-radius: 0.5rem;
  }

  .styled-table thead tr th:last-child {
    border-top-right-radius: 0.5rem;
  }

  .styled-table th,
  .styled-table td {
      padding: 12px 15px;
  }

  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  /* .styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  } */
</style>