<script lang="ts">
  export let page: string
</script>

<a class="wiki-link" href={`https://en.wikipedia.org/wiki/${page}`}>
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
