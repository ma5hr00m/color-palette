<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './lib/pages/Home.svelte';
  import Palette from './lib/components/Palette.svelte';
  import Header from './lib/components/Header.svelte';
</script>

<Router>
  <Header></Header>
  <div class="flex-1 w-full mx5 flex justify-center">
    <Route path="/" component={Home} />
    <Route path="/picker" component={Palette} />
    <Route path="/picker" component={Palette} />
  </div>
</Router>
