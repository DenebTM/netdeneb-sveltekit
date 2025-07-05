<script lang="ts">
  import Socials from '~/components/Socials.svelte'
  import WikiLink from '~/components/WikiLink.svelte'
  import splashes_dot_txt from './splashes.json'
  import { socials } from './info.json'

  import { page } from '$app/state'
  const {
    data: { siteMetadata },
  } = page

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
  <section>
    <div class="blurb">
      <img
        class="blurb-center"
        src={siteMetadata.titleImage.path}
        alt={siteMetadata.titleImage.description}
        title={siteMetadata.titleImage.description} />

      <div class="blurb-left">
        <span style="--delay: 0.0s">
          <strong title="all-lowercase, please">deneb</strong>
        </span>
        <span style="--delay: 0.1s">maned wolf</span>
        <span style="--delay: 0.2s">
          <a href="/art?img=ref">ref sheet</a>
        </span>
      </div>
      <div class="blurb-right">
        <span style="--delay: 0.15s">age 24</span>
        <span style="--delay: 0.25s">
          <img class="nb-pride" src="/img/nb.svg" alt="non-binary pride flag" />
          they/them
        </span>
        <span style="--delay: 0.35s"
          >{splashes_dot_txt[
            Math.floor(Math.random() * splashes_dot_txt.length)
          ]}</span>
      </div>
      <!-- TODO: make this dynamic -->
    </div>

    <h1>Hi!</h1>
    <p>
      I'm <strong title="all-lowercase, please">deneb</strong>, a 24-year old <WikiLink
        page="maned wolf" /> from Austria, currently studying computer science (BSc)
      in Innsbruck.
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
      Find more info on my <a href="/about">About</a> page!
    </p>
  </section>

  <hr />
  <section id="buttons">
    <p>
      <span style="font-weight: bold">Buttons!</span><br />
      You may hotlink these (copy the source code), or just copy the files to your
      site, whichever you prefer :3
    </p>
    <p>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -- i control this HTML -->
      {@html buttonHtml}
    </p>
    <p>want more buttons? go <a href="/links#buttons">here</a>!</p>
  </section>

  <hr />
  <section id="socials">
    <Socials links={socials} />
  </section>
</div>

<style>
  .blurb {
    font-size: 1.125em;
  }

  .blurb {
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 1fr max-content 1fr;
    grid-template-rows: max-content;
  }
  .blurb > * {
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .blurb img.blurb-center {
    --size: 160px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }
  .blurb .blurb-left {
    grid-column: 1;
    text-align: right;
  }
  .blurb .blurb-center {
    grid-column: 2;
    z-index: 1;
  }
  .blurb .blurb-right {
    grid-column: 3;
    text-align: left;
  }

  .blurb .blurb-left > * {
    --transform-initial: 80px;
  }
  .blurb .blurb-right > * {
    --transform-initial: -80px;
  }

  .nb-pride {
    display: inline;
    vertical-align: middle;
    height: 1em;
    border: 1px solid var(--text-color);
    border-radius: 5px;
  }

  @media (max-width: 540px) {
    .blurb {
      grid-template-columns: max-content 1fr;
    }
    .blurb .blurb-center {
      grid-column: 1;
      grid-row: span 2;
    }
    .blurb .blurb-left {
      text-align: left;
      grid-column: 2;
      grid-row: 1;
      justify-content: end;
    }

    .blurb .blurb-left > * {
      --transform-initial: -80px;
    }

    .blurb .blurb-right {
      grid-column: 2;
      grid-row: 2;
      justify-content: start;
    }
  }

  @keyframes sideslide {
    from {
      opacity: 0;
      transform: translateX(var(--transform-initial));
    }

    to {
      opacity: 1;
      transform: 0;
    }
  }

  @media not (prefers-reduced-motion) {
    .blurb .blurb-left > *,
    .blurb .blurb-right > * {
      animation: 0.35s sideslide calc(0.15s + var(--delay)) forwards;
      opacity: 0;
    }

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
