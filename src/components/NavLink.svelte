<script lang="ts">
  interface Props {
    name: string
    target: string | { href: string; external: boolean }
    onClick: (e?: MouseEvent) => void
    index: number
    isCurrent: boolean
  }

  let { name, target, onClick, index, isCurrent }: Props = $props()

  let href: string = $state('')
  let external: true | undefined = $state(undefined)
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
  style={`animation-delay: ${(index + 1) * 75}ms`}>
  <a {href} onclick={onClick} data-sveltekit-reload={external}>{name}</a>
</li>
