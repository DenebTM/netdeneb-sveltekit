<script lang="ts">
  import type { PageData } from './$types'
  import Gallery from '~/components/Gallery.svelte'

  import { page } from '$app/state'
  const {
    data: { siteMetadata },
  } = page

  interface Props {
    data: PageData
  }

  const { data }: Props = $props()
  const { imgList } = $derived(data)
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - Art gallery`}</title>
</svelte:head>

<h2 class="page-title">Commissions i got so far!</h2>

<div class="page-content">
  <Gallery {imgList} artBaseURL="/art" />
</div>
