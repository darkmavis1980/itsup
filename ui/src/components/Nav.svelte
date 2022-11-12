<script lang="ts">
  import { BASE_URL } from '../config';
</script>

<sidenav>
  <h1>It's up!</h1>
  <ul>
    <li><a href="{BASE_URL}/">Home</a></li>
    <li><a href="{BASE_URL}/jobs">Jobs</a></li>
  </ul>
</sidenav>

<style>
  sidenav {
    background-color: var(--primary-color);
  }

  h1 {
    font-size: 1.5rem;
    padding: 1rem 1.25rem;
    color: var(--background-color);
  }

  ul {
    list-style-type: none;
    padding: 0 1.25rem;
  }

  li {
    padding: 0;
  }

  li > a {
    border-bottom: 1px solid var(--background-color);
    padding: 0.5rem 0;
    display: block;
  }

</style>