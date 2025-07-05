<script lang="ts">
  interface Props {
    imageList: ArtList
    gap?: number
    hover?: boolean
  }

  const { imageList: imgList, gap = 10, hover = true }: Props = $props()

  const [titleImage, ...galleryImages] = imgList

  const maxColWidth = 250
  let galleryWidth = $state(750)
  let columns: ArtList[] = $state([])

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
</script>

<div class="gallery" bind:clientWidth={galleryWidth}>
  <a
    class="gallery-img gallery-title"
    class:gallery-hover={hover}
    style:width={columnCount > 2 ? '70%' : '100%'}
    href={`/art/${titleImage.id}`}
    data-sveltekit-replacestate
    data-sveltekit-noscroll>
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
            href="/art/{img.id}"
            class="gallery-img"
            class:gallery-hover={hover}
            data-sveltekit-replacestate
            data-sveltekit-noscroll>
            <figure>
              <img src={img.fileName} alt={img.description} />
            </figure>
          </a>
        {/each}
      </div>
    {/each}
  </div>
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
  a {
    text-decoration: none !important;
  }
</style>
