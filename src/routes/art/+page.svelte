<script lang="ts">
  import type { PageData } from './$types'
  import Gallery from '~/components/Gallery.svelte'

  import { page } from '$app/stores'
  const {
    data: { siteMetadata },
  } = $page

  interface Props {
    data: PageData
  }

  const { data }: Props = $props()
  const { imgList, artBaseURL } = $derived(data)
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - Art gallery`}</title>
</svelte:head>

<h2 class="page-title">Commissions i got so far!</h2>

<div class="page-content">
  <Gallery {imgList} {artBaseURL} />
</div>

<style global>
  /* ugly fix for hamburger button overlapping gallery-modal */
  :has(:global(div.gallery-modal)) .open-nav {
    z-index: 0;
  }
</style>
