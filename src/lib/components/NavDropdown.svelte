<script lang="ts">
import Fa from 'svelte-fa'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { fly, fade } from 'svelte/transition'
import { clickOutside } from '$lib/js/clickOutside'
import { createEventDispatcher } from 'svelte'

export let name : string
export let entries : Record<string, any> = {}
export let delay = 0

let open = false
const toggleDropdown = () => open = !open
const closeDropdown = () => open = false

const dispatch = createEventDispatcher()
</script>

<li {open} class="dropdown" use:clickOutside={() => open = false}
  in:fly={{ y: -10, duration: 150, delay }} out:fade>
    <a href={undefined} on:click={toggleDropdown}>
        {name}
        <Fa class="dd-icon" icon={faCaretDown} scale=0.66 />
        <!-- <div class="chevron" /> -->
    </a>
    {#if open}
        <div transition:fly={{ y: -10, duration: 150 }}>
            <ul>
                {#each Object.entries(entries) as [name, href], i}
                    <li in:fly={{ y: -10, duration: 150, delay: i*75 }} out:fade
                        on:click={e => {closeDropdown(); dispatch('navigate', e)}}>
                        <a {href}>{name}</a>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</li>

<style>
.dropdown {
    position: relative;
}
.dropdown[open=true] {
    background-color: var(--background-active);
}

.dropdown[open=true]:active {
    transform: none;
}

.dropdown > div {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 10px;
    z-index: 1;
}

.dropdown ul {
    display: block;

    white-space: nowrap;
    box-shadow: 0 0 3px 3px var(--shadow-color);
    background-color: var(--background-color);
    backdrop-filter: blur(3px);
    border-radius: var(--border-radius);
    margin: 0 auto;
}
.dropdown ul li {
    display: block;
}
.dropdown ul li:first-child {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
}
.dropdown ul li:last-child {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
}
.dropdown ul li:not(:last-child) {
    border-bottom: 1px solid var(--primary);
}
.dropdown ul li a {
    display: block;
}

@media only screen and (max-width: 600px) {
    .dropdown > div {
        position: absolute;
        left: 0;
        right: 0;
        transform: none;
        padding-top: 10px;
    }
}
</style>