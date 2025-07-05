<script lang="ts">
  import { fade } from 'svelte/transition'
  import { page } from '$app/state'

  interface Props {
    image: ArtItemWithMetadata
  }

  const { image }: Props = $props()

  const fadeDuration = 100
</script>

<svelte:head>
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="og:title" content={image.description} />
  <meta property="og:image" content={page.url.origin + image.full} />
  <meta property="og:image:type" content={image.mime} />
  <meta property="og:image:width" content={image.width.toString()} />
  <meta property="og:image:height" content={image.height.toString()} />
</svelte:head>

<div class="gallery-modal" transition:fade={{ duration: fadeDuration }}>
  <a
    aria-label="close full image view"
    class="btn dark modal-close fixed-color"
    data-sveltekit-replacestate
    href="/art"
    transition:fade={{ duration: fadeDuration }}>
    <i class="bx bx-md bx-x fixed-color"></i>
  </a>
  <div class="modal-row image">
    <a
      data-sveltekit-replacestate
      href="/art"
      data-sveltekit-noscroll
      tabindex="-1">
      <img src={image.fileName} alt={image.artistLink} />
    </a>
  </div>
  <div class="modal-row details">
    <div class="description-wrapper">
      <span>{image.description}</span>
      <a
        aria-label="open artist's page"
        class="btn dark"
        role="button"
        href={image.artistLink}>
        <i class="bx bx-sm bx-link-external fixed-color"></i>
      </a>
    </div>
  </div>
</div>

<style>
  .gallery-modal {
    --desc-height: 80px;
    --button-size: 50px;
  }

  .gallery-modal {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-rows: 1fr var(--desc-height);
    cursor: initial;
  }
  .modal-close {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 3;
  }
  .modal-row {
    min-height: 0;
  }
  .modal-row *,
  .modal-close {
    color: white !important;
  }
  .modal-row.image a {
    height: 100%;
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
    line-height: var(--desc-height);
  }

  .description-wrapper {
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

  .btn {
    display: inline-block;
    vertical-align: middle;
    padding: 0;
    border: none;
    box-shadow: none;
    height: var(--button-size);
    width: var(--button-size);
    line-height: var(--button-size);
    margin-left: 5px;
    text-decoration: none;
  }
</style>
