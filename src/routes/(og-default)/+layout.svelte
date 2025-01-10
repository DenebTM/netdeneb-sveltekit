<script lang="ts">
  import '~/util/styles'
  import type { Snippet } from 'svelte'
  import { page } from '$app/state'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()
  const {
    data: { siteMetadata },
  } = page
</script>

<svelte:head>
  <title>{siteMetadata.name}</title>

  <meta property="og:image" content={siteMetadata.titleImage.path} />
</svelte:head>

{@render children?.()}
