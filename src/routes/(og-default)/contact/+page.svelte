<script lang="ts">
  import type { PageServerData } from './$types'

  import { page } from '$app/stores'
  const { name: sitename }: SiteMetadata = $page.data.siteMetadata

  export let data: PageServerData
</script>

<svelte:head>
  <title>{`${sitename} - Contact`}</title>
  <meta property="og:title" content="Contact" />
  <meta name="description" content="How to contact the mane" />
  <meta property="og:description" content="How to contact the mane" />
</svelte:head>

<h2 class="page-title">Yap at me!</h2>

<div class="page-content">
  <section id="email">
    <p>
      You may contact me via
      <a href="mailto:deneb@screee.ee">
        <i class="inline-icon bx bx-sm bx-envelope" />&nbsp;<span>Email:</span
        >&nbsp;deneb@screee.ee
      </a><br />
      Please direct any professional inquiries there, and there only.
    </p>
  </section>

  <section id="socials">
    <p>Additionally, I am available on the following platforms:</p>
    <ul>
      {#each data.socials as { platform, icon, href, text }}
        <li>
          <a rel="me" {href}>
            <i class={`inline-icon bx bx-sm ${icon}`} />&nbsp;<span
              >{platform}:</span>
            {text}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  section {
    text-align: left;
  }
  ul {
    padding-left: 1em;
  }
  li {
    list-style-type: none;
    margin-bottom: 0.75em;
  }

  a:hover {
    font-weight: 600;
  }
</style>
