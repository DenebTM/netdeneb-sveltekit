<script lang="ts">
  import { fade } from 'svelte/transition'
  import { disableScroll, enableScroll } from '~/util/tools'
  import { afterNavigate } from '$app/navigation'

  import { page } from '$app/state'
  const {
    data: { siteMetadata },
  } = page

  interface Props {
    artBaseURL?: string
    imgList: ArtList
    gap?: number
    hover?: boolean
  }

  const {
    artBaseURL = '/art',
    imgList,
    gap = 10,
    hover = true,
  }: Props = $props()

  const [titleImage, ...galleryImages] = imgList

  const maxColWidth = 250
  let galleryWidth = $state(750)
  let columns: ArtList[] = $state([])

  const parseURLImg = (search?: string): ArtItemWithMetadata | undefined => {
    let imgId = search?.substring(search.indexOf('img=') + 4)
    if (imgId?.includes('&')) imgId = imgId.slice(0, imgId.indexOf('&'))

    return imgList.find(item => item.id === imgId)
  }

  let modalImg = $state(parseURLImg(page.url.search))
  const changeModalImage = (): void => {
    modalImg = parseURLImg(page.url.search)
    if (modalImg) disableScroll()
    else enableScroll()
  }

  const updateGallery = (colCount: number): void => {
    if (colCount === 0) return

    const newColumns: ArtList[] = Array(colCount)
      .fill([])
      .map(() => [])

    let col = 0
    for (const img of galleryImages) {
      newColumns[col].push(img)
      col = (col + 1) % colCount
    }

    columns = newColumns
  }

  let innerHeight = $state(0)
  const modalStyle = $derived(`grid-template-rows: ${innerHeight - 80}px 1fr;`)

  const columnCount = $derived(Math.floor(galleryWidth / maxColWidth))

  // initial column count for non-js rendering
  updateGallery(3)

  // dynamically update column count
  $effect(() => {
    updateGallery(columnCount)
  })
  const gridStyle = $derived(
    `grid-template-columns: repeat(${columnCount}, 1fr); --gap: ${gap}px; gap: var(--gap)`
  )

  afterNavigate(changeModalImage)
</script>

<svelte:window bind:innerHeight />
<svelte:head>
  {#if modalImg}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="og:title" content={modalImg.description} />
    <meta property="og:image" content={page.url.origin + modalImg.full} />
    <meta property="og:image:type" content={modalImg.mime} />
    <meta property="og:image:width" content={modalImg.width.toString()} />
    <meta property="og:image:height" content={modalImg.height.toString()} />
  {:else}
    <meta name="og:title" content="Art gallery" />
    <meta property="og:image" content={siteMetadata.titleImage.path} />
    <meta name="og:description" content="My ref, and other commissions I got" />
    <meta name="description" content="My ref, and other commissions I got" />
  {/if}
</svelte:head>

<div class="gallery" bind:clientWidth={galleryWidth}>
  <a
    class="gallery-img gallery-title"
    class:gallery-hover={hover}
    style:width={columnCount > 2 ? '70%' : '100%'}
    href={`?img=${titleImage.id}`}
    data-sveltekit-replacestate
    data-sveltekit-noscroll
    tabindex={modalImg ? -1 : undefined}>
    <figure>
      <img src={titleImage.fileName} alt={titleImage.description} />
      <figcaption style="line-height: 1.5">
        {titleImage.description}
      </figcaption>
    </figure>
  </a>
  <div class="gallery-columns" style={gridStyle}>
    {#each columns as col}
      <div class="gallery-column">
        {#each col as img, i}
          <a
            href={`?img=${img.id}`}
            class="gallery-img"
            class:gallery-hover={hover}
            data-sveltekit-replacestate
            data-sveltekit-noscroll
            tabindex={modalImg ? -1 : undefined}>
            <figure>
              <img src={img.fileName} alt={img.description} />
            </figure>
          </a>
        {/each}
      </div>
    {/each}
  </div>

  {#if modalImg}
    <a
      aria-label="close full image view"
      class="btn dark modal-close fixed-color"
      data-sveltekit-replacestate
      href={artBaseURL}
      transition:fade={{ duration: 100 }}>
      <i class="bx bx-md bx-x fixed-color"></i>
    </a>
    <div
      class="gallery-modal"
      transition:fade={{ duration: 100 }}
      style={modalStyle}>
      <div class="modal-row image">
        <a
          data-sveltekit-replacestate
          href={artBaseURL}
          data-sveltekit-noscroll
          tabindex="-1">
          <img src={modalImg.fileName} alt={modalImg.artistLink} />
        </a>
      </div>
      <div class="modal-row details">
        <div class="description-wrapper">
          <span>{modalImg.description}</span>
          <a
            aria-label="open artist's page"
            class="btn dark"
            role="button"
            href={modalImg.artistLink}>
            <i class="bx bx-sm bx-link-external fixed-color"></i>
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .gallery-columns {
    display: grid;
  }
  .gallery-column {
    display: flex;
    flex-direction: column;
  }
  .gallery-column .gallery-img:not(:last-child) img {
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
  .gallery-img.gallery-title {
    margin: 0 auto 15px auto;
  }
  .gallery-img figure {
    margin: 0;
  }
  .gallery-img img {
    border-radius: var(--border-radius);
    width: 100%;
  }
  .gallery-hover {
    transition: 0.2s;
    position: relative;
    filter: none;
  }

  .gallery:has(.gallery-hover:hover)
    .gallery-hover:not(:hover):not(:focus-visible),
  .gallery:has(.gallery-hover:focus-visible)
    .gallery-hover:not(:hover):not(:focus-visible) {
    filter: brightness(75%);
  }

  .gallery-hover:hover,
  .gallery-hover:focus-visible {
    filter: drop-shadow(0 0 5px var(--primary));
    transform: scale(1.03);
    z-index: 1;
    background-color: unset;
  }
  .gallery-modal {
    position: fixed;
    z-index: 2;
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
    z-index: 3;
  }
  .modal-row *,
  .modal-close {
    color: white !important;
  }
  .modal-row.image a {
    text-decoration: none !important;
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

  .description-wrapper {
    width: 100vw;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
  }
  .description-wrapper > :first-child {
    flex-shrink: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .description-wrapper > :last-child {
    flex-shrink: 0;
  }

  a {
    text-decoration: none !important;
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
