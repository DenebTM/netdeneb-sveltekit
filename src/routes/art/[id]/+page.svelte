<script lang="ts">
  import type { PageData } from './$types'
  import Gallery from '~/components/Gallery.svelte'
  import GalleryModal from '~/components/GalleryModal.svelte'
  import { page } from '$app/state'
  import { disableScroll } from '~/util/tools'
  import { afterNavigate } from '$app/navigation'

  const {
    data: { siteMetadata },
  } = page

  interface Props {
    data: PageData
  }

  const { data }: Props = $props()
  const { imgList } = data
  const modalImg = imgList.find(item => item.id === page.params.id) ?? {
    artistLink: '',
    description: '',
    fileName: '',
    full: '',
    height: 0,
    id: '',
    mime: '',
    width: 0,
  }

  afterNavigate(disableScroll)
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - Art gallery`}</title>
</svelte:head>

<h2 class="page-title">Commissions i got so far!</h2>

<div class="page-content">
  <Gallery {imgList} />
  <GalleryModal {modalImg} />
</div>
