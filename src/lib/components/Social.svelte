<script lang="ts">
  const links = [
    {
      icon: 'discord-alt',
      href: 'https://discord.com/users/300930171123531777',
      text: 'Deneb#0721',
    },
    {
      icon: 'telegram',
      href: 'https://telegram.dog/DenebTM',
      text: '@DenebTM',
    },
    {
      icon: 'mastodon',
      href: 'https://wetdry.world/@Deneb',
      text: '@Deneb@wetdry.world',
    },
    {
      icon: 'twitter',
      href: 'https://twitter.com/DenebTM',
      text: '@DenebTM',
    },
    {
      icon: 'reddit',
      href: 'https://reddit.com/u/VeloxH',
      text: 'u/VeloxH',
    },
    {
      icon: 'github',
      href: 'https://github.com/DenebTM',
      text: 'DenebTM',
    },
    {
      icon: 'steam',
      href: 'https://steamcommunity.com/id/DenebTM',
      text: 'DenebTM',
    },
  ]
</script>

<p style="margin: 20px 0 10px 0">Feel free to bark at me on:</p>
<div style="text-align: left; width: fit-content; margin: 0 auto">
  {#each links as { icon, href, text }}
    <a class="click-depress" {href}>
      <p>
        <i>
          <i
            class={`bx bx-sm bxl-${icon}`}
            style="display: inline-block !important; vertical-align: text-top"
          /></i
        >
        <span>{text}</span>
      </p>
    </a>
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
    display: flex;
    gap: 10px;
    justify-content: center;
    max-width: 410px;
    flex-wrap: wrap;
  }

  div > * {
    flex-grow: 0;
    width: max-content;
  }
</style>
