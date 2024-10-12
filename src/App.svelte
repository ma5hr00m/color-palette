<script>
	import { colorGroupStore } from './lib/stores/stores.js';
  import { onMount } from 'svelte';
  import { loadYaml } from './lib/utils/loadYaml.js';
  import { Router, Route } from 'svelte-routing';
  import Home from './lib/pages/Home.svelte';
  import Header from './lib/components/Header.svelte';
  import Color from './lib/pages/Color.svelte';
  import Icon from '@iconify/svelte';
  // import Picker from './lib/pages/Picker.svelte';
  import Test from './lib/pages/Test.svelte';

  let colorGroup = {};

  onMount(async () => {
    colorGroup = await loadYaml('color.yaml');
    colorGroupStore.set(colorGroup);
    colorGroupStore.subscribe(value => {
      console.log('Color Group Store:', value);
    });
  });
</script>

<svelte:head>
  <title>阿菇的調色板</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="阿菇" />
  <meta name="keywords" content="svelte, color, picker, palette" />
  <meta name="description" content="阿菇的調色板是一個使用 Svelte 打造的網頁應用程式，提供了多種調色功能，包括色卡、圖片取色等" />
  <link rel="icon" type="image/png" href="https://peiseka.com/favicon.png" />
</svelte:head>

<Router>
  <Header></Header>
  <div class="flex-1 w-full mx5 hidden md:flex justify-center">
    <Route path="/" component={Home} />
    <Route path="/color" component={Color} />
    <!-- <Route path="/picker" component={Picker} /> -->
    <Route path="/test" component={Test} />
  </div>
  <div class="flex-1 w-full mx5 flex md:hidden items-center justify-center">
    <div class="flex justify-center items-center gap-x-1 p4 bg-white shadow-md rounded-md">
      <Icon class="color-gray-7 w-4.5 h-4.5" icon="akar-icons:question" />
      <span class="color-gray-7 text-3.25">什么场景下需要在移动端使用色卡？</span>
    </div>
  </div>
</Router>
