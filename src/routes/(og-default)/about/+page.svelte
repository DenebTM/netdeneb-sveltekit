<script lang="ts">
  import WikiLink from '~/components/WikiLink.svelte'
  import type { PageServerData } from './$types'
  import { page } from '$app/stores'
  const {
    data: { siteMetadata },
  } = $page

  interface Props {
    data: PageServerData
  }

  const { data }: Props = $props()
</script>

<svelte:head>
  <title>{`${siteMetadata.name} - About`}</title>
  <meta property="og:title" content="About" />
  <meta name="description" content="More info about the mane" />
  <meta property="og:description" content="More info about the mane" />
</svelte:head>

<h2 class="page-title">About</h2>

<div class="page-content">
  <section id="who-i-am">
    <h3>Who/what I am</h3>
    <p>
      My name (at least online) is deneb. My pronouns are they/them, and I am
      somewhere on the aromantic and asexual spectrum.<br />
      I live in Austria — Innsbruck to be precise — I'm {data.age} years old, and
      currently in my 7th and hopefully final semester studying computer science
      (as of 2024-10). I am just working on my bachelor's thesis at this point, and
      looking to become a <nobr>backend/systems</nobr> engineer in the near future.
    </p>
    <h4>floof</h4>
    <p>
      In case you're unaware, I'm a furry. This means, tl;dr, that I have a deep
      appreciation for visual art depicting animals (<WikiLink
        page="anthropomorphic"
        section="Adjective"
        site="wiktionary" /> or otherwise) and the community of artists and like-minded
      people that has developed around it.
      <strong title="all-lowercase, please">deneb</strong> is my fursona, and on
      occasion I throw some money the way of artists to get them drawn in their
      style. Have a look at the
      <strong><a href="/art">Art gallery</a></strong>, because displaying the
      commissions I get is honestly my website's primary purpose at this point
      :3
    </p>
  </section>

  <section id="what-i-do">
    <h3>What I do</h3>
    <p>
      My interests centre around PCs and digital technology (unsurprisingly).
      <br />
      I've been daily-driving Linux since 2019, having played around with Debian,
      Fedora, Open<a href="https://www.youtube.com/watch?v=nLdexZlVkAY">SUSE</a
      >, before settling on <span title="btw">Arch</span>.
    </p>
    <p>
      I particularly enjoy computers talking to each other, aka. networking. I
      started off on Windows and so have <em>some</em> experience with Microsoft
      Active Directory (which I had running in the background until 2023!) and
      associated services, though most of my knowledge does centre around modern
      Linux and Docker. Besides this website with its handful of
      <a href="/files">odd files </a> available for your perusal, I self-host most
      of my stuff, including:
    </p>
    <ul>
      <li>
        <a class="bold" href="https://leggi.es/">leggi.es</a> — this website!
      </li>
      <li>
        <a class="bold" href="https://netdeneb.com/">netdeneb.com</a> — this website's
        old home; redirects here
      </li>
      <li>
        <a class="bold" href="https://cloud.netdeneb.com/"
          >cloud.netdeneb.com</a> — my own Nextcloud instance, since Google killed
        off unlimited Photos storage in 2020
      </li>
      <li>
        <a class="bold" href="https://screee.ee/">screee.ee</a> — fencs :&gt;
        <br />
        also, a Matrix homeserver! <em>conduwuit</em> to be specific, but will
        probably migrate to
        <a href="https://or.computer.surgery/matrix/grapevine">Grapevine</a> soon
      </li>
      <li>
        <a class="bold" href="https://mail.screee.ee/">mail.screee.ee</a>
        — an email server powered by
        <a href="https://mailcow.email/">Mailcow</a>
        <br />
      </li>
      <li>
        <a class="bold" href="https://vault.screee.ee/">vault.screee.ee</a>
        — a
        <a href="https://github.com/dani-garcia/vaultwarden">Vaultwarden</a> instance,
        aka. Bitwarden but entirely free
      </li>
    </ul>

    <p>Other things I find fascinating include, but are not limited to:</p>
    <ul>
      <li><strong>digital electronics</strong> — because software is a pain</li>
      <li><strong>retrocomputing</strong> — limitations are fun</li>
      <li><strong>trains</strong> — being on them, talking about them</li>
      <li><strong>languages</strong> — mostly the germanic ones</li>
    </ul>

    <code class="bold">TODO #1:</code> One of these days I'll get around to
    creating a projects page. For now, look at my
    <a href="https://github.com/DenebTM"
      ><i class="inline-icon bx bx-sm bxl-github"></i>&nbsp;Github</a
    >!<br />
    <code class="bold">TODO #2:</code> Document my network setup somewhere<br />
    <code class="bold">TODO #3:</code> Expand on the retrocomputing stuff<br />
  </section>

  <section id="this-website">
    <h3>This website</h3>
    <p>
      This website was built by myself with
      <a href="https://kit.svelte.dev/">SvelteKit</a>.
      <a href="https://boxicons.com/">BoxIcons</a>
      is used for all non-unicode icons, e.g. on buttons.
      <a href="https://caddyserver.com">Caddy</a>
      handles the Files page, and another instance of it acts as an HTTP2/3 + SSL
      reverse proxy for this website as well as my other ones.
    </p>
    <p>
      The full source code is publicly available on Github,
      <a href="https://github.com/DenebTM/netdeneb">here!</a>
    </p>
  </section>
</div>

<style>
  section {
    text-align: left;
  }
  #what-i-do * {
    text-align: left;
  }

  code {
    font-size: 1.25em;
  }
</style>
