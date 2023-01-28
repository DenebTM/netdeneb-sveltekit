<script lang="ts">
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { sitename } from '$lib/js/globals'

  $: if ($page.data.hasValidToken && browser) goto(redirect)

  let username = ''
  let password = ''

  export let form: { message?: string }

  const redirect = decodeURIComponent(
    $page.url.searchParams.get('redirect') || '/'
  )
</script>

<svelte:head>
  <title>{`${sitename} - Login`}</title>
</svelte:head>

<h1>Login</h1>
<form id="login" method="POST">
  <label for="username">Username</label>
  <input
    id="username"
    name="username"
    type="text"
    bind:value={username}
    required
  />
  <label for="password">Password</label>
  <input
    id="password"
    name="password"
    type="password"
    bind:value={password}
    required
  />
  <button class="click-depress" type="submit">Login</button>
</form>
<p style="color: red">{form?.message ?? ''}</p>

<style>
  form {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 10px;
    margin: 0 auto;
    max-width: 250px;
  }
  form input {
    color: var(--color);
    min-width: 0;
  }
  form button {
    grid-column: span 2;
  }
</style>
