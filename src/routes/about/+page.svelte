<script lang="ts">
  import { sitename } from '~/util/globals'
  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<svelte:head>
  <title>{`${sitename} - About`}</title>
  <meta name="description" content="About myself" />
</svelte:head>

<h2>About</h2>

<section id="who-i-am">
  <h3>Who/what I am</h3>
  <p>
    My name (at least online) is deneb. My pronouns are they/them, and I am
    somewhere on the aromantic and asexual spectrum.<br />
    I live in Austria — Innsbruck to be precise — I'm {data.age} years old, and currently
    in my 7th and hopefully final semester studying computer science (as of 2024-10).
    I am just working on my bachelor's thesis at this point, and looking to become
    a <nobr>backend/systems</nobr> engineer in the near future.
  </p>
  <h4>floof</h4>
  <p>
    In case you're unaware, I'm a furry. This means, tl;dr, that I have a deep
    appreciation for visual art depicting animals (<a
      class="inline-link"
      href="https://en.wiktionary.org/wiki/anthropomorphic#Adjective"
      >anthropomorphic</a>
    or otherwise) and the community of artists that has developed around it.
    <strong>deneb</strong> is my fursona, and on occasion I throw some money the
    way of artists to get them drawn in their style. Have a look at the
    <strong><a class="inline-link" href="/art">Art gallery</a></strong>, because
    displaying the commissions I get is honestly my website's primary purpose at
    this point :3
  </p>
</section>

<section id="what-i-do">
  <h3>What I do</h3>
  <p>
    My interests centre around computer technology (unsurprisingly). Things I
    find particularly fascinating include, but are not limited to:
  </p>
  <ul>
    <li>
      <strong>networking!</strong> — computers were <em>made</em> to talk to each
      other
    </li>
    <li><strong>digital electronics</strong> — because software is a pain</li>
    <li><strong>retrocomputing</strong> — limitations are fun</li>
    <li><strong>trains</strong> — being on them, talking about them</li>
    <li><strong>languages</strong> — mostly the germanic ones</li>
  </ul>

  <strong><code>TODO #1</code>:</strong> One of these days I'll get around to
  creating a projects page. For now, look at my
  <a class="inline-link" href="https://github.com/DenebTM"
    ><i class="inline-icon bx bx-sm bxl-github" />&nbsp;Github</a
  >!<br />
  <strong><code>TODO #2</code>:</strong> Document my network setup somewhere<br />
  <strong><code>TODO #3</code>:</strong> Expand on the retrocomputing stuff<br />
</section>

<section id="this-website">
  <h3>This website</h3>
  This website was built by myself with
  <a class="inline-link" href="https://kit.svelte.dev/">SvelteKit</a>.
  <a class="inline-link" href="https://boxicons.com/">BoxIcons</a>
  is used for all non-unicode icons, e.g. on buttons.<br />
  The full source code is publicly available on Github,
  <a class="inline-link" href="https://github.com/DenebTM/netdeneb">here!</a>
</section>

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
