<script lang="ts">
import { fade } from 'svelte/transition'
import Fa from 'svelte-fa'
import { faClose, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { disableScroll, enableScroll } from '$lib/js/tools';
import { goto } from '$app/navigation';

export let imgList: ArtList
export let gap = 10
export let hover = true

const titleImage = imgList.at(0)
const galleryImages = imgList.slice(1)

let maxColWidth = 250
let galleryWidth = 0
let columns: Array<ArtList> = []

let modalVisible = false
let modalImg: ArtItem
const showModal = (img?: ArtItem) => {
    if (img) modalImg = img
    modalVisible = true
    disableScroll()
}
const hideModal = () => {
    modalVisible = false
    enableScroll()
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
</script>

<svelte:window bind:innerHeight={innerHeight} />

<div class="gallery" bind:clientWidth={galleryWidth}>
    <div class="gallery-title gallery-img" class:gallery-hover={hover} on:click={() => showModal(titleImage)}>
        <img src={titleImage?.fileName} alt={titleImage?.description}>
        <span>{titleImage?.description}</span>
    </div>
    <div class="gallery-columns" style={gridStyle}>
        {#each columns as col}
            <div class="column">
                {#each col as img, i}
                    <img class="gallery-img" class:gallery-hover={hover} style={`margin-bottom: ${(i < col.length) ? gap : 0}px`}
                        src={img.fileName} alt={img.description} on:click={() => showModal(img)}>
                {/each}
            </div>
        {/each}
    </div>

    {#if modalVisible}
        <button class="modal-close" on:click={hideModal} transition:fade={{duration: 100}}>
            <Fa icon={faClose} scale=1.5 />
        </button>
        <div class="gallery-modal" on:click={hideModal} transition:fade={{duration: 100}} style={modalStyle}>
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
    {/if}
</div>

<style>
.gallery-title {
    margin-bottom: 20px;
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
.gallery-img {
    cursor: pointer;
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