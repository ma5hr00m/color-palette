<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorGroupStore } from '../stores/stores'; 
  import { fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import Popup from '../components/Popup.svelte';
    import ColorGroup from '../components/ColorGroup.svelte';

  let colorData = {};

  const unsubscribe = colorGroupStore.subscribe(value => {
    colorData = value;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="w-full max-w-80vw pt-3vh flex flex-col items-center">
  <ColorGroup data={colorData} />
  
  <footer class="relative w-full bottom-0 pb6 flex justify-center">
    <div>
      <p class="my0 font-300 color-gray-8 text-4">
        2024 © kinoko, all rights reserved.
      </p>
    </div>
  </footer>
</div>


<!-- <Popup isOpen={showPopup} onClose={() => showPopup = false}>
  <Icon class="w-3.25 h-3.25 color-green-500" icon="icon-park-solid:correct" />
  <span class="text-3 font-400 color-gray-7">複製成功</span>
</Popup> -->