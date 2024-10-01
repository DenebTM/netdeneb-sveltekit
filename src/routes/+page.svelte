<script lang="ts">
  import Socials from '~/components/Socials.svelte'
  import { sitename } from '~/util/globals'
  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<svelte:head>
  <title>{sitename}</title>
</svelte:head>

<section id="blurb">
  <img id="me" src={data.titleImage?.path} alt={data.titleImage?.description} />
  <h1>Hi!</h1>
  <p>
    I'm <strong title="all-lowercase, please">deneb</strong>, a {data.age}-year
    old
    <a class="inline-link" href="https://en.wikipedia.org/wiki/Maned Wolf"
      >maned wolf</a
    > from Austria, currently studying computer science (BSc) in Innsbruck.
  </p>
</section>

<section>
  <p>
    I consider myself a hobbyist developer and hobbyist network/systems
    engineer. I have a few projects on <a
      class="inline-link"
      href="https://github.com/DenebTM"
      ><i class="inline-icon bx bx-sm bxl-github" /> Github</a
    >, and I run my own Nextcloud instance and email server, both of which are
    linked above (under "Other").
  </p>
  <p>
    If you're looking for my reference sheet, go <a
      class="inline-link"
      href="/art?img=ref">here!</a
    >
    <br />
    Or find more info on my <a class="inline-link" href="/about">About</a> page :3
  </p>
</section>

<hr />
<section id="socials">
  <Socials links={data.socials} />
</section>

<style>
  #me {
    width: 160px;
    border-radius: 120px;
  }
</style>
