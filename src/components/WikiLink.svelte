<script lang="ts">
  interface Props {
    page: string
    site?: 'wikipedia' | 'wiktionary'
    section?: string | null
  }

  let { page, site = 'wikipedia', section = null }: Props = $props()
</script>

<a
  class="wiki-link"
  href={`https://en.${site}.org/wiki/${page}${section ? '#' + section : ''}`}>
  <i class="inline-icon bx bxl-wikipedia"></i>{page}
</a>&nbsp;

<style global>
  a.wiki-link {
    font-style: italic;
  }

  a.wiki-link .inline-icon {
    font-size: 1.25rem;
    vertical-align: super;
  }
</style>
