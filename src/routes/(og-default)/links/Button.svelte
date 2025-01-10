<script lang="ts">
  export let button: ButtonData
</script>

{#if button.href}
  <a class="button-link click-depress" href={button.href}>
    <img src={button.img} alt={button.alt} />
  </a>
{/if}

<style>
  .button-link {
    display: block;
    margin: 0 0 4px 4px;
  }
  .button-link img {
    display: inline-block;
    vertical-align: top;
    image-rendering: pixelated;
    position: relative;
  }
  .button-link img,
  .button-link img::before {
    width: 88px;
    height: 31px;
    text-align: center;
    overflow: hidden;
  }
  .button-link img::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid var(--primary);
  }

  @media not (prefers-reduced-motion) {
    .button-link:hover {
      animation: rotato 1s infinite linear;
    }
  }
</style>
