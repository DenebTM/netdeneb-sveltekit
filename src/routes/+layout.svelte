<script lang="ts">
  import '$lib/js/styles'

  import { sitename } from '$lib/js/globals'
  import { afterNavigate, beforeNavigate } from '$app/navigation'

  import Nav from '$lib/components/Nav.svelte'
  import { enableScroll } from '$lib/js/tools'
  import { onMount } from 'svelte'

  let animate: boolean | undefined = true
  beforeNavigate(nav => {
    if (
      !(
        nav.to?.url.pathname.startsWith('/files') ||
        nav.to?.url.host != nav.from?.url.host ||
        nav.to?.url.pathname == nav.from?.url.pathname
      )
    )
      animate = undefined
  })
  afterNavigate(() => {
    animate = true
    enableScroll()
  })
  onMount(() => (animate = true))
</script>

<svelte:head>
  <title>{sitename}</title>
</svelte:head>

<a
  href="/"
  class="title fixed-color"
  tabindex="-1"
  style="color: white !important">{sitename}</a
>
<div class="content">
  <div class="bg-blur" />
  <Nav />
  <main {animate}>
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
    background-position-x: 20%;
    background-size: cover;
    /* filter: blur(5px); fuck you phones */
    background-image: var(--page-background-blur);
  }
  div.content {
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

  .title {
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
  .title:hover {
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
    animation: flyin 0.3s, fadein 0.3s forwards;
    opacity: 0;
    transform: none;
  }

  @media only screen and (max-width: 690px) {
    .title {
      margin-top: 0.5em;
    }
  }
</style>
