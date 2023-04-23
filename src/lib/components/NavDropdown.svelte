<script lang="ts">
  import Fa from 'svelte-fa'
  import { clickOutside } from '$lib/js/clickOutside'
  import { createEventDispatcher } from 'svelte'

  export let name: string
  export let entries: Record<string, any> = {}
  export let delay = 0

  let open = false // only for visuals at this point
  const closeDropdown = () => (open = false)

  const dispatch = createEventDispatcher()
</script>

<input
  type="checkbox"
  id="dropdown-isopen"
  style="display: none"
  bind:checked={open}
/>
<li
  class="click-depress dropdown"
  use:clickOutside={closeDropdown}
  {open}
  style={`animation-delay: ${delay}ms`}
>
  <label
    for="dropdown-isopen"
    role="button"
    tabindex="0"
    on:keypress={e => e.key == 'Enter' && (open = !open)}
  >
    <span>{name}</span>
    <i
      class="bx bx-caret-down dd-icon"
      style="display: inline-block !important; font-size: 0.9rem"
    />
  </label>

  <div>
    <ul>
      {#each Object.entries(entries) as [name, href], i}
        <li
          class="click-depress"
          on:click={e => {
            closeDropdown()
            dispatch('navigate', e)
          }}
          style={`animation-delay: ${(i + 1) * 0.075}s`}
        >
          <a {href}>{name}</a>
        </li>
      {/each}
    </ul>
  </div>
</li>

<style>
  .dropdown {
    position: relative;
    transition: 0.2s;
  }
  .dropdown[open='true'] {
    background-color: var(--background-active);
  }

  .dropdown[open='true']:active {
    transform: none !important;
  }

  /* holy shit I hate CSS so much */
  #dropdown-isopen:checked ~ .dropdown {
    z-index: 1;
  }
  #dropdown-isopen:not(:checked) ~ .dropdown > div {
    display: none;
  }

  @keyframes dropdown-flyin {
    from {
      transform: translate(-50%, -20px);
    }
    to {
      transform: translate(-50%, 0);
    }
  }
  @keyframes dropdown-flyin-mobile {
    from {
      transform: translate(0, -20px);
    }
    to {
      transform: none;
    }
  }

  .dropdown > div {
    position: absolute;
    top: 100%;
    left: 50%;
    padding-top: 10px;
    z-index: 1;

    animation: dropdown-flyin 0.2s, fadein 0.2s both;
  }

  .dropdown ul {
    display: block;

    white-space: nowrap;
    box-shadow: 0 0 3px 3px var(--shadow-color);
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    margin: 0 auto;
  }
  .dropdown li {
    display: block;
    animation: nav-flyin 0.2s, fadein 0.2s both;
  }
  .dropdown li:first-child,
  .dropdown li:first-child a {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }
  .dropdown li:last-child,
  .dropdown li:last-child a {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
  .dropdown li:not(:last-child) {
    border-bottom: 1px solid var(--primary);
  }
  .dropdown li a {
    display: block;
  }

  @media only screen and (min-width: 691px) {
    .dropdown > div {
      transform: translate(-50%, 0);
    }
  }
  @media only screen and (max-width: 690px) {
    .dropdown > div {
      position: absolute;
      left: 0;
      right: 0;
      padding-top: 10px;

      animation: dropdown-flyin-mobile 0.2s, fadein 0.2s forwards;
    }
  }
  @media only screen and (min-width: 691px) {
    .dropdown ul {
      backdrop-filter: blur(3px);
    }
  }
</style>
