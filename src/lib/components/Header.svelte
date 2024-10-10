<script>
  import { Link } from 'svelte-routing';
  import Icon from '@iconify/svelte';
</script>

<header class="w-100vw pt4 flex justify-center">
  <div class="w-fit py2 px3 bg-white rounded-md shadow-md">
    <nav class="w-fit flex items-center justify-center gap-x-2 text-3.25">
      <Link to='/' class='flex items-center justify-center gap-x-.5 p2 rounded-md hover:bg-gray-1 duration-300 color-gray-7 hover:color-purple-7 decoration-none'>
        <Icon class="w-3.5 h-3.5" icon="mage:color-picker-fill" />
        主頁
      </Link>
      <Link to='/color' class='flex items-center justify-center gap-x-.5 p2 rounded-md hover:bg-gray-1 duration-300 color-gray-7 hover:color-purple-7 decoration-none'>
        <Icon class="w-3.5 h-3.5" icon="solar:pallete-2-bold" />
        色卡
      </Link>
      <Link to='/picker' class='flex items-center justify-center gap-x-.5 p2 rounded-md hover:bg-gray-1 duration-300 color-gray-7 hover:color-purple-7 decoration-none'>
        <Icon class="w-3.5 h-3.5" icon="ic:round-image" />
        圖片取色
      </Link>
    </nav>
  </div>
</header>