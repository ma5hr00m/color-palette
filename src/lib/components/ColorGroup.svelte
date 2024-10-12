<script>
  import Icon from "@iconify/svelte";
  import Popup from './Popup.svelte';

  export let data = {};

  let showPopup = true;
  
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

<div class="w-full">
  {#each Object.entries(data) as [key, colors]}
    <div class="w-full mb-5vh bg-white p-2vh rounded-md shadow-md">
      <div class="w-full h-6vh flex justify-between p-1.25vh px0 mb-2vh rounded-md"> 
        <div class="h-full px-1vh flex items-center gap-x-1.25vh mb-2">
          <Icon class="color-gray-700 w-2vh h-2vh" icon="zondicons:color-palette" />
          <span class="color-gray-700 text-2vh font-500">{key}</span>
        </div>
        <div>
          <!-- 移除了一些功能 -->
        </div>
      </div>
      <div class="w-full flex justify-center">
        <div class="grid grid-cols-9 gap-1.5vh w-full">
          {#each colors as { name, color }}
            <button 
              class="border-none flex flex-col items-center overflow-hidden py-1vh px-1.5vh rounded-md duration-300 cursor-pointer shadow-sm hover:shadow-md hover:scale-110"
              style="background-color: {color};"
              on:click={() => copyToClipboard(color)}
              >
              <span class="font-400 color-gray-100 text-nowrap">{name}</span>
              <span class="font-400 color-gray-100 text-nowrap">{color}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<Popup isOpen={showPopup} onClose={() => showPopup = false}>
  <Icon class="w-2vh h-2vh color-green-500" icon="icon-park-solid:correct" />
  <span class="text-2vh font-400 color-gray-700">複製成功</span>
</Popup>