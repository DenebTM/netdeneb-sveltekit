<script lang="ts">
  import { page } from '$app/stores'
  const {
    data: { siteMetadata },
  } = $page
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - AAAAAA`}</title>
  <meta property="og:title" content="Leggy scream" />
  <meta name="description" content="AAAAAAAAAAAAAAAAAAAAAAAA" />
  <meta property="og:description" content="AAAAAAAAAAAAAAAAAAAAAAAA" />
</svelte:head>

<h2 class="page-title">AAAAAAAAAAAAAAAAAAAAAAAA</h2>
<div class="page-content">
  <a
    href="https://www.deviantart.com/hotnstock/art/Maned-Wolf-Stock-5-389799428">
    <img src="/img/screm.webp" alt="a maned wolf screaming (probably)" />
  </a>
</div>

<style>
  img {
    width: 100%;
    max-width: 800px;
    border-radius: var(--border-radius);
  }
</style>
