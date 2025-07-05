<script lang="ts">
  import Gallery from '~/components/Gallery.svelte'
  import { page } from '$app/state'
  import { enableScroll } from '~/util/tools'
  import { afterNavigate } from '$app/navigation'

  const {
    data: { siteMetadata },
  } = page

  import _imageList from './files.json'
  const imageList = _imageList.map(item => {
    return { ...item, fileName: `art/${item.fileName}` }
  })

  afterNavigate(enableScroll)
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - Art gallery`}</title>

  <meta name="og:title" content="Art gallery" />
  <meta property="og:image" content={siteMetadata.titleImage.path} />
  <meta name="og:description" content="My ref, and other commissions I got" />
  <meta name="description" content="My ref, and other commissions I got" />
</svelte:head>

<h2 class="page-title">Commissions i got so far!</h2>

<div class="page-content">
  <Gallery {imageList} />
</div>
