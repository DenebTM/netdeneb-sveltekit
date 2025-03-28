<script lang="ts">
  import WikiLink from '~/components/WikiLink.svelte'
  import Button from './Button.svelte'

  import _buttons from './buttons.json'
  import { socials } from '../info.json'

  import { page } from '$app/state'
  import { onMount } from 'svelte'
  const {
    data: { siteMetadata },
  } = page

  const shuffleButtons = (arrayIn: ButtonData[]): ButtonData[] => {
    let arrayTmp = [...arrayIn]
    let arrayOut: ButtonData[] = []
    while (arrayTmp.length > 0) {
      const index = Math.floor(Math.random() * arrayTmp.length)
      arrayOut.unshift(...arrayTmp.splice(index, 1))
    }

    return arrayOut
  }

  let buttonLists: { title: string; buttons: ButtonData[] }[] = $state(_buttons)

  onMount(() =>
    buttonLists.forEach(a => {
      a.buttons = shuffleButtons(a.buttons)
    })
  )
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - Links`}</title>
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
            <i class="inline-icon bx bx-sm bx-envelope"></i>&nbsp;Email:
            deneb@screee.ee
          </a><br />
          Please direct any professional inquiries there, and there only.
        </p>
      </section>

      <section id="socials">
        <p>You can also find me on these platforms:</p>
        <ul class="bulletless spaced">
          {#each socials as { platform, icon, href, text }}
            <li>
              <a rel="me" {href}>
                <i class={`inline-icon bx bx-sm ${icon}`}></i>&nbsp;<span
                  >{platform}:</span>
                <!-- eslint-disable-next-line svelte/no-at-html-tags -- i control this HTML -->
                {@html text}
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
            — unsecured HTTP directory listings
          </li>
          <li>
            <a
              href="https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/"
              >PHP: a fractal of bad design</a>
            — must-read blog post
          </li>
          <li>
            <a href="https://fursona.gmem.ca/">Fursona Lookup</a>
            — try <code>leggi.es</code> :3
          </li>
          <li>
            <a href="https://falstad.com/circuit/">CircuitJS</a>
            — electronic circuit simulator
          </li>
          <li>
            <a href="https://genders.wtf/">genders.wtf</a>,
            <a href="https://badkeming.com/">badkeming.com</a>
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

  <section id="buttons">
    {#each buttonLists as { title, buttons }}
      <h3 style="margin-bottom: 0">{title}</h3>
      <hr style="border: 1px solid var(--primary); margin-top: 0" />
      <ul class="bulletless inline-list" style="margin-left: -4px">
        {#each buttons as button}
          <li>
            <Button {button} />
          </li>
        {/each}
      </ul>
    {/each}
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

  #buttons ul {
    margin-bottom: 0;
  }

  a[rel='me']:hover {
    font-weight: 600;
  }
</style>
