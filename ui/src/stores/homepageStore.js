import { writable } from 'svelte/store';

export let homepageStore = writable({
  currentFrequency: '3h',
});
