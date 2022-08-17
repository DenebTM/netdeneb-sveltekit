<script lang="ts">
import type { PageData } from './$types'
import { sitename } from '$lib/js/globals'
import Gallery from '$lib/components/Gallery.svelte'

export let data: PageData
$: ({ imgList } = data)
</script>

<svelte:head>
    <title>{ `${sitename} - Art gallery` }</title>
</svelte:head>

<Gallery {imgList} />