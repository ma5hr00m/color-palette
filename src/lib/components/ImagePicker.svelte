<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let canvas;
  let ctx;
  let image = new Image();
  let imageData = null;
  let currRGB = '';
  let currHex = '';
  let isDragging = false;
  let canvasWidth = 800;
  let canvasHeight = 600;
  let scaledWidth, scaledHeight;

  function handleFileUpload(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // @ts-ignore
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function handleFileInput(event) {
    const file = event.target.files[0];
    handleFileUpload(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  image.onload = () => {
    drawImage();
  };

  function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imgAspectRatio = image.width / image.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    if (imgAspectRatio > canvasAspectRatio) {
      scaledWidth = canvasWidth;
      scaledHeight = canvasWidth / imgAspectRatio;
    } else {
      scaledHeight = canvasHeight;
      scaledWidth = canvasHeight * imgAspectRatio;
    }

    const x = (canvasWidth - scaledWidth) / 2;
    const y = (canvasHeight - scaledHeight) / 2;

    ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  }

  function getColor(x, y) {
    const imgX = Math.floor((x / canvasWidth) * scaledWidth);
    const imgY = Math.floor((y / canvasHeight) * scaledHeight);
    
    if (imgX < 0 || imgX >= scaledWidth || imgY < 0 || imgY >= scaledHeight) {
      return;
    }

    const i = (imgY * canvas.width + imgX) * 4;
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const a = imageData[i + 3];

    currRGB = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
    currHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }

  function handleMouseDown(event) {
    isDragging = true;
    const x = event.offsetX;
    const y = event.offsetY;
    getColor(x, y);
  }

  function handleMouseMove(event) {
    if (isDragging) {
      const x = event.offsetX;
      const y = event.offsetY;
      getColor(x, y);
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  onMount(() => {
    ctx = canvas.getContext('2d', { willReadFrequently: true });
  });
</script>

<div class="rela">
  <div 
    role="region" 
    on:drop={handleDrop} 
    on:dragover={handleDragOver} 
    class="relative w-100 h-100 rounded-md bg-white relative cursor-pointer">
    <div class="z-0 absolute left-1/2 top-1/2 translate--1/2 w-90 h-90 rounded-md border-1.5 border-dashed border-gray-3">
      <div class="z-0 absolute left-1/2 top-1/2 translate--1/2 flex flex-col items-center">
        <Icon class="w-14 h-14 color-gray-3" icon="ion:image-sharp" />
        <span class="text-6 color-gray-3">上传图片</span>
      </div>
      <input class="z-1 w-100 h-100 absolute left-1/2 top-1/2 translate--1/2 rounded-md bg-transparent opacity-0 cursor-pointer" type="file" accept="image/*" on:change={handleFileInput} />
    </div>

    <canvas class="z-100 w-full h-full border-1 border-solid border-gray    -2 cursor-crosshair"
            bind:this={canvas} width={canvasWidth} height={canvasHeight}
            on:mousedown={handleMouseDown}
            on:mousemove={handleMouseMove}
            on:mouseup={handleMouseUp}
            on:mouseleave={handleMouseUp}></canvas>
  </div>
  <div class="color-display">
    <p>Selected Color (RGBA): {currRGB}</p>
    <p>Selected Color (Hex): {currHex}</p>
  </div>
</div>

