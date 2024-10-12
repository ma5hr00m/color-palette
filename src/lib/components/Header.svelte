<script>
  import { Link } from 'svelte-routing';
  import Icon from '@iconify/svelte';
</script>

<header class="w-100vw pt-3vh flex justify-center">
  <div class="w-fit py-1.25vh px-1.75vh bg-white rounded-md shadow-md">
    <nav class="w-fit flex items-center justify-center gap-x-1.5vh text-1.75vh">
      <Link to='/' class='flex items-center justify-center gap-x-.25vh py-.5vh px-1vh rounded-md hover:bg-gray-100 duration-300 color-gray-700 hover:color-purple-700 decoration-none'>
        <Icon class="w-2vh h-2vh" icon="mage:color-picker-fill" />
        主頁
      </Link>
      <Link to='/color' class='flex items-center justify-center gap-x-.25vh py-.5vh px-1vh rounded-md hover:bg-gray-100 duration-300 color-gray-700 hover:color-purple-700 decoration-none'>
        <Icon class="w-2vh h-2vh" icon="solar:pallete-2-bold" />
        色卡
      </Link>
      <!-- <Link to='/picker' class='flex items-center justify-center gap-x-.5 p2 rounded-md hover:bg-gray-1 duration-300 color-gray-7 hover:color-purple-7 decoration-none'>
        <Icon class="w-3.5 h-3.5" icon="ic:round-image" />
        圖片取色
      </Link> -->
    </nav>
  </div>
</header>