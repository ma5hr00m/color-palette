import { writable } from 'svelte/store';

export const colorStore = writable({
  rgbaColor: 'rgba(255, 0, 0, 1)',
  hexColor: '#ff0000'
});