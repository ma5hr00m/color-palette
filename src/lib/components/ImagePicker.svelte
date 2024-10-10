<script>
  import { onMount } from 'svelte';

  let canvas;
  let ctx;
  let image = new Image();
  let imageData = null;
  let currRGB = '';
  let currHex = '';
  let isDragging = false;
  let canvasWidth = 800; // 设置 Canvas 的宽度
  let canvasHeight = 600; // 设置 Canvas 的高度
  let scaledWidth, scaledHeight;

  function handleFileUpload(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    event.preventDefault(); // Prevent default to allow drop
  }

  image.onload = () => {
    drawImage();
  };

  function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 计算缩放比例
    const imgAspectRatio = image.width / image.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    if (imgAspectRatio > canvasAspectRatio) {
      // 图片更宽，按宽度缩放
      scaledWidth = canvasWidth;
      scaledHeight = canvasWidth / imgAspectRatio;
    } else {
      // 图片更高，按高度缩放
      scaledHeight = canvasHeight;
      scaledWidth = canvasHeight * imgAspectRatio;
    }

    // 计算绘制位置，使图片居中
    const x = (canvasWidth - scaledWidth) / 2;
    const y = (canvasHeight - scaledHeight) / 2;

    ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  }

  function getColor(x, y) {
    // 将鼠标坐标转换为图片坐标
    const imgX = Math.floor((x / canvasWidth) * scaledWidth);
    const imgY = Math.floor((y / canvasHeight) * scaledHeight);
    
    // 确保坐标在有效范围内
    if (imgX < 0 || imgX >= scaledWidth || imgY < 0 || imgY >= scaledHeight) {
      return;
    }

    const i = (imgY * canvas.width + imgX) * 4; // 使用画布宽度进行正确索引
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
    ctx = canvas.getContext('2d', { willReadFrequently: true }); // 设置 willReadFrequently 属性
  });
</script>

<style>
  canvas {
    border: 1px solid #ccc;
    cursor: crosshair;
  }
  .color-display {
    margin-top: 10px;
  }
</style>

<div>
  <input type="file" accept="image/*" on:change={handleFileInput} />
  <div 
    on:drop={handleDrop} 
    on:dragover={handleDragOver} 
    style="width: {canvasWidth}px; height: {canvasHeight}px; border: 1px dashed #ccc; position: relative; cursor: pointer;">
    <canvas bind:this={canvas} width={canvasWidth} height={canvasHeight}
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
