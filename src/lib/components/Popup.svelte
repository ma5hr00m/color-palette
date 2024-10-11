<script>
  import { fade } from 'svelte/transition';

  export let isOpen = false;
  export let onClose = () => {};
</script>

{#if isOpen}
  <div class="fixed right-4 top-4 transform-x--1/2 flex justify-center items-center z-1000">
    <button 
      transition:fade={{ delay: 0, duration: 300 }} 
      class="bg-white border-none py2 px4 rounded-md shadow-md relative flex items-center justify-center gap-x-1.5" 
      on:click={onClose}
      aria-label="Close"
    >
      <slot></slot>
    </button>
  </div>
{/if}
