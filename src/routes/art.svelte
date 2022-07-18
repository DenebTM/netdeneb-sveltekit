<script lang="ts">
import { setTitle } from '$lib/js/tools'
import Gallery from 'svelte-image-gallery'

export let fileList : ArtList

setTitle('Art gallery')

function test(e: Record<string, any>) {
    const target = e.detail.alt
    if (target)
        window.location.href = target
}
</script>

<style>
    img:not([alt=""]) {
        cursor: pointer;
    }
</style>

<p>Click on an image to go to the artist's page!</p>
<Gallery loading="lazy" hover on:click={test}>
    {#each fileList as { name, artistLink }}
        <img src={`/getfile/art/${name}`} alt={artistLink} />
    {/each}
</Gallery>