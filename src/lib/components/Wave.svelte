<script>
  import { colorStore } from '../stores/stores';
  import { onDestroy } from 'svelte';

  let currentColor;

  const unsubscribe = colorStore.subscribe(value => {
    currentColor = value.hexColor;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="page">
  <svg class="waves" viewBox="0 24 150 24" preserveAspectRatio="none">
    <defs>
      <path id="wave" d="M-160 34c30 0 58-10 88-10s58 10 88 10 58-10 88-10 58 10 88 10 v44h-352z" />
    </defs>
    <g>
      <use class="wave" xlink:href="#wave" fill={currentColor} opacity="0.5" x="50" y="0"></use>
      <use class="wave" xlink:href="#wave" fill={currentColor} opacity="0.5" x="50" y="2"></use>
      <use class="wave" xlink:href="#wave" fill={currentColor} opacity="1.0" x="50" y="4"></use>
    </g>
  </svg>
</div>


<style lang="scss">
  .page {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: transparent;

    .waves {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;

      .wave {
        animation: move linear infinite;
        animation-fill-mode: forwards;

        &:nth-child(1) {
          animation-duration: 8s;
          animation-delay: 5s;
        }

        &:nth-child(2) {
          animation-duration: 10s;
          animation-delay: 2s;
        }

        &:nth-child(3) {
          animation-duration: 12s;
          animation-delay: 0s;
        }
      }
    }
  }

  @keyframes move {
    from {
      transform: translate(-90px, 0);
    }
    to {
      transform: translate(70px, 0);
    }
  }
</style>