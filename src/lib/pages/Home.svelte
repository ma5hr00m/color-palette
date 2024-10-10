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

<div class="relative w-full flex justify-center">
  <main class="relative w-240 mx20 h-fit mt20 z-1 flex justify-between">
    <div class="flex h-20 items-center gap-x-3">
      <div class="w-18 h-18 rounded-md overflow-hidden shadow-md duration-450 animate-ease-in hover:rounded-[2.25rem]">
        <img class="w-full h-full select-none" src="https://agu-img.oss-cn-hangzhou.aliyuncs.com/blog2410/avatar.jpg" alt="avatar" />
      </div>
      <hgroup class="select-none">
        <h1 class="color-gray-8 font-500 my0 text-nowrap">
          阿菇kinoko的調色板
        </h1>
        <div class="color-gray-5 font-400 text-5 my0 flex items-start gap-x-1 text-nowrap">
          色彩是畫家的語言
          <div class="flex justify-center items-center" style="color: {currentColor};">
            <Icon class="w-2" icon="fa-solid:quote-right" />
          </div>
        </div>
      </hgroup>
    </div>
    <div class="">
      <Palette></Palette>
    </div>
  </main>
  <div class="absolute z-0 left-0 top-0 w-full h-full flex flex-col justify-end">
    <div class="relative w-full h-60 bottom-0">
      <Wave></Wave>
    </div>
    <div class="relative left-0 bottom-0 w-full h-60" style="background-color: {currentColor};"></div>
  </div>
  <footer class="absolute w-full bottom-0 pb4 flex justify-center">
    <div>
      <span class="font-300 text-4">
        2024 © kinoko, all rights reserved.
      </span>
    </div>
  </footer>
</div>
