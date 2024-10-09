<script>
  import { Link } from 'svelte-routing';
</script>

<header class="w-100vw pt4 flex justify-center">
  <div class="w-fit py2 px3 bg-white rounded-md shadow-sm">
    <nav class="w-fit flex items-center justify-center gap-x-2 text-3.25">
      <Link to='/' class='p2 rounded-md hover:bg-gray-1 duration-300 color-gray-7 hover:color-purple-7 decoration-none'>主页</Link>
      <Link to='/color' class='p2 rounded-md hover:bg-gray-1 duration-300 color-gray-7 hover:color-purple-7 decoration-none'>色卡</Link>
      <Link to='/picker' class='p2 rounded-md hover:bg-gray-1 duration-300 color-gray-7 hover:color-purple-7 decoration-none'>图片</Link>
    </nav>
  </div>
</header>