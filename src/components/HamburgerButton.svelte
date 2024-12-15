<script lang="ts">
  interface Props {
    open?: boolean
  }

  const { open = false }: Props = $props()
</script>

<div class="open-nav-button" {open}>
  <div class="open-nav-line top"></div>
  <div class="open-nav-line mid"></div>
  <div class="open-nav-line bot"></div>
</div>

<style>
  .open-nav-button {
    width: 30px;
    height: 24px;

    position: relative;
  }

  .open-nav-line {
    background: var(--text-color);
    width: 100%;
    height: 4px;

    position: absolute;
    left: 0;
  }
  .open-nav-line.top {
    top: 0;
  }
  .open-nav-line.mid {
    top: 50%;
    transform: translateY(-50%);
  }
  .open-nav-line.bot {
    bottom: 0;
  }

  .open-nav-button[open='true'] .open-nav-line.top {
    transform: translateY(12px) rotate(-45deg);
  }
  .open-nav-button[open='true'] .open-nav-line.mid {
    width: 0;
    transform: translateX(15px);
  }
  .open-nav-button[open='true'] .open-nav-line.bot {
    transform: translateY(-8px) rotate(45deg);
  }

  @media not (prefers-reduced-motion) {
    .open-nav-line {
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
</style>
