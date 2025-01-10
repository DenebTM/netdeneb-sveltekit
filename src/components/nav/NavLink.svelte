<script lang="ts">
  interface Props {
    name: string
    target: NavItem
    onClick: (e?: MouseEvent) => void
    index: number
    isCurrent: boolean
  }

  const { name, target, onClick, index, isCurrent }: Props = $props()
  const { href, external } =
    typeof target === 'string' ? { href: target, external: false } : target
</script>

<li
  {isCurrent}
  class="click-depress"
  style={`animation-delay: ${(index + 1) * 75}ms`}>
  <!-- eslint-disable-next-line @typescript-eslint/no-deprecated -- erroneous warning -->
  <a {href} onclick={onClick} data-sveltekit-reload={external}>{name}</a>
</li>
