<script lang="ts">
  export let open = false
</script>

<div class="button" {open}>
  <div class="line top"></div>
  <div class="line mid"></div>
  <div class="line bot"></div>
</div>

<style>
  div {
    width: 30px;
    height: 24px;
  }

  div.line {
    background: var(--text-color);
    width: 100%;
    height: 4px;

    position: absolute;
    left: 0;
  }
  div.line.top {
    top: 0;
  }
  div.line.mid {
    top: 50%;
    transform: translateY(-50%);
  }
  div.line.bot {
    bottom: 0;
  }

  div.line {
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  div[open='true'] div.line.top {
    transform: translateY(12px) rotate(-45deg);
  }
  div[open='true'] div.line.mid {
    width: 0;
    transform: translateX(15px);
  }
  div[open='true'] div.line.bot {
    transform: translateY(-8px) rotate(45deg);
  }
</style>
