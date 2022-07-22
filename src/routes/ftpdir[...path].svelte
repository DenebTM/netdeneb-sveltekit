<script lang="ts">
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { slide } from 'svelte/transition'
import { sitename } from '$lib/js/globals'

import Fa from 'svelte-fa'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import folderIcon from '/src/assets/icons/folder.svg'
import { extIcons } from '$lib/js/fileTypes'
const getIcon = (filename : string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || 'default'
    
    return extIcons[ext] || extIcons.default
}

export let dirList  : Array<string>
export let fileList : Array<string>

const goUp = () => goto('/ftpdir' + current.replace(/\/[^\/]*$/, ''))
const goBack = () => window.history.back()
const goForward = () => window.history.forward()

let dirsCollapsed = false
const toggleDirs = () => dirsCollapsed = !dirsCollapsed

let current : string
$: current = $page.params.path
</script>

<svelte:head>
    <title>{ `${sitename} - Files: ${current || '/'}` }</title>
    <meta name="description" content={fileList.toString()}>
</svelte:head>

<style>
.file-nav, h3 {
    text-align: left;
}

.file-list {
    display: flex;
    flex-flow: row wrap;
    margin: 0 -10px 20px 0;
}

.margin-box {
    margin: 0;
    padding: 0 10px 10px 0;
    transition: width 0.25s ease, height 0.25s ease;
}

button.box {
    margin: 0 10px 10px 0;
}

.dd-icon {
    display: inline-block;
    transition: transform 0.2s;
}
.dd-icon.collapsed {
    transform: rotate(-90deg);
}

.file.box {
    word-wrap: break-word;
}
.file.box div {
    padding: 10px;
}
.file.box img {
    width: 100%;
    transition: filter 0.2s;
}
.file.box p {
    margin: 0;
    transition: color 0.2s;
}

[data-theme="dark"] .file.box img {
    filter: invert();
}
@media only screen and (prefers-color-scheme: dark) {
    .file.box img {
        filter: invert();
    }
}

@media screen and (min-width: 801px) {
    .margin-box { width: 12.5%; }
}
@media screen and (max-width: 800px) {
    .margin-box { width: 16.66%; }
}
@media screen and (max-width: 540px) {
    .margin-box { width: 25%; }
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
    <h3 style="cursor: pointer" on:click={toggleDirs}><div class="dd-icon" class:collapsed={dirsCollapsed}><Fa icon={faChevronDown} fw /></div> Directories</h3>
    {#if !dirsCollapsed}
        <section class="file-list dirs" transition:slide|local={{ duration: 150 }}>
            {#each dirList as dir}
            <div class="margin-box">
                <div class="file box click-move-down">
                    <a href={`/ftpdir${current}/${dir}`}>
                        <div>
                            <img src={folderIcon} alt="folder icon">
                            <p>{dir}</p>
                        </div>
                    </a>
                    </div>
                </div>
            {/each}
        </section>
    {/if}
{/if}
{#if fileList.length > 0}
    <h3>Files</h3>
    <section class="file-list files">
        {#each fileList as file}
            <div class="margin-box">
                <div class="file box click-move-down">
                    <a href={`/getfile/files${current}/${file}`}>
                        <div>
                            <img src={getIcon(file)} alt="file icon">
                            <p>{file}</p>
                        </div>
                    </a>
                </div>
            </div>
        {/each}
    </section>
{/if}