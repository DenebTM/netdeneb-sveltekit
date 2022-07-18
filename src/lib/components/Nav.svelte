<script lang="ts">
import Fa from 'svelte-fa'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import NavDropdown from '$lib/components/NavDropdown.svelte'
import { fly, fade } from 'svelte/transition'
import { clickOutside } from '$lib/js/clickOutside'

import { navItems } from '$lib/js/config'
import { isLoggedIn } from '$lib/js/auth'

if (isLoggedIn())
    navItems['Other']['Logout'] = '/logout'
else
    delete navItems['Other']['Logout']

const toggleNav = () => open = !open
const closeNav = () => open = false

let open = false
$: innerWidth = 0
$: isMobile = innerWidth <= 600
</script>

<svelte:window bind:innerWidth />

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

nav > ul > li {
    float: left;
    border-radius: var(--border-radius);
}

nav a {
    color: black;
    text-decoration: none;
    
    padding: 10px 20px;
    display: block;
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

nav .dd-icon {
    transition: transform 0.2s ease-in-out;
}
[open=true] > i > .dd-icon, [open=true] > a > .dd-icon {
    transform: rotate(180deg);
}

.open-nav {
    cursor: pointer;
    transition: 0.1s;
}
.open-nav:active {
    transform: translateY(2px);
}

@media only screen and (min-width: 601px) {
    .open-nav {
        display: none;
    }
    nav {
        min-height: calc((1em * 1.5) + 53px);
    }
}
@media only screen and (max-width: 600px) {
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
        width: 50%;
        margin-top: 0;
        background-color: var(--background-color);
        backdrop-filter: blur(3px);
        box-shadow: 0 0 3px 3px var(--shadow-color);
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

<nav use:clickOutside={() => open = false} {open}>
    <i class="open-nav" on:click={toggleNav}>
        <Fa class="dd-icon" icon={faChevronDown} size="lg" />
    </i>
    {#if !isMobile || open}
        <ul transition:fly={{ y: -10, duration: 150 }}>
            {#each Object.entries(navItems) as [name, href], i}
                {#if typeof(href) === 'string'}
                    <li class="click-move-down" in:fly={{ y: -10, duration: 150, delay: i*75}} out:fade>
                        <a {href} on:click={closeNav}>{name}</a>
                    </li>
                {:else}
                    <NavDropdown {name} entries={href} delay={i*75}
                        on:navigate={closeNav}/>
                {/if}
            {/each}
        </ul>
    {/if}
</nav>