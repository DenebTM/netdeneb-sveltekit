<script lang="ts">
  import { clickOutside } from '~/util/clickOutside'
  import { createEventDispatcher } from 'svelte'
  import { page } from '$app/stores'
  import NavLink from './NavLink.svelte'

  interface Props {
    name: string
    entries?: Record<string, any>
    delay?: number
  }

  const { name, entries = {}, delay = 0 }: Props = $props()

  let open = $state(false) // for visuals and accessibility
  const closeDropdown = () => (open = false)

  const randId = Math.floor(Math.random() * 10000)

  const dispatch = createEventDispatcher()
</script>

<input
  type="checkbox"
  id={`dropdown-isopen-${randId}`}
  class="dropdown-checkbox"
  style="display: none"
  aria-controls={`dropdown-isopen-${randId}`}
  aria-expanded={open}
  bind:checked={open} />
<li
  class="click-depress dropdown"
  use:clickOutside={closeDropdown}
  {open}
  style={`animation-delay: ${delay}ms`}>
  <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
  <label
    for={`dropdown-isopen-${randId}`}
    role="button"
    tabindex="0"
    onkeypress={e => e.key === 'Enter' && (open = !open)}>
    <span>{name}</span>
    <i
      class="bx bx-caret-down dd-icon"
      style="display: inline-block !important; font-size: 0.9rem"></i>
  </label>

  <div>
    <ul id={`dropdown-items-${randId}`}>
      {#each Object.entries(entries) as [name, target], i}
        <NavLink
          isCurrent={$page.url.pathname === target}
          {name}
          {target}
          index={i}
          onClick={e => {
            closeDropdown()
            dispatch('navigate', e)
          }} />
      {/each}
    </ul>
  </div>
</li>

<style global>
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
  .dropdown-checkbox:checked ~ .dropdown {
    z-index: 1;
  }
  .dropdown-checkbox:not(:checked) ~ .dropdown > div {
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

  @media not (max-width: 744px) {
    .dropdown > div {
      transform: translate(-50%, 0);
    }

    .dropdown ul {
      backdrop-filter: blur(3px);
    }

    @media not (prefers-reduced-motion) {
      .dropdown > div {
        animation:
          dropdown-flyin 0.2s,
          fadein 0.2s both;
      }
    }
  }

  @media (max-width: 744px) {
    .dropdown > div {
      position: absolute;
      left: 0;
      right: 0;
      padding-top: 10px;
    }

    @media not (prefers-reduced-motion) {
      .dropdown > div {
        animation:
          dropdown-flyin-mobile 0.2s,
          fadein 0.2s forwards;
      }
    }
  }

  @media not (prefers-reduced-motion) {
    .dropdown li {
      animation:
        nav-flyin 0.2s,
        fadein 0.2s both;
    }
  }
</style>
