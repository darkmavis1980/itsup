<script lang="ts">
  import '../app.css';
  import Nav from '../components/Nav.svelte';
</script>

<main id="app" data-theme="default">
  <Nav />
  <div class="content-wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</main>

<style>
  .content-wrapper {
    max-width: 1280px;
    width: 100%;
    height: 100vh;
  }

  .content {
    padding: 1rem;
  }
</style>