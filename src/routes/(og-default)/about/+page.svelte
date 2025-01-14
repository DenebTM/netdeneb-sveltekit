<script lang="ts">
  import WikiLink from '~/components/WikiLink.svelte'
  import { page } from '$app/state'
  import { birthday } from '../info.json'
  const {
    data: { siteMetadata },
  } = page

  const age = new Date(Date.now() - Date.parse(birthday)).getFullYear() - 1970
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
      My name is deneb, I live in Austria — Innsbruck to be precise — I'm {age} years
      old, and currently in my 7th and hopefully final semester studying computer
      science (as of 2024-10). I am just working on my bachelor's thesis at this
      point, and looking to become a <nobr>backend/systems</nobr> (DevOps I guess?)
      engineer in the near future.
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
      <a class="bold" href="/art">Art gallery</a> — displaying the commissions I
      get is honestly my website's primary purpose at this point :3
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
      Active Directory (which I had running in the background until 2023!) and associated
      services, though most of my knowledge does centre around modern Linux and Docker.
      I own a few domains on which I self-host most of my stuff, including:
    </p>
    <ul>
      <li>
        <a class="bold" href="https://leggi.es/">leggi.es</a> — this website!
        <ul>
          <li>
            <a class="bold" href="https://the.leggi.es">the.leggi.es</a> — manes
            :o
          </li>
        </ul>
      </li>
      <li>
        <a class="bold" href="https://screee.ee">screee.ee</a> — fencs :&gt;
        <ul>
          <li>
            a Matrix homeserver; <em>conduwuit</em> to be specific, but will
            probably migrate to
            <a href="https://or.computer.surgery/matrix/grapevine">Grapevine</a>
            soon
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
            <a href="https://github.com/dani-garcia/vaultwarden">Vaultwarden</a>
            instance, aka. Bitwarden but entirely free
          </li>
        </ul>
      </li>
      <li>
        <a class="bold" href="https://netdeneb.com/">netdeneb.com</a> — this
        website's old home; redirects here
        <ul>
          <li>also the top-level domain for both of my home networks</li>
          <li>
            <a class="bold" href="https://cloud.netdeneb.com/"
              >cloud.netdeneb.com</a> — my own Nextcloud instance, since Google killed
            off "unlimited" Photos storage in 2020
          </li>
          <li>
            <a class="bold" href="https://sync.netdeneb.com/"
              >sync.netdeneb.com</a>
            — <a href="https://syncthing.net">Syncthing</a> +
            <a href="https://filebrowser.org/">File Browser</a>, because
            Nextcloud Kinda Sucks&trade;
          </li>
        </ul>
      </li>
    </ul>
    <p>Other things I find fascinating include:</p>
    <ul>
      <li>
        <span class="bold">digital electronics</span> — because software is a pain
      </li>
      <li><span class="bold">retrocomputing</span> — limitations are fun</li>
      <li>
        <span class="bold">trains</span> — being on them, talking about them
      </li>
      <li><span class="bold">languages</span> — mostly the germanic ones</li>
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
    <p style="margin-bottom: 0">
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
