<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './lib/pages/Home.svelte';
  import Header from './lib/components/Header.svelte';
    import Color from './lib/pages/Color.svelte';
    import Picker from './lib/pages/Picker.svelte';
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
  <div class="flex-1 w-full mx5 flex justify-center">
    <Route path="/" component={Home} />
    <Route path="/color" component={Color} />
    <Route path="/picker" component={Picker} />
  </div>
</Router>
