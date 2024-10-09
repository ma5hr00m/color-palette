<script>
  import { onMount } from 'svelte';
  import { colorStore } from '../stores/stores';
  import Icon from '@iconify/svelte';

  let selectedColor = 'rgba(255, 0, 0, 1)';
  let hexColor = '#ff0000';
  let canvas;
  let ctx;
  let isDragging = false;
  let offscreenCanvas;
  let offscreenCtx;
  let isHexUpperCase = false;

  var getPixelRatio = function(context) {
    var backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
  };

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

  function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = function(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h / 360 + 1 / 3);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, h / 360 - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
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

    colorStore.set({rgbaColor: selectedColor, hexColor: hexColor});
  }

  function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
    });
  }

  function toggleHexColorCase() {
    isHexUpperCase = !isHexUpperCase;
  }

  $: displayHexColor = isHexUpperCase ? hexColor.toUpperCase() : hexColor.toLowerCase();
</script>

<div class="bg-white shadow-md w-fit p10 rounded-md flex flex-col items-center gap-y-8">
  <div class="w-56 h-56 overflow-hidden rounded-full flex justify-center items-center">
    <canvas 
      bind:this={canvas} 
      class="w-80.5 h-80.5 cursor-cell rounded-full" 
      on:mousedown={handleMouseDown} 
      on:mousemove={handleMouseMove} 
      on:mouseup={handleMouseUp} 
      on:mouseleave={handleMouseUp}></canvas>
  </div>
  <div class="text-lg color-gray-6 flex flex-col items-center gap-y-3">
    <div class="w-44 text-3.25 bg-gray-1 py1 px3 rounded-md flex justify-between items-center">
      <div>{selectedColor}</div>
      <div class="flex gap-x-.5">
        <button class="cursor-pointer w-6.5 h-6.5 flex justify-center items-center border-none rounded-md color-gray-5 bg-transparent duration-300 hover:bg-gray-2 hover:color-gray-7" on:click={() => copyToClipboard(selectedColor)}>
          <Icon icon="solar:copy-linear" />
        </button>
      </div>
    </div>
    <div class="w-44 text-3.25 bg-gray-1 py1 px3 rounded-md flex justify-between items-center">
      <div>{displayHexColor}</div>
      <div class="flex gap-x-.5">
        <button class="cursor-pointer w-6.5 h-6.5 flex justify-center items-center border-none rounded-md color-gray-5 bg-transparent duration-300 hover:bg-gray-2 hover:color-gray-7" on:click={toggleHexColorCase}>
          <Icon icon="radix-icons:letter-case-capitalize" />
        </button>
        <button class="cursor-pointer w-6.5 h-6.5 flex justify-center items-center border-none rounded-md color-gray-5 bg-transparent duration-300 hover:bg-gray-2 hover:color-gray-7" on:click={() => copyToClipboard(displayHexColor)}>
          <Icon icon="solar:copy-linear" />
        </button>
      </div>
    </div>
  </div>
</div>

