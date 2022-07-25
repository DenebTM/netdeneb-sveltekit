<script lang="ts">
import '$lib/js/styles'

import { sitename } from '$lib/js/globals'
import { afterNavigate, beforeNavigate } from '$app/navigation'

import Nav from '$lib/components/Nav.svelte'
import { enableScroll } from '$lib/js/tools';

let show = false
beforeNavigate(nav => {
    if (!(nav.to?.pathname.startsWith('/files') || nav.to?.host != nav.from.host))
        show = false
})
afterNavigate(() => {show = true; enableScroll() })
</script>

<svelte:head>
    <title>{sitename}</title>
</svelte:head>

<a href="/" class="title">{sitename}</a>
<div class="content">
    <div class="bg-blur" />
    <Nav />
    <main {show}>
        <slot />
    </main>
</div>

<style>
div.bg-blur {
    background-image: var(--page-background);
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
    margin: 7.5vh auto 0.5em auto;
    font-size: 3em;
    line-height: 1;

    color: white;
    text-shadow: 0 0 5px black;
    font-weight: bold;
    text-decoration: none;
    transition: margin 0.3s;
}
.title:hover {
    text-decoration: underline;
}

main[show=false] {
    transform: translateY(20px);
    opacity: 0;
}

main[show=true] {
    transition: 0.2s;
    opacity: 1;
}

@media only screen and (max-width: 600px) {
    .title {
        margin-top: 0.5em;
    }
}
</style>