<script>
  import { Link, useLocation } from 'svelte-routing';

  export let to;
  export let activeClass = 'active';
  export let inactiveClass = '';

  const location = useLocation();
  // @ts-ignore
  const isActive = () => location.pathname === to;
</script>

<a
  href={to}
  class={isActive() ? activeClass : inactiveClass}
>
  <slot />
</a>

<style>
  .active {
    color: red;
  }
</style>