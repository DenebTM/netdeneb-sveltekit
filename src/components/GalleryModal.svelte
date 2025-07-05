<script lang="ts">
  import { fade } from 'svelte/transition'
  import { page } from '$app/state'

  interface Props {
    modalImg: ArtItemWithMetadata
  }

  const { modalImg }: Props = $props()

  let innerHeight = $state(0)
  const modalStyle = $derived(`grid-template-rows: ${innerHeight - 80}px 1fr;`)
</script>

<svelte:window bind:innerHeight />
<svelte:head>
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="og:title" content={modalImg.description} />
  <meta property="og:image" content={page.url.origin + modalImg.full} />
  <meta property="og:image:type" content={modalImg.mime} />
  <meta property="og:image:width" content={modalImg.width.toString()} />
  <meta property="og:image:height" content={modalImg.height.toString()} />
</svelte:head>

<a
  aria-label="close full image view"
  class="btn dark modal-close fixed-color"
  data-sveltekit-replacestate
  href="/art/"
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
      href="/art/"
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

<style>
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
