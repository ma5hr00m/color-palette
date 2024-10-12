<script>
  import { onMount } from 'svelte';
  import { colorStore } from '../stores/stores';
  import Icon from '@iconify/svelte';
  import Popup from './Popup.svelte';
  import { getPixelRatio, hslToRgb, rgbToHex } from '../utils/palette';

  let selectedColor = 'rgba(255, 0, 0, 1)';
  let hexColor = '#ff0000';
  let canvas;
  let ctx;
  let isDragging = false;
  let offscreenCanvas;
  let offscreenCtx;
  let isHexUpperCase = false;
  let showPopup = false;

  onMount(() => {
    ctx = canvas.getContext('2d', { willReadFrequently: true });
    const ratio = getPixelRatio(ctx);
    canvas.width = 300 * ratio;
    canvas.height = 300 * ratio;

    offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    offscreenCtx = offscreenCanvas.getContext('2d');

    drawColorWheel();
  });

  function drawColorWheel() {
    const radius = offscreenCanvas.width / 2;
    offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    offscreenCtx.beginPath();
    offscreenCtx.arc(radius, radius, radius, 0, Math.PI * 2);
    offscreenCtx.clip();

    const imageData = offscreenCtx.createImageData(offscreenCanvas.width, offscreenCanvas.height);
    const data = imageData.data;

    for (let x = 0; x < offscreenCanvas.width; x++) {
      for (let y = 0; y < offscreenCanvas.height; y++) {
        const dx = x - radius;
        const dy = y - radius;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < radius) {
          const angle = Math.atan2(dy, dx) + Math.PI;
          const hue = (angle / (2 * Math.PI)) * 360;
          const saturation = distance / radius;

          const color = hslToRgb(hue, saturation, 0.5);
          const index = (x + y * offscreenCanvas.width) * 4;
          data[index] = color.r;
          data[index + 1] = color.g;
          data[index + 2] = color.b;
          data[index + 3] = 255;
        }
      }
    }

    offscreenCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(offscreenCanvas, 0, 0);

    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.stroke();
  }

  function handleMouseMove(event) {
    if (isDragging) {
      updateColor(event);
    }
  }

  function handleMouseDown(event) {
    isDragging = true;
    updateColor(event);
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function updateColor(event) {
    const rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) * (canvas.width / rect.width);
    let y = (event.clientY - rect.top) * (canvas.height / rect.height);
    const radius = canvas.width / 2;
    const dx = x - radius;
    const dy = y - radius;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > radius) {
      const angle = Math.atan2(dy, dx);
      x = radius + radius * Math.cos(angle);
      y = radius + radius * Math.sin(angle);
    }

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    selectedColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, 1)`;
    hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

    colorStore.set({ rgbaColor: selectedColor, hexColor: hexColor });
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
      showPopup = true;
      setTimeout(() => {
        showPopup = false;
      }, 2000);
    });
  }

  function toggleHexColorCase() {
    isHexUpperCase = !isHexUpperCase
  }

  $: displayHexColor = isHexUpperCase ? hexColor.toUpperCase() : hexColor.toLowerCase();
</script>

<div class="bg-white shadow-md w-fit p-5vh rounded-md flex flex-col items-center gap-y-4vh">
  <div class="w-30vh h-30vh overflow-hidden rounded-full flex justify-center items-center">
    <canvas 
      bind:this={canvas} 
      class="w-30vh h-30vh cursor-cell rounded-full" 
      on:mousedown={handleMouseDown} 
      on:mousemove={handleMouseMove} 
      on:mouseup={handleMouseUp} 
      on:mouseleave={handleMouseUp}></canvas>
  </div>
  <div class="text-lg color-gray-600 flex flex-col items-center gap-y-2vh">
    <div class="w-22vh text-1.3vh bg-gray-100 py-1vh px-2vh rounded-md flex justify-between items-center">
      <div class="select-none">{selectedColor}</div>
      <div class="flex">
        <button class="cursor-pointer w-4vh h-4vh flex justify-center items-center border-none rounded-md color-gray-500 bg-transparent duration-300 hover:bg-gray-200 hover:color-gray-700" on:click={() => copyToClipboard(selectedColor)}>
          <Icon class="w-1.75vh h-1.75vh" icon="solar:copy-linear" />
        </button>
      </div>
    </div>
    <div class="w-22vh text-1.3vh bg-gray-100 py-1vh px-2vh rounded-md flex justify-between items-center">
      <div class="select-none">{displayHexColor}</div>
      <div class="flex gap-x-.5">
        <button class="cursor-pointer w-4vh h-4vh flex justify-center items-center border-none rounded-md color-gray-500 bg-transparent duration-300 hover:bg-gray-200 hover:color-gray-700"  on:click={toggleHexColorCase}>
          <Icon class="w-1.75vh h-1.75vh" icon="radix-icons:letter-case-capitalize" />
        </button>
        <button class="cursor-pointer w-4vh h-4vh flex justify-center items-center border-none rounded-md color-gray-500 bg-transparent duration-300 hover:bg-gray-200 hover:color-gray-700"  on:click={() => copyToClipboard(displayHexColor)}>
          <Icon class="w-1.75vh h-1.75vh" icon="solar:copy-linear" />
        </button>
      </div>
    </div>
  </div>
</div>

<Popup isOpen={showPopup} onClose={() => showPopup = false}>
  <Icon class="w-2vh h-2vh color-green-500" icon="icon-park-solid:correct" />
  <span class="text-2vh font-400 color-gray-700">複製成功</span>
</Popup>