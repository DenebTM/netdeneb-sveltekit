<script lang="ts">
  import Socials from '~/components/Socials.svelte'
  import WikiLink from '~/components/WikiLink.svelte'
  import type { PageServerData } from './$types'

  import { page } from '$app/stores'
  const siteMetadata: SiteMetadata = $page.data.siteMetadata

  export let data: PageServerData
</script>

<svelte:head>
  <meta property="og:title" content={siteMetadata.description} />
  <meta
    property="description"
    content="the home of deneb, the maney themself" />
  <meta
    property="og:description"
    content="the home of deneb, the maney themself" />
</svelte:head>

<div class="page-content">
  <section id="blurb">
    <img
      id="me"
      src={siteMetadata.titleImage?.path}
      alt={siteMetadata.titleImage?.description}
      title={siteMetadata.titleImage?.description} />
    <h1>Hi!</h1>
    <p>
      I'm <strong title="all-lowercase, please">deneb</strong>, a {data.age}-year
      old <WikiLink page="maned wolf" /> from Austria, currently studying computer
      science (BSc) in Innsbruck.
    </p>
  </section>

  <section>
    <p>
      I consider myself a hobbyist developer and hobbyist network/systems
      engineer. I have a few projects on <a href="https://github.com/DenebTM"
        ><i class="inline-icon bx bx-sm bxl-github" />&nbsp;Github</a
      >, and I run my own Nextcloud instance and email server, both of which are
      linked above (under "Other").
    </p>
    <p>
      If you're looking for my reference sheet, go <a href="/art?img=ref"
        >here!</a
      ><br />
      Or find more info on my <a href="/about">About</a> page :3
    </p>
  </section>

  <hr />
  <section id="socials">
    <Socials links={data.socials} />
  </section>
</div>

<style>
  #me {
    width: 160px;
    border-radius: 500%;
  }
</style>
