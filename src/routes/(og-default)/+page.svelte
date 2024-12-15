<script lang="ts">
  import Socials from '~/components/Socials.svelte'
  import WikiLink from '~/components/WikiLink.svelte'
  import type { PageServerData } from './$types'

  import { page } from '$app/stores'
  const siteMetadata: SiteMetadata = $page.data.siteMetadata

  interface Props {
    data: PageServerData
  }

  let { data }: Props = $props()

  const buttonAStyle = 'display: inline-block'
  const buttonImgStyle =
    'width: 88px; height: 31px; image-rendering: pixelated; vertical-align: top'
  const buttonHtml = `
    <a style="${buttonAStyle}" href="https://${siteMetadata.name}/">
      <img
        style="${buttonImgStyle}"
        src="https://${siteMetadata.name}/img/8831/deneb_rainbow.gif"
        alt="CGA text mode style button for ${siteMetadata.name}" />
    </a>
    <a style="${buttonAStyle}" href="https://${siteMetadata.name}/">
      <img
        style="${buttonImgStyle}"
        src="https://${siteMetadata.name}/img/8831/deneb_amber.gif"
        alt="Amber CRT style button for ${siteMetadata.name}" />
    </a>
  `
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
        ><i class="inline-icon bx bx-sm bxl-github"></i>&nbsp;Github</a
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
  <section id="buttons">
    <p>
      <span style="font-weight: bold">Buttons!</span><br />
      You may hotlink these (copy the source code), or just copy the files to your
      site, whichever works best.
    </p>
    <p>
      {@html buttonHtml}
    </p>
    <p>want more buttons? go <a href="/links#friends">here</a>!</p>
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

  @media not (prefers-reduced-motion) {
    #buttons :global(a:hover) {
      animation: rotato 1s infinite linear;
    }
  }

  #buttons :global(:not(:last-child) a) {
    transition: 0.125s ease-in-out;
  }

  #buttons :global(:not(:last-child) a:active) {
    transform: translateY(2px) !important;
  }
</style>
