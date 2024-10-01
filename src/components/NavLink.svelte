<script lang="ts">
  export let name: string
  export let target: string | { href: string; external: boolean }
  export let onClick: (e?: MouseEvent) => void
  export let index: number

  export let isCurrent: boolean

  let href: string = ''
  let external: true | undefined = undefined
  if (typeof target === 'string') {
    href = target
  } else {
    href = target.href
    external = target.external || undefined
  }
</script>

<li
  {isCurrent}
  class="click-depress"
  style={`animation-delay: ${(index + 1) * 75}ms`}
>
  <a {href} on:click={onClick} data-sveltekit-reload={external}>{name}</a>
</li>
