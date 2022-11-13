<script lang="ts">
  export let label: string;
  export let name: string;
</script>

<div class="field">
  <label for={name}>{label}</label>
  <slot />
</div>

<style>
  .field {
    width: 100%;
    max-width: 400px;
    display: block;
  }

  .field label {
    width: 100%;
    display: block;
  }
</style>