<script lang="ts" context="module">
import { page } from '$app/stores'
import { isLoggedIn } from '$lib/js/auth'

import type { Load } from '@sveltejs/kit'
export const load : Load = async ({ session, props, params: { path } }) => {
    path = '/' + path

    if (path.startsWith('/Users') && !isLoggedIn(session)) {
        return {
            status: 302,
            redirect: `/login?redirect=${encodeURIComponent('/ftpdir' + path)}`
        }
    }

    return { status: 200, props }
}
</script>

<script lang="ts">
import { setTitle } from '$lib/js/tools'

import Fa from 'svelte-fa'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { slide } from 'svelte/transition';

import folderIcon from '/src/assets/icons/folder.png'
import fileIcon from '/src/assets/icons/file.png'
import { goto } from '$app/navigation'

export let dirList  : Array<string>
export let fileList : Array<string>

const goUp = () => goto('/ftpdir' + current.replace(/\/[^\/]*$/, ''))
const goBack = () => window.history.back()
const goForward = () => window.history.forward()

let dirsCollapsed = false
const toggleDirs = () => dirsCollapsed = !dirsCollapsed

setTitle('Public files')

$: isRoot = $page.params.path == ''
$: current = (!isRoot ? '/' : '') + $page.params.path
</script>

<style>
.file-nav, h3 {
    text-align: left;
}

.file-list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 20px;
}

.file.box {
    flex-basis: 130px;
}

.file.box::before {
    content: "";
    display: block;
    float: left;
    padding-top: 100%;
}
.file.box div {
    padding: 10px;
}
.file.box img {
    width: 100%;
}
.file.box p {
    margin: 0;
}

@media only screen and (prefers-color-scheme: dark) {
    .file.box img {
        filter: invert();
    }
}
[data-theme="dark"] .file.box img {
    filter: invert();
}

.dd-icon {
    display: inline-block;
    transition: transform 0.2s;
}
.dd-icon.collapsed {
    transform: rotate(-90deg);
}
</style>

<div class="file-nav">
    <h1>Path: {current || '/'}</h1>
    <button class="box click-move-down"
        on:click={goBack}>Back</button>
    <button class="box click-move-down"
        on:click={goForward}>Forward</button>
    <button class="box click-move-down"
        on:click={goUp}>Up</button>
</div>

{#if dirList.length > 0}
    <h3 on:click={toggleDirs}><div class="dd-icon" class:collapsed={dirsCollapsed}><Fa icon={faChevronDown} fw /></div> Directories</h3>
    {#if !dirsCollapsed}
        <section class="file-list dirs" transition:slide|local={{ duration: 150 }}>
            {#each dirList as dir}
            <div class="file box click-move-down">
                <a href={`/ftpdir${current}/${dir}`}>
                    <div>
                        <img src={folderIcon} alt="folder icon">
                        <p>{dir}</p>
                    </div>
                </a>
            </div>
            {/each}
        </section>
    {/if}
{/if}
{#if fileList.length > 0}
    <h3>Files</h3>
    <section class="file-list files">
        {#each fileList as file}
            <div class="file box click-move-down">
                <a href={`/getfile/files${current}/${file}`}>
                    <div>
                        <img src={fileIcon} alt="file icon">
                        <p>{file}</p>
                    </div>
                </a>
            </div>
        {/each}
    </section>
{/if}