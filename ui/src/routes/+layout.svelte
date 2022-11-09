<script lang="ts">
  import '../app.css';
  import Nav from '../components/Nav.svelte';
</script>

<main id="app">
  <Nav />
  <div class="content-wrapper">
    <slot />
  </div>
</main>

<style>
  .content-wrapper {
    max-width: 1280px;
    width: 100%;
  }
</style>