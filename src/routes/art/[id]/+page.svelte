<script lang="ts">
  import type { PageData } from './$types'
  import Gallery from '~/components/Gallery.svelte'
  import GalleryImageViewer from '~/components/GalleryImageViewer.svelte'
  import { page } from '$app/state'
  import { disableScroll } from '~/util/tools'
  import { getContext, onMount } from 'svelte'

  const {
    data: { siteMetadata },
  } = page

  interface Props {
    data: PageData
  }

  const { data }: Props = $props()
  const { imageList, image } = data

  const context: AppContext = getContext('shared-state')
  context.modal = imageView

  onMount(disableScroll)
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - Art gallery`}</title>
</svelte:head>

<h2 class="page-title">Commissions i got so far!</h2>

<div class="page-content">
  <Gallery {imageList} />
</div>

{#snippet imageView()}
  <GalleryImageViewer {image} />
{/snippet}
