<script>
  import Palette from "../components/Palette.svelte";
  import Wave from "../components/Wave.svelte";
  import { colorStore } from '../stores/stores';
  import { onDestroy } from 'svelte';
  import Icon from '@iconify/svelte';

  let currentColor;

  const unsubscribe = colorStore.subscribe(value => {
    currentColor = value.hexColor;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="relative w-full flex justify-center px4">
  <main class="absolute left-50% top-45% translate--1/2 w-full max-w-100vh h-fit z-1 flex justify-between">
    <div class="flex h-8vh items-center gap-x-1.5vh">
      <div class="w-8vh h-8vh rounded-md overflow-hidden shadow-md duration-450 animate-ease-in hover:rounded-[4vh]">
        <img class="w-full h-full select-none" src="https://img.ma5hr00m.top/blog2410/avatar.jpg" alt="avatar" />
      </div>
      <hgroup class="h-9vh select-none flex flex-col justify-between">
        <h1 class="color-gray-800 font-500 text-3.25vh text-nowrap">
          阿菇kinoko的調色板
        </h1>
        <div class="color-gray-500 font-400 text-2.5vh my0 flex items-start gap-x-1vh text-nowrap">
          色彩是畫家的語言
          <div class="flex justify-center items-center" style="color: {currentColor};">
            <Icon class="w-1vh h-1vh" icon="fa-solid:quote-right" />
          </div>
        </div>
      </hgroup>
    </div>
    <div class="">
      <Palette></Palette>
    </div>
  </main>
  
  <div class="absolute z-0 left-0 top-0 w-full h-full flex flex-col justify-end">
    <div class="relative w-full h-fit bottom-0">
      <Wave></Wave>
    </div>
    <div class="relative left-0 bottom-0 w-full h-40vh" style="background-color: {currentColor};"></div>
  </div>
  <footer class="absolute w-full bottom-0 pb-3vh flex justify-center">
    <div>
      <p class="my0 font-400 text-2vh">
        2024 © kinoko, all rights reserved.
      </p>
    </div>
  </footer>
</div>
