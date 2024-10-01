<script lang="ts">
  import type { PageData } from './$types'
  import { sitename } from '~/util/globals'
  import Gallery from '~/components/Gallery.svelte'

  export let data: PageData
  $: ({ imgList, artBaseURL } = data)
</script>

<svelte:head>
  <title>{`${sitename} - Art gallery`}</title>
</svelte:head>

<h2>My character reference and commissions i got so far!</h2>

<Gallery {imgList} {artBaseURL} />
