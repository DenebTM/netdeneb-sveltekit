<script lang="ts">
  export let page: string
  export let site: 'wikipedia' | 'wiktionary' = 'wikipedia'
  export let section: string | null = null
</script>

<a
  class="wiki-link"
  href={`https://en.${site}.org/wiki/${page}${section ? '#' + section : ''}`}>
  <i class="inline-icon bx bxl-wikipedia" />{page}&nbsp;
</a>

<style global>
  a.wiki-link {
    font-style: italic;
  }

  a.wiki-link .inline-icon {
    font-size: 1.25rem;
    vertical-align: super;
  }
</style>
