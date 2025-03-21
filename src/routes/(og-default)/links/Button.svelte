<script lang="ts">
  export let button: ButtonData
</script>

{#if button.href}
  <a class="button88 click-depress" href={button.href}>
    <img src={button.img} alt={button.alt} />
  </a>
{:else if button.img}
  <div class="button88">
    <img src={button.img} alt={button.alt} />
  </div>
{/if}

<style>
  .button88 {
    display: block;
    margin: 0 0 4px 4px;
  }
  .button88 img {
    display: inline-block;
    vertical-align: top;
    image-rendering: pixelated;
    position: relative;
  }
  .button88 img,
  .button88 img::before {
    width: 88px;
    height: 31px;
    text-align: center;
    overflow: hidden;
  }
  .button88 img::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid var(--primary);
  }

  @media not (prefers-reduced-motion) {
    .button88:hover {
      animation: rotato 1s infinite linear;
    }
  }
</style>
