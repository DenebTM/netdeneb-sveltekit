<script lang="ts">
  import WikiLink from '~/components/WikiLink.svelte'
  import type { PageServerData } from './$types'

  import { page } from '$app/stores'
  const { name: sitename }: SiteMetadata = $page.data.siteMetadata

  export let data: PageServerData

  const friendlinks = [
    {
      domain: 'sterophonick.github.io',
      button: 'atapi.gif',
    },
    {
      domain: 'kaleidosium.my.id',
      button: 'kaleidosium.png',
    },
    {
      domain: 'zenthefox.online',
      button: 'zenthefox.gif',
    },
    {
      domain: 'aquamarine.gay',
      button: 'aquamarine.png',
    },
    {
      domain: 'ashiecorner.xyz',
      button: 'ashie.gif',
    },
    {
      domain: 'yummy.cricket',
      button: 'niss.png',
    },
    {
      domain: 'zencorner.xyz',
      button: 'zenith.gif',
    },
    {
      domain: 'm.furrypri.de',
      button: null,
    },
    {
      domain: 'maidado.xyz',
      button: null,
    },
    {
      domain: 'ayetsg.com',
      button: 'ayetsg.png',
    },
    {
      domain: 'foxboy.dev',
      button: null,
    },
    {
      domain: 'foxgirl.dev',
      button: null,
    },
    {
      domain: 'bee.movie',
      button: 'june.png',
    },
    {
      domain: 'eeep.ee',
      button: null,
    },
    {
      domain: 'gry.sh',
      button: null,
    },
    {
      domain: 'j4.lc',
      button: 'jae.avif',
    },
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
  <div class="column-box">
    <div class="page-column">
      <h2>Yap at me!</h2>
      <section id="email">
        <p>
          You may contact me via
          <a rel="me" href="mailto:deneb@screee.ee">
            <i class="inline-icon bx bx-sm bx-envelope" />&nbsp;<span
              >Email:</span
            >&nbsp;deneb@screee.ee
          </a><br />
          Please direct any professional inquiries there, and there only.
        </p>
      </section>

      <section id="socials">
        <p>You can also find me on these platforms:</p>
        <ul class="bulletless spaced">
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
        <ul class="bulletless">
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
            <a
              href="https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/"
              >PHP: a fractal of bad design</a>
            — must-read blog post
          </li>
          <li>
            <a href="https://freeplay.floof.company/">freeplay</a>
            — fox on the internet, css wizard
          </li>
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

  <section id="friends">
    <h2>Friends' websites</h2>
    <ul class="bulletless inline-list">
      {#each friendlinks as { domain, button }}
        <li>
          <a class="button-link" href={`https://${domain}`}>
            {#if button}
              <img src={`/img/8831/${button}`} alt={domain} />
            {:else}
              <span>{domain}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  .page-content {
    text-align: left;
  }

  .page-column {
    flex: 1;
  }

  @media not (max-width: 744px) {
    .column-box {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .column-box .page-column > h2,
    .column-box section:first-child h2 {
      margin-top: 0;
    }
  }

  ul {
    padding-left: 1em;
  }

  ul.bulletless li {
    list-style-type: none;
  }

  ul.spaced li {
    margin-bottom: 0.75em;
  }

  ul.inline-list {
    padding-left: 0;
  }
  ul.inline-list li {
    display: inline-block;
  }

  a[rel='me'] {
    white-space: nowrap;
  }
  a[rel='me']:hover {
    font-weight: 600;
  }

  .button-link {
    display: block;
    margin: 0 0 4px 4px;
  }

  .button-link > :first-child {
    display: inline-block;
  }
  .button-link > :first-child,
  .button-link img::before {
    width: 88px;
    height: 31px;
    text-align: center;
    overflow: hidden;
  }
  .button-link img {
    image-rendering: pixelated;
    position: relative;
  }

  .button-link img::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
  }

  .button-link span,
  .button-link img::before {
    border: 1px solid var(--primary);
  }
</style>
