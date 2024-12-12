<script lang="ts">
  import WikiLink from '~/components/WikiLink.svelte'
  import type { PageServerData } from './$types'

  import { page } from '$app/stores'
  const { name: sitename }: SiteMetadata = $page.data.siteMetadata

  export let data: PageServerData

  const friendlinks = [
    'sterophonick.github.io',
    'aquamarine.gay',
    'ashiecorner.xyz',
    'zencorner.xyz',
    'maidado.xyz',
    'foxboy.dev',
    'foxgirl.dev',
    'eeep.ee',
    'gry.sh',
    'j4.lc',
  ]
</script>

<svelte:head>
  <title>{`${sitename} - Contact`}</title>
  <meta property="og:title" content="Contact" />
  <meta name="description" content="How to contact the mane" />
  <meta property="og:description" content="How to contact the mane" />
</svelte:head>
<div class="page-content">
  <div class="page-column">
    <h2>Yap at me!</h2>
    <section id="email">
      <p>
        You may contact me via
        <a rel="me" href="mailto:deneb@screee.ee">
          <i class="inline-icon bx bx-sm bx-envelope" />&nbsp;<span>Email:</span
          >&nbsp;deneb@screee.ee
        </a><br />
        Please direct any professional inquiries there, and there only.
      </p>
    </section>

    <section id="socials">
      <p>You can also find me on these platforms:</p>
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

  <div class="page-column">
    <section id="cool-stuff">
      <h2>Et cetera</h2>
      <ul>
        <li>
          <a href="https://screee.ee/">screee.ee</a>
          — fencs :&gt;
        </li>
        <li>
          <a href="https://it-syndikat.org/">IT-Syndikat</a>
          — <WikiLink page="Hackerspace" /> in Innsbruck
        </li>
        <li>
          <a href="https://slowroads.io/">slow roads</a>
          — chill driving vibes
        </li>
        <li>
          <a href="https://cyberchef.com/">CyberChef</a>
          — encode/decode most (text) formats
        </li>
      </ul>
    </section>

    <section id="friends">
      <h2>Friends' websites</h2>
      <ul>
        {#each friendlinks as domain}
          <li><a href={`https://${domain}`}>{domain}</a></li>
        {/each}
      </ul>
    </section>

    <!-- <section id="artists">
      <h3>Furry artists you should look at</h3>
      <p>(see also <a href="/art">/art</a> :3)</p>
      <ul>
        <li><a href=""></a></li>
      </ul>
    </section> -->
  </div>
</div>

<style>
  .page-content {
    text-align: left;
  }

  .page-column {
    flex: 1;
  }

  @media not (max-width: 744px) {
    .page-content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .page-content .page-column > h2,
    .page-content section:first-child h2 {
      margin-top: 0;
    }
  }

  ul {
    padding-left: 1em;
  }
  #socials li {
    list-style-type: none;
    margin-bottom: 0.75em;
  }
  a[rel='me']:hover {
    font-weight: 600;
  }
</style>
