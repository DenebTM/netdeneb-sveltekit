<script lang="ts">
import { setTitle } from '$lib/js/tools'
import Gallery from '$lib/components/Gallery.svelte'

export let imgList: ArtList

setTitle('Art gallery')
</script>

<Gallery {imgList} />