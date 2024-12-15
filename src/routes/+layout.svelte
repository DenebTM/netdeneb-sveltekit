<script lang="ts">
  import '~/util/styles'

  import { afterNavigate, beforeNavigate } from '$app/navigation'

  import Nav from '~/components/Nav.svelte'
  import { enableScroll } from '~/util/tools'
  import { onMount } from 'svelte'

  import { page } from '$app/stores'
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
  const siteMetadata: SiteMetadata = $page.data.siteMetadata

  let animateTransition: boolean | undefined = $state(true)
  beforeNavigate(nav => {
    if (
      !(
        nav.to?.url.host != nav.from?.url.host ||
        nav.to?.url.pathname == nav.from?.url.pathname
      )
    )
      animateTransition = undefined
  })
  afterNavigate(() => {
    animateTransition = true
    enableScroll()
  })
  onMount(() => (animateTransition = true))
</script>

<svelte:head>
  <title>{siteMetadata.name}</title>

  <!-- TODO: un-hardcode this -->
  <meta name="theme-color" content="#ee3a7c" />
  <meta property="og:site_name" content={siteMetadata.name} />
</svelte:head>

<a
  href="/"
  class="site-name fixed-color"
  tabindex="-1"
  style="color: white !important">{siteMetadata.name}</a>
<div class="content-box">
  <div class="bg-blur"></div>
  <Nav />
  <main animate={animateTransition}>
    {@render children?.()}
  </main>
</div>

<style global>
  div.bg-blur {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: calc(2 * var(--border-radius));
    z-index: -1;

    background-image: var(--page-background-blur);
    background-attachment: fixed;
    background-attachment: var(--page-background-attachment);
    background-position-x: var(--page-background-posx);
    background-position-y: var(--page-background-posy);
    background-size: var(--page-background-size);
    /* filter: blur(5px); /* css gaussian blur is slow on mobile */
  }
  div.content-box {
    text-align: center;
    max-width: 1024px;
    margin: 0 auto;
    border-radius: calc(2 * var(--border-radius));
    padding: 0 20px 20px 20px;
    position: relative;
    min-height: 500px;

    background: var(--background-color);
    box-shadow: 0 0 10px 5px var(--shadow-color);
    border: 1px solid var(--primary);
    cursor: default;
    transition: background-color 0.15s;
  }

  .site-name {
    display: block;
    width: fit-content;
    text-align: center;
    margin: 7.5vh auto 0.5em auto;
    font-size: 3em;
    line-height: 1;

    text-shadow: 0 0 5px black;
    font-weight: bold;
    text-decoration: none;
  }
  .site-name:hover {
    text-decoration: underline;
  }

  @keyframes flyin {
    from {
      transform: translateY(20px);
    }
    to {
      transform: none;
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media not (prefers-reduced-motion) {
    main[animate] {
      animation:
        flyin 0.3s,
        fadein 0.3s forwards;
      opacity: 0;
      transform: none;
    }

    .site-name {
      transition: margin 0.3s;
    }
  }

  @media (max-width: 744px) {
    .title {
      margin-top: 0.5em;
    }

    .page-title {
      margin-right: 44px;
      text-align: left;
      word-wrap: break-word;
    }
  }
</style>
