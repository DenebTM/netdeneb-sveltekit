<script lang="ts">
import type { Errors } from './$types'
import { login } from '$lib/js/auth'
import { page } from '$app/stores'
import { browser } from '$app/env'
import { goto } from '$app/navigation'
import { sitename } from '$lib/js/globals'

$: if ($page.data.hasValidToken && browser) goto(redirect)

let username = ''
let password = ''

let errors: { message?: string }

const redirect = decodeURIComponent($page.url.searchParams.get('redirect') || '/')

const submit = async () => {
    const loginStatus = await login(username, password)

    // TODO: is this even necessary anymore?
    if (loginStatus.ok) window.location.href = redirect
    else {
        ({ errors } = await loginStatus.json())
    }
}
</script>

<svelte:head>
    <title>{ `${sitename} - Login` }</title>
</svelte:head>

<h1>Login</h1>
<form id="login" on:submit|preventDefault={submit}>
    <span>Username</span>
    <input name="username" bind:value={username} type="text" required>
    <span>Password</span>
    <input name="password" bind:value={password} type="password" required>
    <button class="click-depress" type="submit">Login</button>
</form>
<p style="color: red">{ errors?.message ?? '' }</p>

<style>
form {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 10px;
    margin: 0 auto;
    max-width: 200px;
}
form input {
    color: var(--color);
}
form button {
    grid-column: span 2;
}
</style>