<script>
  import Palette from "../components/Palette.svelte";
  import Wave from "../components/Wave.svelte";
  import { colorStore } from '../stores/stores';
  import { onDestroy } from 'svelte';

  let currentColor;

  const unsubscribe = colorStore.subscribe(value => {
    currentColor = value.hexColor;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="relative w-full">
  <div class="relative z-1">
    <Palette></Palette>
  </div>
  <div class="absolute z-0 left-0 top-0 w-full h-full flex flex-col justify-end">
    <div class="relative w-full h-60 bottom-0">
      <Wave></Wave>
    </div>
    <div class="relative left-0 bottom-0 w-full h-70" style="background-color: {currentColor};"></div>
  </div>
</div>
