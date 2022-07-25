<script lang="ts">
import { setTitle } from '$lib/js/tools'
import Gallery from '$lib/components/Gallery.svelte'

export let imgList : ArtList

setTitle('Art gallery')

function test(e: Record<string, any>) {
    const target = e.detail.alt
    if (target)
        window.location.href = target
}
</script>

<Gallery {imgList} />