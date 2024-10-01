<script lang="ts">
  export let links: SociaList
</script>

<p style="margin: 20px 0 10px 0; font-weight: bold;">
  Feel free to bark at me on:
</p>
<div style="text-align: left; width: fit-content; margin: 0 auto">
  {#each links as { icon, href, text }}
    <a class="click-depress" rel="me" {href}>
      <p>
        <i class={`bx bx-sm ${icon} inline-logo`} />
        <span>{text}</span>
      </p>
    </a>
  {/each}
</div>

<style>
  span {
    margin-left: 5px;
  }
  a {
    text-decoration: none;
  }
  a,
  a p,
  a p * {
    transition: 0.1s ease-in-out;
    border-radius: var(--border-radius);
  }
  a p {
    margin: 0;
    line-height: 2;
    vertical-align: middle;
    padding: 5px;
  }
  a[href]:hover p {
    --text-color: white;
  }
  a[href]:hover p {
    background-color: var(--primary);
  }

  div {
    display: flex;
    gap: 10px;
    justify-content: center;
    max-width: 410px;
    flex-wrap: wrap;
  }

  div > * {
    flex-grow: 0;
    width: max-content;
  }
</style>
