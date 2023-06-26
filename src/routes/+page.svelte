<script lang="ts">
  import Socials from '~/components/Socials.svelte'
  import { sitename } from '~/util/globals'
  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<svelte:head>
  <title>{sitename}</title>
</svelte:head>

<div class="grid">
  <section>
    <img
      id="me"
      src="/img/deneb1.webp"
      alt="Art of Deneb, by twitter.com/FluffySakora"
    />
    <h1>Hi!</h1>
    <p>
      I'm Deneb, a maned wolf and hobbyist developer from Austria, currently
      studying comp-sci in Innsbruck.
    </p>
    <p>
      This is mainly a place for me to put my personal pet projects, but you'll
      also find my ref and other art I've received here. Still under
      construction, so check back later for more!
    </p>
    {#if data.socials.length > 0}
      <hr />
      <Socials links={data.socials} />
    {/if}
  </section>
</div>

<style>
  #me {
    width: 160px;
    border-radius: 120px;
  }
</style>
