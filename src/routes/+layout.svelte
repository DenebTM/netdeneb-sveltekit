<script lang="ts">
  import '~/util/styles'

  import { sitename } from '~/util/globals'
  import { afterNavigate, beforeNavigate } from '$app/navigation'

  import Nav from '~/components/Nav.svelte'
  import { enableScroll } from '~/util/tools'
  import { onMount } from 'svelte'

  let animateTransition: boolean | undefined = true
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
  <title>{sitename}</title>
</svelte:head>

<a
  href="/"
  class="site-name fixed-color"
  tabindex="-1"
  style="color: white !important">{sitename}</a>
<div class="content-box">
  <div class="bg-blur" />
  <Nav />
  <main animate={animateTransition}>
    <slot />
  </main>
</div>

<style global>
  div.bg-blur {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 10px;
    z-index: -1;

    background-attachment: fixed;
    background-attachment: var(--page-background-attachment);
    background-position-x: var(--page-background-posx);
    background-position-y: var(--page-background-posy);
    background-size: var(--page-background-size);
    /* filter: blur(5px); fuck you phones */
  }
  div.content-box {
    text-align: center;
    max-width: 1024px;
    margin: 0 auto;
    border-radius: 10px;
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
    transition: margin 0.3s;
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
  main[animate] {
    animation:
      flyin 0.3s,
      fadein 0.3s forwards;
    opacity: 0;
    transform: none;
  }

  @media only screen and (max-width: 744px) {
    .title {
      margin-top: 0.5em;
    }

    .page-title {
      margin-right: 44px;
      text-align: left;
    }
  }
</style>
