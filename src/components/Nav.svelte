<script lang="ts">
  import NavDropdown from '~/components/NavDropdown.svelte'
  import { clickOutside } from '~/util/clickOutside'
  import { page } from '$app/stores'
  import NavLink from './NavLink.svelte'
  import HamburgerButton from './HamburgerButton.svelte'

  let navItems: Record<string, any> = $page.data.navItems

  let open = false // for visuals and accessibility
  const closeNav = () => (open = false)

  let innerWidth: number
</script>

<svelte:window bind:innerWidth />

<nav use:clickOutside={closeNav} {open}>
  <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
  <label
    for="nav-isopen"
    class="open-nav"
    role="button"
    tabindex="0"
    on:keypress={e => e.key == 'Enter' && (open = !open)}>
    <HamburgerButton {open} />
  </label>
  <input
    type="checkbox"
    id="nav-isopen"
    style="display: none"
    aria-controls="nav-items"
    aria-expanded={open || innerWidth >= 744}
    bind:checked={open} />
  <ul id="nav-items">
    {#each Object.entries(navItems) as [name, target], i}
      {#if typeof target === 'string' || 'external' in target}
        <NavLink
          isCurrent={$page.url.pathname == target}
          {name}
          {target}
          index={i}
          onClick={closeNav} />
      {:else}
        <NavDropdown
          {name}
          entries={target}
          delay={(i + 1) * 75}
          on:navigate={closeNav} />
      {/if}
    {/each}
  </ul>
</nav>

<style global>
  nav {
    text-align: center;
    border-bottom: 1px solid var(--primary);
    line-height: 0;
    margin-bottom: 20px;
  }

  nav ul {
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

  nav > ul > li {
    float: left;
    border-radius: var(--border-radius);
  }

  @media not (prefers-reduced-motion) {
    nav > ul > li {
      animation:
        nav-flyin 0.2s,
        fadein 0.2s both;
    }
  }

  nav > ul > li[isCurrent='true'] {
    background-color: var(--background-active);
  }

  nav li {
    user-select: none;
  }

  nav li:hover {
    cursor: pointer;
    background-color: var(--background-hover);
  }

  nav li:active {
    background-color: var(--background-active);
  }

  nav > ul > li > a,
  nav > ul > li > label {
    border-radius: var(--border-radius);
  }

  nav a,
  nav label:not(.open-nav) {
    color: var(--text-color) !important;
    text-decoration: none !important;

    padding: 10px 20px;
    display: block;
    cursor: pointer;
  }

  nav .dd-icon {
    transition: transform 0.2s ease-in-out;
  }

  [open='true'] > label > .dd-icon,
  [open='true'] > a > .dd-icon {
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
    nav > ul > li:not(:last-child) {
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
    nav > ul > li {
      float: none;
    }
    nav > ul > li:not(:first-child) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    nav > ul > li:not(:last-child) {
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
    nav > ul > li {
      animation:
        nav-flyin 0.2s,
        fadein 0.2s both;
    }
  }
</style>
