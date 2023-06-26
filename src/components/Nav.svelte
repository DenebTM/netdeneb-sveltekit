<script lang="ts">
  import NavDropdown from '~/components/NavDropdown.svelte'
  import { clickOutside } from '~/util/clickOutside'
  import { page } from '$app/stores'

  import { navItems } from '~/util/appConfig'

  if ($page.data.hasValidToken) navItems['Other']['Logout'] = '/logout'
  else delete navItems['Other']['Logout']

  let open = false // only for visuals at this point
  const closeNav = () => (open = false)

  $: innerWidth = 720
</script>

<svelte:window bind:innerWidth />

<nav use:clickOutside={closeNav} {open}>
  <label for="nav-isopen" class="open-nav">
    <i class="bx bx-md bx-chevron-down dd-icon" />
  </label>
  <input
    type="checkbox"
    id="nav-isopen"
    style="display: none"
    bind:checked={open}
  />
  <ul>
    {#each Object.entries(navItems) as [name, href], i}
      {#if typeof href === 'string'}
        <li class="click-depress" style={`animation-delay: ${(i + 1) * 75}ms`}>
          <a {href} on:click={closeNav}>{name}</a>
        </li>
      {:else}
        <NavDropdown
          {name}
          entries={href}
          delay={(i + 1) * 75}
          on:navigate={closeNav}
        />
      {/if}
    {/each}
  </ul>
</nav>

<style global>
  nav {
    --border-radius: 5px;

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

    animation: nav-flyin 0.2s, fadein 0.2s both;
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
    text-decoration: none;

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
    cursor: pointer;
    transition: 0.1s;
    z-index: 100;
  }
  .open-nav:active {
    transform: translateY(2px);
  }

  @media only screen and (min-width: 691px) {
    .open-nav {
      display: none;
    }
    nav {
      min-height: calc((1em * 1.5) + 53px);
    }
    nav > ul > li:not(:last-child) {
      margin-right: 5px;
    }
  }
  @media only screen and (max-width: 690px) {
    #nav-isopen:not(:checked) ~ ul {
      display: none;
    }

    .open-nav {
      position: absolute;
      top: 15px;
      right: 20px;
    }
    nav {
      border-bottom: none;
    }
    nav > ul {
      position: absolute;
      top: 50px;
      right: 10px;
      min-width: 200px;
      margin-top: 0;
      background-color: var(--background-color);
      box-shadow: 0 0 3px 3px var(--shadow-color);
      z-index: 100;

      animation: nav-flyin 0.2s, fadein 0.2s both;
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
  }
</style>
