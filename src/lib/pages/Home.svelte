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

<div class="relative w-full flex justify-center">
  <div class="relative w-240 mx20 h-fit mt20 z-1 flex justify-between">
    <div class="flex h-20 items-center gap-x-3">
      <div class="w-18 h-18 rounded-md overflow-hidden shadow-md">
        <img class="w-full h-full" src="https://agu-img.oss-cn-hangzhou.aliyuncs.com/blog2410/avatar.jpg" alt="avatar" />
      </div>
      <hgroup>
        <h1 class="color-gray-8 font-500 my0">阿菇kinoko的調色板</h1>
        <p class="color-gray-5 font-400 text-5 my0">色彩是畫家的語言</p>
      </hgroup>
    </div>
    <div class="">
      <Palette></Palette>
    </div>
  </div>
  <div class="absolute z-0 left-0 top-0 w-full h-full flex flex-col justify-end">
    <div class="relative w-full h-60 bottom-0">
      <Wave></Wave>
    </div>
    <div class="relative left-0 bottom-0 w-full h-70" style="background-color: {currentColor};"></div>
  </div>
</div>
