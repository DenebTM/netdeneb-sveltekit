<script lang="ts">
  interface Props {
    target: NavTarget
    onClick: (e?: MouseEvent) => void
    index: number
    isCurrent: boolean
  }

  const { target, onClick, index, isCurrent }: Props = $props()
  const { title, href, external } = target
</script>

<li
  {isCurrent}
  class="click-depress"
  style={`animation-delay: ${(index + 1) * 75}ms`}>
  <!-- eslint-disable-next-line @typescript-eslint/no-deprecated -- erroneous warning -->
  <a
    {href}
    onclick={onClick}
    rel={external ? 'external' : undefined}
    data-sveltekit-preload-code="hover"
    data-sveltekit-preload-data="hover">
    {title}
  </a>
</li>
