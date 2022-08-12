<script lang="ts">
import { fade } from 'svelte/transition'
import Fa from 'svelte-fa'
import { faClose, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { disableScroll, enableScroll } from '$lib/js/tools'
import { page } from '$app/stores'
import { afterNavigate } from '$app/navigation'

export let imgList: ArtList
export let gap = 10
export let hover = true

const titleImage = imgList.at(0)
const galleryImages = imgList.slice(1)

let maxColWidth = 250
let galleryWidth = 0
let columns: Array<ArtList> = []

const parseURLImg = (search?: string) => {
    let img = search?.substring(search?.indexOf('img=') + 4)
    if (img?.includes('&')) img = img.slice(0, img.indexOf('&'))

    if (img == 'ref') return titleImage

    const idx = parseInt(img ?? '')
    if (!isNaN(idx) && idx >= 1 && idx <= galleryImages.length)
        return galleryImages[idx-1]

    return undefined
}

let modalImg = parseURLImg($page.url.search)
const switchFullImage = () => {
    function showModal(img?: ArtItem) {
        if (img) modalImg = img
        disableScroll()
    }
    function hideModal() {
        modalImg = undefined
        enableScroll()
    }

    const img = parseURLImg($page.url.search)
    if (!img) hideModal()
    else showModal(img)
}

const updateGallery = (colCount: number) => {
    if (colCount == 0) return

    let newColumns: Array<ArtList> = Array(colCount).fill([]).map(() => [])

    let col = 0
    for (let img of galleryImages) {
        newColumns[col].push(img)
        col = (col + 1) % colCount
    }
    
    columns = newColumns
}

let innerHeight = 0
$: modalStyle = `grid-template-rows: ${innerHeight - 80}px 1fr;`

$: columnCount = Math.floor(galleryWidth / maxColWidth)
$: updateGallery(columnCount)
$: gridStyle = `grid-template-columns: repeat(${columnCount}, 1fr); gap: ${gap}px`

afterNavigate(switchFullImage)
</script>

<svelte:window bind:innerHeight={innerHeight} />
<svelte:head>
    <meta name="description" content="My ref, and more!">
    {#if modalImg}
        <meta property="og:title" content={$page.url.origin + modalImg.description}>
        <meta property="og:image" content={modalImg.fileName}>
    {/if}
</svelte:head>

<div class="gallery" bind:clientWidth={galleryWidth}>
    <div class="gallery-title gallery-img" style:width={columnCount > 2 ? '70%' : '100%'} class:gallery-hover={hover}>
        <a href="?img=ref">
            <img src={titleImage?.fileName} alt={titleImage?.description}>
            <span>{titleImage?.description}</span>
        </a>
    </div>
    <div class="gallery-columns" style={gridStyle}>
        {#each columns as col}
            <div class="column">
                {#each col as img, i}
                    <a class="gallery-img" href={`?img=${galleryImages.indexOf(img) + 1}`}>
                        <img class:gallery-hover={hover} style={`margin-bottom: ${(i < col.length) ? gap : 0}px`}
                            src={img.fileName} alt={img.description}>
                    </a>
                {/each}
            </div>
        {/each}
    </div>

    {#if modalImg}
        <a href="/art">
            <button class="modal-close" transition:fade={{duration: 100}}>
                <Fa icon={faClose} scale=1.5 />
            </button>
            <div class="gallery-modal" transition:fade={{duration: 100}} style={modalStyle}>
                <div class="modal-row image">
                    <img src={modalImg?.fileName} alt={modalImg?.artistLink}>
                </div>
                <div class="modal-row details">
                    <span>{modalImg?.description}</span>
                    <a class="btn" href={modalImg?.artistLink}>
                        <Fa icon={faArrowUpRightFromSquare} scale=1.25 />
                    </a>
                </div>
            </div>
        </a>
    {/if}
</div>

<style>
.gallery-title {
    margin: 0 auto 20px auto;
}
.gallery-columns {
    display: grid;
}
.column {
    display: flex;
    flex-direction: column;
}
.gallery-title img, .column img {
    width: 100%;
}
.gallery-img, .gallery-img * {
    cursor: zoom-in;
}
.gallery-hover {
    transition: 0.2s;
    filter: brightness(90%);
    position: relative;
}
.gallery-hover:hover {
    filter: none;
    transform: scale(1.03);
    z-index: 99;
}
.gallery-modal {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: grid;
    /* grid-template-rows set by JavaScript */
}
.modal-close {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 101;
}
.modal-row img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.modal-row span {
    line-height: 80px;
}
.modal-row.details {
    background: rgba(0, 0, 0, 0.95);
}

button, .btn {
    display: inline-block;
    padding: 0;
    border: none;
    box-shadow: none;
    height: 50px;
    width: 50px;
    line-height: 50px;
    margin-left: 5px;
}
</style>