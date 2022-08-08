<script lang="ts" context="module">
import type { Load } from '@sveltejs/kit'
export const load: Load = async ({ error, status }) => ({ props: { error, status } })
</script>

<script lang="ts">
export let status: number
export let error: Error
</script>

<h1>{status}</h1>
<p>{error ? error.message : 'Unknown error'}</p>

<style>
h1 {
    font-size: 3em;
}
</style>