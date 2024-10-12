<script>
  import { fade } from 'svelte/transition';

  export let isOpen = false;
  export let onClose = () => {};
</script>

{#if isOpen}
  <div class="fixed right-2vh top-2vh transform-x--1/2 flex justify-center items-center z-1000">
    <button 
      transition:fade={{ delay: 0, duration: 300 }} 
      class="bg-white border-none py-1vh px-2vh rounded-md shadow-md relative flex items-center justify-center gap-x-.75vh" 
      on:click={onClose}
      aria-label="Close"
    >
      <slot></slot>
    </button>
  </div>
{/if}
