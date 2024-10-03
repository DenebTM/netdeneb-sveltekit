<script lang="ts">
  import { sitename } from '~/util/globals'
  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<svelte:head>
  <title>{`${sitename} - Contact`}</title>
  <meta name="description" content="Socials and contact details" />
</svelte:head>

<h2>Yap at me!</h2>

<section id="email">
  <p>
    You may contact me via email:
    <a href="mailto:deneb@screee.ee" class="inline-link">
      <i class="inline-icon bx bx-sm bx-envelope" />&nbsp;deneb@screee.ee
    </a><br />
    Please direct any professional inquiries there, and there only.
  </p>
</section>

<section id="socials">
  <p>Additionally, I am available on the following platforms:</p>
  <ul>
    {#each data.socials as { icon, href, text }}
      <li>
        <a class="inline-link" rel="me" {href}>
          <i class={`inline-icon bx bx-sm ${icon}`} />
          <span>{text}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>

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

  a span:hover {
    font-weight: 600;
  }
</style>
