<script lang="ts">
  import { sitename } from '~/util/globals'
  import { page } from '$app/stores'
</script>

<svelte:head>
  <title>{`${sitename} - Error`}</title>
</svelte:head>

<h1>{$page.status}</h1>
<p>{$page.error ? $page.error.message : 'Unknown error'}</p>

<style>
  h1 {
    font-size: 3em;
  }
</style>
