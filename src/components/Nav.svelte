<script lang="ts">
  import NavDropdown from '~/components/NavDropdown.svelte'
  import { clickOutside } from '~/util/clickOutside'
  import { page } from '$app/stores'
  import NavLink from './NavLink.svelte'
  import HamburgerButton from './HamburgerButton.svelte'

  const navItems = $page.data.navItems as Navigation

  let isopen = $state(false) // for visuals and accessibility
  const closeNav = (): boolean => (isopen = false)

  let innerWidth: number = $state(0)
</script>

<svelte:window bind:innerWidth />

<nav use:clickOutside={closeNav} {isopen}>
  <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
  <label
    for="nav-isopen"
    class="open-nav"
    role="button"
    tabindex="0"
    onkeypress={e => e.key === 'Enter' && (isopen = !isopen)}>
    <HamburgerButton {isopen} />
  </label>
  <input
    type="checkbox"
    id="nav-isopen"
    style="display: none"
    aria-controls="nav-items"
    aria-expanded={isopen || innerWidth >= 744}
    bind:checked={isopen} />
  <ul id="nav-items">
    {#each Object.entries(navItems) as [name, target], i}
      {#if typeof target === 'string' || 'external' in target}
        <NavLink
          isCurrent={$page.url.pathname === target}
          {name}
          {target}
          index={i}
          onClick={closeNav} />
      {:else}
        <NavDropdown
          {name}
          entries={target}
          delay={(i + 1) * 75}
          onNavigate={closeNav} />
      {/if}
    {/each}
  </ul>
</nav>

<style>
  nav {
    text-align: center;
    border-bottom: 1px solid var(--primary);
    line-height: 0;
    margin-bottom: 20px;
  }

  nav :global(ul) {
    list-style: none;
    display: inline-block;
    padding: 0;
    line-height: 1.5;
    border-radius: var(--border-radius);
    z-index: 1;
  }

  @keyframes nav-flyin {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: none;
    }
  }

  nav > ul > :global(li) {
    float: left;
    border-radius: var(--border-radius);
  }

  @media not (prefers-reduced-motion) {
    nav > ul > :global(li) {
      animation:
        nav-flyin 0.2s,
        fadein 0.2s both;
    }
  }

  nav > ul > :global(li[isCurrent='true']) {
    background-color: var(--background-active);
  }

  nav :global(li) {
    user-select: none;
  }

  nav :global(li:hover) {
    cursor: pointer;
    background-color: var(--background-hover);
  }

  nav :global(li:active) {
    background-color: var(--background-active);
  }

  nav > ul > :global(li > a),
  nav > ul > :global(li > label) {
    border-radius: var(--border-radius);
  }

  nav :global(a),
  nav :global(label:not(.open-nav)) {
    color: var(--text-color) !important;
    text-decoration: none !important;

    padding: 10px 20px;
    display: block;
    cursor: pointer;
  }

  nav :global(.dd-icon) {
    transition: transform 0.2s ease-in-out;
  }

  [isopen='true'] > :global(label > .dd-icon),
  [isopen='true'] > :global(a > .dd-icon) {
    transform: rotate(180deg);
  }

  .open-nav {
    position: absolute;
    top: 20px;
    right: 20px;

    cursor: pointer;
    transition: 0.1s;
    z-index: 1;
  }
  .open-nav:active {
    transform: translateY(2px);
  }

  /* TODO: don't hardcode this width....... how tho */
  @media not (max-width: 744px) {
    nav .open-nav {
      display: none;
    }
    nav {
      min-height: calc((1em * 1.5) + 53px);
    }
    nav > :global(ul > li:not(:last-child)) {
      margin-right: 5px;
    }
  }
  @media (max-width: 744px) {
    #nav-isopen:not(:checked) ~ #nav-items {
      display: none;
    }

    nav {
      border-bottom: none;
    }
    nav > ul {
      position: absolute;
      top: 55px;
      right: 10px;
      min-width: 200px;
      margin-top: 0;
      background-color: var(--background-color);
      box-shadow: 0 0 3px 3px var(--shadow-color);
      z-index: 1;
    }
    nav > ul > :global(li) {
      float: none;
    }
    nav > ul > :global(li:not(:first-child)) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    nav > ul > :global(li:not(:last-child)) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 1px solid var(--primary);
    }

    @media not (prefers-reduced-motion) {
      nav > ul {
        animation:
          nav-flyin 0.2s,
          fadein 0.2s both;
      }
    }
  }

  @media not (prefers-reduced-motion) {
    nav > ul > :global(li) {
      animation:
        nav-flyin 0.2s,
        fadein 0.2s both;
    }
  }
</style>
