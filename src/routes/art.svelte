<script lang="ts">
import Gallery from '$lib/components/Gallery.svelte'
import { sitename } from '$lib/js/globals'

export let imgList: ArtList
</script>

<svelte:head>
    <title>{ `${sitename} - Art gallery` }</title>
    <meta name="description" content="My ref, and more">
</svelte:head>

<Gallery {imgList} />