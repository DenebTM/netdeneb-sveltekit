<!-- Not done yet -->

<script lang="ts">
import { beginNavigation, finishNavigation, setTitle } from '$lib/js/tools'
import { page } from '$app/stores'

export let dirList : Array<string>
export let fileList : Array<string>

beginNavigation()

setTitle('Public files')

$: isRoot = $page.params.path == ''
$: current = '/' + $page.params.path + (!isRoot ? '/' : '')

finishNavigation()
</script>

<style>

</style>

<h1>List of {current}</h1>
{#each dirList as dir}
    <p><a href={`/files${current}${dir}`}>{dir}</a></p>
{/each}
{#each fileList as file}
    <p>{file}</p>
{/each}