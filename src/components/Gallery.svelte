<script lang="ts">
  import { fade } from 'svelte/transition'
  import { disableScroll, enableScroll } from '~/util/tools'
  import { page } from '$app/stores'
  import { afterNavigate } from '$app/navigation'

  export let artBaseURL: string = '/art'

  export let imgList: ArtList
  export let gap = 10
  export let hover = true

  const titleImage = imgList[0]
  const galleryImages = imgList.slice(1)

  let maxColWidth = 250
  let galleryWidth = 750
  let columns: Array<ArtList> = []

  const parseURLImg = (search?: string) => {
    let imgId = search?.substring(search?.indexOf('img=') + 4)
    if (imgId?.includes('&')) imgId = imgId.slice(0, imgId.indexOf('&'))

    return imgList.find(item => item.id === imgId)
  }

  let modalImg = parseURLImg($page.url.search)
  const changeModalImage = () => {
    modalImg = parseURLImg($page.url.search)
    if (modalImg) disableScroll()
    else enableScroll()
  }

  const updateGallery = (colCount: number) => {
    if (colCount == 0) return

    let newColumns: Array<ArtList> = Array(colCount)
      .fill([])
      .map(() => [])

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
  $: gridStyle = `grid-template-columns: repeat(${columnCount}, 1fr); --gap: ${gap}px; gap: var(--gap)`

  afterNavigate(changeModalImage)
</script>

<svelte:window bind:innerHeight />
<svelte:head>
  {#if modalImg}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="og:title" content={modalImg.description} />
    <meta property="og:image" content={$page.url.origin + modalImg.full} />
    <meta property="og:image:type" content={modalImg.mime} />
    <meta property="og:image:width" content={modalImg.width.toString()} />
    <meta property="og:image:height" content={modalImg.height.toString()} />
  {:else}
    <meta name="description" content="My ref, and more" />
  {/if}
</svelte:head>

<div class="gallery" bind:clientWidth={galleryWidth}>
  <a
    class="gallery-title gallery-img"
    class:gallery-hover={hover}
    tabindex={modalImg ? -1 : undefined}
    style="display: block"
    style:width={columnCount > 2 ? '70%' : '100%'}
    data-sveltekit-replacestate
    href={`?img=${titleImage?.id}`}
    role="button"
    data-sveltekit-noscroll
  >
    <img src={titleImage?.fileName} alt={titleImage?.description} />
    <span style="display: block; width: 100%; line-height: 1.5"
      >{titleImage?.description}</span
    >
  </a>
  <div class="gallery-columns" style={gridStyle}>
    {#each columns as col}
      <div class="column">
        {#each col as img, i}
          <a
            class="gallery-img"
            class:gallery-hover={hover}
            tabindex={modalImg ? -1 : undefined}
            data-sveltekit-replacestate
            href={`?img=${img.id}`}
            role="button"
            data-sveltekit-noscroll
          >
            <img src={img.fileName} alt={img.description} />
          </a>
        {/each}
      </div>
    {/each}
  </div>

  {#if modalImg}
    <a
      class="btn modal-close fixed-color"
      data-sveltekit-replacestate
      href={artBaseURL}
      transition:fade={{ duration: 100 }}
    >
      <i class="bx bx-md bx-x fixed-color" />
    </a>
    <div
      class="gallery-modal"
      transition:fade={{ duration: 100 }}
      style={modalStyle}
    >
      <div class="modal-row image">
        <a
          data-sveltekit-replacestate
          href={artBaseURL}
          data-sveltekit-noscroll
          tabindex="-1"
        >
          <img src={modalImg?.fileName} alt={modalImg?.artistLink} />
        </a>
      </div>
      <div class="modal-row details">
        <span>{modalImg?.description}</span>
        <a class="btn" role="button" href={modalImg?.artistLink}>
          <i class="bx bx-sm bx-link-external fixed-color" />
        </a>
      </div>
    </div>
  {/if}
</div>

<style>
  .gallery-title {
    margin: 0 auto 15px auto;
  }
  .gallery-columns {
    display: grid;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .gallery-title img,
  .column img {
    width: 100%;
  }
  .column .gallery-img:not(:last-child) img {
    margin-bottom: var(--gap);
  }
  .gallery-img,
  .gallery-img * {
    cursor: zoom-in;
  }
  .gallery-img {
    display: block;
    line-height: 0;
  }
  .gallery-img img {
    border-radius: var(--border-radius);
  }
  .gallery-hover {
    transition: 0.2s;
    filter: brightness(90%);
    position: relative;
  }
  .gallery-hover:hover,
  .gallery-hover:focus-visible {
    filter: none;
    transform: scale(1.03);
    z-index: 99;
    background-color: unset;
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
    cursor: initial;
  }
  .modal-close {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 101;
  }
  .modal-row *,
  .modal-close {
    color: white !important;
  }
  .modal-row.image a {
    height: calc(100vh - 80px);
    cursor: zoom-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .modal-row.image img {
    object-fit: scale-down;
    max-height: 100%;
    max-width: 100%;
  }
  .modal-row.details {
    background: rgba(0, 0, 0, 0.95);
  }
  .modal-row.details span {
    line-height: 80px;
  }

  .btn {
    display: inline-block;
    vertical-align: middle;
    padding: 0;
    border: none;
    box-shadow: none;
    height: 50px;
    width: 50px;
    line-height: 50px;
    margin-left: 5px;
  }
</style>
