<script lang="ts" context="module">
export const load: Load = async ({ error, props, url }) => {
    console.log(url)
    console.log(error)
    return { status: 200, props }
}
</script>
<script lang="ts">
import { setTitle } from '$lib/js/tools'
import Gallery from '$lib/components/Gallery.svelte'
import type { Load } from '@sveltejs/kit';

export let imgList: ArtList

setTitle('Art gallery')
</script>

<Gallery {imgList} />