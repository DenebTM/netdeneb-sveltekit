<script lang="ts">
  export let name: string
  export let target: string | { href: string; external: boolean }
  export let onClick: () => void
  export let index: number

  let href: string = ''
  let external: true | undefined = undefined
  if (typeof target === 'string') {
    href = target
  } else {
    href = target.href
    external = target.external || undefined
  }
</script>

<li class="click-depress" style={`animation-delay: ${(index + 1) * 75}ms`}>
  <a {href} on:click={onClick} data-sveltekit-reload={external}>{name}</a>
</li>
