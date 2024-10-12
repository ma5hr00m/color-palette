import { writable } from 'svelte/store';

export const colorStore = writable({
  rgbaColor: 'rgba(127, 96, 159, 1)',
  hexColor: '#7f609f'
});

export const colorGroupStore = writable({});