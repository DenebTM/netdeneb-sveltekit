<script lang="ts">
  interface Props {
    imageList: ArtList
    gap?: number
    columnWidth?: number
    hover?: boolean
  }

  const {
    imageList,
    gap = 10,
    columnWidth = 250,
    hover = true,
  }: Props = $props()

  const [titleImage, ...galleryImages] = imageList
</script>

<div class="gallery">
  <a
    class="gallery-img gallery-title"
    class:gallery-hover={hover}
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
  <div
    class="gallery-columns"
    style="--gap: {gap}px; --column-width: {columnWidth}px">
    {#each galleryImages as image, i}
      <a
        href="/art/{image.id}"
        class="gallery-img"
        class:gallery-hover={hover}
        data-sveltekit-replacestate
        data-sveltekit-noscroll>
        <img class="gallery-img" src={image.fileName} alt={image.description} />
      </a>
    {/each}
  </div>
</div>

<style>
  .gallery-columns {
    display: inline-block;
    width: 100%;
    column-width: var(--column-width);
    column-gap: var(--gap);
  }
  .gallery-img,
  .gallery-img * {
    cursor: zoom-in;
  }
  .gallery-img {
    display: block;
    line-height: 0;
    height: min-content;
  }
  .gallery-img:not(:last-child) {
    margin-bottom: var(--gap);
  }
  .gallery-img.gallery-title {
    margin: 0 auto 15px auto;
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
