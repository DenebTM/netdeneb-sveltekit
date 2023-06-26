<script lang="ts">
  import type { PageData } from './$types'
  import { sitename } from '~/util/globals'
  import Gallery from '~/components/Gallery.svelte'

  export let data: PageData
  $: ({ imgList } = data)
</script>

<svelte:head>
  <title>{`${sitename} - Art gallery`}</title>
</svelte:head>

<Gallery {imgList} />
