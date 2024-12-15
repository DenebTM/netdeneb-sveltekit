<script lang="ts">
  import { page } from '$app/stores'
  const {
    data: { siteMetadata },
  } = $page
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - Error`}</title>
</svelte:head>

<h1>{$page.status}</h1>
<p>{$page.error ? $page.error.message : 'Unknown error'}</p>

<style>
  h1 {
    font-size: 3em;
  }
</style>
