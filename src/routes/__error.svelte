<script lang="ts" context="module">
import type { Load } from '@sveltejs/kit';

export const load : Load = async ({ error, status }) => ({
    props: {
        error, status
    }
})
</script>

<script lang="ts">
import { finishNavigation } from '$lib/js/tools'

export let status : number
export let error : Error

finishNavigation()
</script>

<style>
h1 {
    font-size: 3em;
}
</style>

<h1>{status}</h1>
<p>{error.message}</p>