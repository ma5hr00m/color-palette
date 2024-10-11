<script>
	import { fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';
	import Popup from '../components/Popup.svelte';

  const colors = [
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 
    'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 
    'violet', 'purple', 'fuchsia', 'pink', 'rose', 'gray', 
    'neutral', 'stone'
  ];
  
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  let showHex = true;
  let hexUpperCase = false;
	let showPopup = false;

  function getColorValues(color, shade) {
    const className = `bg-${color}-${shade}`;
    const element = document.createElement('div');
    element.className = className;
    document.body.appendChild(element);
    const rgbColor = getComputedStyle(element).backgroundColor;
    document.body.removeChild(element);
    return {
      hex: rgbToHex(rgbColor),
      rgba: rgbToRgba(rgbColor)
    };
  }

  function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    return result ? `#${((1 << 24) + (result[0] << 16) + (result[1] << 8) + +result[2]).toString(16).slice(1)}` : '';
  }

  function rgbToRgba(rgb) {
    const result = rgb.match(/\d+/g);
    return result ? `rgba(${result[0]}, ${result[1]}, ${result[2]}, 1)` : '';
  }

  function toggleColorDisplay() {
    showHex = !showHex;
  }

  function toggleHexCase() {
    hexUpperCase = !hexUpperCase;
  }

  function copyToClipboard(colorValue) {
    navigator.clipboard.writeText(colorValue).then(() => {
			showPopup = true;
      setTimeout(() => {
        showPopup = false;
      }, 2000);
    }).catch(err => {
      console.error('複製失敗 ', err);
    });
  }
</script>

<!-- <Hard></Hard> -->
<div class="w-full flex flex-col items-center px24 pt5">
  <div class="w-full max-w-1140px mx8 flex justify-between bg-white py2 px4 mb4 rounded-md shadow-md">
    <div class="w-full flex items-center gap-x-1">
      <Icon class="color-gray-7 w-5 h-5" icon="mage:color-swatch-fill" />
      <span class="text-3.75 color-gray-7 select-none">UnoCSS 預設色彩</span>
    </div>
    <div class="h-full w-fit flex items-center gap-x-2">
      <button class="cursor-pointer w-8 h-8 flex justify-center items-center border-none rounded-md color-gray-5 bg-gray-1 duration-300 hover:bg-gray-2 hover:color-gray-7" on:click={toggleColorDisplay}>
        {#if showHex}
          <Icon class="w-3.25 h-3.25" icon="tabler:letter-h" />
        {:else}
          <Icon class="w-3.25 h-3.25" icon="tabler:letter-r" />
        {/if}
      </button>
      <button class="cursor-pointer w-8 h-8 flex justify-center items-center border-none rounded-md color-gray-5 bg-gray-1 duration-300 hover:bg-gray-2 hover:color-gray-7" on:click={toggleHexCase}>
        <Icon class="w-4 h-4" icon="radix-icons:letter-case-capitalize" />
      </button>
    </div>
  </div>
  <div class="w-full max-w-1180px mx8 mx4 overflow-hidden flex flex-wrap justify-center gap-3 pt1 pb10">
		{#each colors as color}
			{#each shades as shade, index}
				{#if shade !== 0}
					<button 
						class={`group border-none color-gray-8 shadow-md w-30 h-10 rounded-md cursor-pointer bg-${color}-${shade} text-2 flex flex-col items-center justify-center gap-y-.5 duration-300 hover:scale-110`}
						on:click={() => copyToClipboard(showHex ? (hexUpperCase ? getColorValues(color, shade).hex.toUpperCase() : getColorValues(color, shade).hex) : getColorValues(color, shade).rgba)}
						aria-label={`已複製 ${showHex ? (hexUpperCase ? getColorValues(color, shade).hex.toUpperCase() : getColorValues(color, shade).hex) : getColorValues(color, shade).rgba}`}
						transition:fade={{ duration: 3000, delay: index * 50 }}
					>
						<span class={`${shade >= 100 && shade <= 400 ? 'color-gray-8' : 'color-gray-1'} select-none text-3`}>{color}-{shade}</span>
						<span class={`${shade >= 100 && shade <= 400 ? 'color-gray-8' : 'color-gray-1'} select-none text-2.5 duration-300 animate-ease-in group-hover:opacity-100 group-hover:blur-0`} id="color">{showHex ? (hexUpperCase ? getColorValues(color, shade).hex.toUpperCase() : getColorValues(color, shade).hex) : getColorValues(color, shade).rgba}</span>
					</button>
				{/if}
			{/each}
		{/each}
	</div>
	
	<footer class="relative w-full bottom-0 pb6 flex justify-center">
		<div>
			<p class="my0 font-300 color-gray-8 text-4">
				2024 © kinoko, all rights reserved.
			</p>
		</div>
	</footer>
</div>

<Popup isOpen={showPopup} onClose={() => showPopup = false}>
  <Icon class="w-3.25 h-3.25 color-green-500" icon="icon-park-solid:correct" />
  <span class="text-3 font-400 color-gray-7">複製成功</span>
</Popup>