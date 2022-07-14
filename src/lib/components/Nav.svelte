<script lang="ts">
import Fa from 'svelte-fa'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import NavDropdown from '$lib/components/NavDropdown.svelte'
// import { pagename } from '$lib/js/globals'
import { fly, fade } from 'svelte/transition'
import { clickOutside } from '$lib/js/clickOutside'
import { navItems } from '$lib/js/config'

const toggleNav = () => open = !open
const closeNav = () => open = false

let open = false
$: innerWidth = 0
</script>

<svelte:window bind:innerWidth />

<style global>
nav {
    --border-radius: 5px;
    --background-hover: rgba(255, 255, 255, 0.4);
    --background-active: rgba(255, 255, 255, 0.3);

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
    transition: 0.1s ease-in-out;
    user-select: none;
}

nav li:hover {
    cursor: pointer;
    background-color: var(--background-hover);
}

nav li:active {
    transform: translateY(2px);
    background-color: var(--background-active);
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

<nav use:clickOutside={() => open = false}>
    <i class="open-nav" on:click={toggleNav}>
        <Fa icon={faChevronDown} size="lg" rotate={open ? 180 : 0} />
    </i>
    {#if innerWidth > 600 || open}
        <ul {open} transition:fly={{ y: -10, duration: 150 }}>
            {#each Object.entries(navItems) as [name, href], i}
                {#if typeof(href) === 'string'}
                    <li in:fly={{ y: -10, duration: 150, delay: i*75 }} out:fade>
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