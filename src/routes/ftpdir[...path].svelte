<script lang="ts">
import { afterNavigate, goto } from '$app/navigation'
import { page } from '$app/stores'
import { slide } from 'svelte/transition'
import { sitename } from '$lib/js/globals'
import { browser } from '$app/env'
import { afterUpdate } from 'svelte'

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
export let availableThumbs : Record<string, string>

const thumbsLoaded: Record<string, boolean> = {}
const updateImageSources = (fl: Array<string>) => {
    return fl.reduce(
        (acc, curr) => {
            thumbsLoaded[curr] = false
            return Object.assign(acc, { [curr]: getIcon(curr)})
        },
        {} as Record<string, string>)
}

const updateThumbs = async (basePath: string) => {
    if (!browser) return

    const needThumbs = fileList
        .filter(f => !availableThumbs[f] && isImage(f))
        .map(f => `${basePath}/${f}`)
    
    if (needThumbs.length == 0) return

    const partSize = needThumbs.length > 16 ? 8 : needThumbs.length
    const numParts = partSize < needThumbs.length ? Math.ceil(needThumbs.length / partSize) : 1
    for (let part = 0; part < numParts; part++) {
        const startIndex = part * partSize,
              endIndex = Math.min(needThumbs.length, startIndex + partSize)

        setTimeout(() => {
            fetch('/createThumbs', { method: 'POST', body: JSON.stringify(
                needThumbs.slice(startIndex, endIndex)
            )})
            .then(async data => {
                const newThumbs = (await data.json() as Record<string, string>)
                for (const t in newThumbs) {
                    availableThumbs[t] = newThumbs[t]
                    imageSources[t] = newThumbs[t]
                    thumbsLoaded[t] = true
                }
            })
        }, part * 500)
    }
}

$: current = $page.params.path
$: imageSources = updateImageSources(fileList)
$: updateThumbs(current)

afterUpdate(() => {
    for (const t in availableThumbs) {
        thumbsLoaded[t] = true
    }
    imageSources = Object.assign(imageSources, availableThumbs)
})

const isImage = (f: string) => /\.(jpe?g|png|gif|webp|bmp)$/.test(f.toLowerCase())

const goUp = () => goto('/ftpdir' + current.replace(/\/[^\/]*$/, ''))
const goBack = () => window.history.back()
const goForward = () => window.history.forward()

let dirsCollapsed = false
const toggleDirs = () => dirsCollapsed = !dirsCollapsed
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

[data-theme="dark"] .file.box img:not(.thumb) {
    filter: invert();
}
@media only screen and (prefers-color-scheme: dark) {
    .file.box img:not(.thumb) {
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
                    <a href={`/files${current}/${file}`}>
                        <div>
                            <img src={imageSources[file]} class={isImage(file) && thumbsLoaded[file] == true ? 'thumb' : ''} alt="file icon">
                            <p>{file}</p>
                        </div>
                    </a>
                </div>
            </div>
        {/each}
    </section>
{/if}