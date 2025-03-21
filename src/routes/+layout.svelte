<script lang="ts">
  import '~/util/styles'
  import { onMount, type Snippet } from 'svelte'
  import Nav from '~/components/nav/Nav.svelte'
  import { enableScroll } from '~/util/tools'
  import { page } from '$app/state'
  import { afterNavigate, beforeNavigate } from '$app/navigation'

  import navItems from './navItems.json'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()

  const {
    data: { siteMetadata },
  } = page

  let animateTransition: boolean | undefined = $state(true)
  beforeNavigate(nav => {
    /* animateTransition must first be set to `undefined`, then `true` in order
     * for the flyin animation to replay */

    // only animate if the new page isn't the one the user is already on
    if (nav.to?.route.id !== nav.from?.route.id) {
      animateTransition = undefined
    }
  })
  afterNavigate(nav => {
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

  <meta name="darkreader-lock" />
</svelte:head>

<a
  href="/"
  class="site-name fixed-color"
  tabindex="-1"
  style="color: white !important">{siteMetadata.name}</a>
<div class="content-box">
  <div class="bg-blur"></div>
  <Nav items={navItems} />
  <main animate={animateTransition}>
    {@render children?.()}
  </main>
</div>

<style>
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
    max-width: 958px;
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
</style>
