<script lang="ts">
import Gallery from '$lib/components/Gallery.svelte'
import { sitename } from '$lib/js/globals'

export let imgList: ArtList
</script>

<svelte:head>
    <title>{ `${sitename} - Art gallery` }</title>
</svelte:head>

<Gallery {imgList} />