<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Home from './lib/pages/Home.svelte';
  import Palette from './lib/components/Palette.svelte';
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/picker">Color Picker</Link>
  </nav>
  
  <Route path="/" component={Home} />
  <Route path="/picker" component={Palette} />
</Router>
