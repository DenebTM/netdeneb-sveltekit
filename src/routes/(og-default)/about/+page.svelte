<script lang="ts">
  import { page } from '$app/state'
  const {
    data: { siteMetadata },
  } = page
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
    <p>
      My name is <strong title="all-lowercase, please">deneb</strong>, I live in
      Innsbruck (Austria), am 24 years old and have a Bachelor's degree in
      computer science.
    </p>
    <!-- <h4>floof</h4>
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
    </p> -->
  </section>

  <section id="what-i-do">
    <h3>What I do</h3>
    <p>
      My interests centre around PCs and digital technology (unsurprisingly).
      <br />
      I've been daily-driving Linux since 2019, having played around with Ubuntu,
      Debian, CentOS, Fedora and Open<a
        href="https://www.youtube.com/watch?v=nLdexZlVkAY">SUSE</a
      >, before settling on <span style="cursor: help" title="(btw)">Arch</span>
      as my preferred distribution (client and server).
    </p>
    <p>
      I particularly love making computers talk to each other; I started off on
      Windows and so have <em>some</em> experience with Microsoft Active Directory
      (which handled LDAP authentication in my network until 2023) and its associated
      services, though most of my knowledge centers around modern Linux and Docker.
      I own a few domains on which I self-host most of my stuff, including:
    </p>
    <ul>
      <li>
        <a class="bold" href="https://leggi.es/">leggi.es</a> — this website!
        <ul>
          <li>
            <a class="bold" href="https://the.leggi.es">the.leggi.es</a>
            — manes :o
          </li>
          <li>
            <a class="bold" href="https://nd.leggi.es">nd.leggi.es</a>
            — my music library on
            <a href="https://www.navidrome.org/">Navidrome</a>
          </li>
          <li>
            <a class="bold" href="https://radical.leggi.es">radical.leggi.es</a>
            — <a href="https://radicale.org/">Radicale</a> for CalDAV/CardDAV
          </li>
          <li>
            <a class="bold" href="https://sync.leggi.es">sync.leggi.es</a>
            — <a href="https://syncthing.net/">Syncthing</a> +
            <a href="https://filebrowser.org/">File Browser</a>
          </li>
          <li>
            <a class="bold" href="https://metric.leggi.es">metric.leggi.es</a>
            — <a href="https://grafana.com/">Grafana</a>, creating pretty graphs
            from my server's usage stats
          </li>
          <li>
            <a class="bold" href="https://auth.leggi.es">auth.leggi.es</a>
            — <a href="https://zitadel.com/">Zitadel SSO</a>, currently used for
            Mailcow and Grafana
          </li>
        </ul>
      </li>
      <li>
        <a class="bold" href="https://screee.ee">screee.ee</a> — fencs :&gt;
        <ul>
          <li>
            my single-user Matrix homeserver, running <a
              href="https://gitlab.computer.surgery/matrix/grapevine"
              >Grapevine</a>
          </li>
          <li>ns1.screee.ee — authoritative DNS for my domains</li>
          <li>
            <a class="bold" href="https://mail.screee.ee/">mail.screee.ee</a>
            — an email server powered by
            <a href="https://mailcow.email/">Mailcow</a>
            <br />
          </li>
          <li>
            <a class="bold" href="https://vault.screee.ee/">vault.screee.ee</a>
            —
            <a href="https://github.com/dani-garcia/vaultwarden">Vaultwarden</a>
            (fully-featured backend for the Bitwarden password manager)
          </li>
        </ul>
      </li>
    </ul>
    <p>
      Other things I find fascinating (but largely don't participate in)
      include:
    </p>
    <ul>
      <li>
        <span class="bold">digital electronics</span> — because software isn't painful
        enough
      </li>
      <li>
        <span class="bold">retrocomputing+demoscene</span> — computing peaked before
        i was born tbhtbh
      </li>
      <li>
        <span class="bold">trains</span> — being on them, talking about them
      </li>
      <li><span class="bold">languages</span> — mostly the germanic ones</li>
    </ul>

    <code class="bold">TODO #1:</code> One of these days I'll get around to
    creating a projects page. For now, look at my
    <a href="https://github.com/DenebTM"
      ><i class="inline-icon bx bx-sm bxl-github"></i>&nbsp;Github</a>
    profile.<br />
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
