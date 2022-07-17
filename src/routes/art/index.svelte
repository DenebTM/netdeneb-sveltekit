<!-- leaving this here for future reference
<script lang="ts" context="module">
import type { Load } from '@sveltejs/kit';

export const load : Load = async ({ params, fetch, session, props }) => {
    for (const file of props.fileList) {
        console.log(await (await (await fetch(`/art/${file}`)).blob()).text())
    }
    
    return {
        props: {
            rrr: 'rrr'
        }
    }
}

</script> -->

<script lang="ts">
import { beginNavigation, finishNavigation, setTitle } from '$lib/js/tools'
import Gallery from 'svelte-image-gallery'

export let fileList : ArtList

beginNavigation()
setTitle('Art gallery')
finishNavigation()

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