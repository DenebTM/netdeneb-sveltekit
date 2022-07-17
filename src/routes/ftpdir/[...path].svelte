<!-- Not done yet -->

<script lang="ts">
import { beginNavigation, finishNavigation, setTitle } from '$lib/js/tools'
import { page } from '$app/stores'

import folderIcon from '/src/assets/icons/folder.png'
import fileIcon from '/src/assets/icons/file.png'

export let dirList  : Array<string>
export let fileList : Array<string>

beginNavigation()
setTitle('Public files')

$: isRoot = $page.params.path == ''
$: current = '/' + $page.params.path + (!isRoot ? '/' : '')
$: current && beginNavigation(), finishNavigation()

finishNavigation()
</script>

<style>
h1, h3 {
    text-align: left;
}

.file-list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 20px;
}

.file-box {
    margin: 0 10px 10px 0;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    flex-basis: 150px;
    box-shadow: 0 0 3px 3px var(--shadow-color);
}
.file-box::before {
    content: "";
    display: block;
    float: left;
    padding-top: 100%;
}
.file-box:hover {
    background-color: var(--background-hover);
}

.file-box a {
    text-decoration: none;
}

.file-box div {
    padding: 10px;
}
.file-box img {
    width: 100%;
}
.file-box p {
    margin: 0;
}

@media only screen and (prefers-color-scheme: dark) {
    .file-box img {
        filter: invert();
    }
}
[data-theme="dark"] .file-box img {
    filter: invert();
}
</style>

<h1>List of {current}</h1>
{#if dirList.length > 0}
    <h3>Directories</h3>
    <section class="file-list dirs">
        {#each dirList as dir}
        <div class="file-box dir click-move-down">
            <a href={`/ftpdir${current}${dir}`}>
                <div>
                    <img src={folderIcon} alt="folder icon">
                    <p>{dir}</p>
                </div>
            </a>
        </div>
        {/each}
    </section>
{/if}
{#if fileList.length > 0}
    <h3>Files</h3>
    <section class="file-list files">
        {#each fileList as file}
            <div class="file-box file click-move-down">
                <a href={`/getfile/files${current}${file}`}>
                    <div>
                        <img src={fileIcon} alt="file icon">
                        <p>{file}</p>
                    </div>
                </a>
            </div>
        {/each}
    </section>
{/if}