<script lang="ts">
  import '~/util/styles'

  import { page } from '$app/stores'
  interface Props {
    children?: import('svelte').Snippet
  }

  const { children }: Props = $props()
  const siteMetadata: SiteMetadata = $page.data.siteMetadata
</script>

<svelte:head>
  <title>{siteMetadata.name}</title>

  <meta property="og:image" content={siteMetadata.titleImage.path} />
</svelte:head>

{@render children?.()}
