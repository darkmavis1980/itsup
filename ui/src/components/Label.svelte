<script lang="ts">
  export let color = '';
</script>
<span class="label {color}">
  <slot />
</span>

<style>
  .label {
    border-radius: 0.25rem;
    padding: 0.25rem 1rem;
    background-color: var(--secondary-color);
    color: white;
    font-weight: 700;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .green {
    background-color: #55a630;
  }

  .red {
    background-color: #d90429;
  }
</style>