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
    'yummy.cricket',
    'zencorner.xyz',
    'm.furrypri.de',
    'maidado.xyz',
    'foxboy.dev',
    'foxgirl.dev',
    'eeep.ee',
    'gry.sh',
    'j4.lc',
  ]
</script>

<svelte:head>
  <title>{`${sitename} - Links`}</title>
  <meta property="og:title" content="Links" />
  <meta
    name="description"
    content="The mane's socials, friends, and other things" />
  <meta
    property="og:description"
    content="The mane's socials, friends, and other things" />
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
      <h2>Things On The Web</h2>
      <ul>
        <li>
          <a href="https://it-syndikat.org/">IT-Syndikat</a>
          — <WikiLink page="Hackerspace" /> in Innsbruck
        </li>
        <li>
          <a href="https://bahn.expert/">bahn.expert</a>
          — real-time train info, DB and others
        </li>
        <li>
          <a href="https://traewelling.de/">Träwelling</a>
          — log and share your train journeys
        </li>
        <li>
          <a href="https://travelynx.de/">Travelynx</a>
          — log your train journeys more privately
        </li>
        <li>
          <a href="https://cyberchef.com/">CyberChef</a>
          — encode/decode most (text) formats
        </li>
        <li>
          <a href="https://www.arcticpolygon.com/">Arctic Polygon</a>
          — cute little webcomic with foxes
        </li>
        <li>
          <a href="https://screee.ee/">screee.ee</a>
          — fencs :&gt;
        </li>
        <li>
          <a href="https://bigrat.monster/">bigrat.monster</a>
          — yeah
        </li>
        <li>
          <a href="https://slowroads.io/">slow roads</a>
          — chill driving vibes
        </li>
        <li>
          <a href="https://scp-wiki.wikidot.com/scp-2521">●●|●●●●●|●●|●</a>
          — in case you somehow haven't seen it
        </li>
        <li>
          <a href="https://computernewb.com/vncresolver/">VNC Resolver</a>
          — secure your VNC server or end up here
        </li>
        <li>
          <a href="https://old.reddit.com/r/opendirectories/"
            >r/opendirectories</a>
          — unsecured HTTP file servers
        </li>
        <li>
          <a href="https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/"
            >PHP: a fractal of bad design</a>
          — must-read blog post
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

  a[rel='me'] {
    white-space: nowrap;
  }
  a[rel='me']:hover {
    font-weight: 600;
  }
</style>
