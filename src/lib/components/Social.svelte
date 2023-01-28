<script lang="ts">
  import Fa from 'svelte-fa'
  import {
    faGithub,
    faTelegram,
    faDiscord,
    faTwitter,
    faReddit,
    faSteam,
  } from '@fortawesome/free-brands-svg-icons'

  const links = [
    {
      icon: faDiscord,
      href: 'https://discord.com/users/300930171123531777',
      text: 'Deneb#0721',
    },
    {
      icon: faTelegram,
      href: 'https://telegram.dog/DenebTM',
      text: '@DenebTM',
    },
    { icon: faTwitter, href: 'https://twitter.com/DenebTM', text: '@DenebTM' },
    { icon: faReddit, href: 'https://reddit.com/u/VeloxH', text: 'u/VeloxH' },
    { icon: faGithub, href: 'https://github.com/DenebTM', text: 'DenebTM' },
    {
      icon: faSteam,
      href: 'https://steamcommunity.com/id/DenebTM',
      text: 'DenebTM',
    },
  ]
</script>

<p style="margin: 20px 0 10px 0">Feel free to bark at me on:</p>
<div style="text-align: left; width: fit-content; margin: 0 auto">
  {#each links as { icon, href, text }}
    <a class="click-depress" {href}
      ><p>
        <Fa color="var(--text-color)" fw {icon} size="lg" /><span>{text}</span>
      </p></a
    >
  {/each}
</div>

<style>
  span {
    margin-left: 5px;
  }
  a {
    text-decoration: none;
  }
  a,
  a p,
  a p * {
    transition: 0.1s ease-in-out;
    border-radius: var(--border-radius);
  }
  a p {
    margin: 0;
    line-height: 2;
    vertical-align: middle;
    padding: 5px;
  }
  a[href]:hover p {
    --text-color: white;
  }
  a[href]:hover p {
    background-color: var(--primary);
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  div > * {
    margin: 10px;
  }

  @media only screen and (max-width: 600px) {
    div {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media only screen and (max-width: 400px) {
    div > * {
      margin: 3px;
    }
  }
</style>
