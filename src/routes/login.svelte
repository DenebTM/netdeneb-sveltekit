<script lang="ts">
import { login } from '$lib/js/auth'
import { page } from '$app/stores'
import { setTitle } from '$lib/js/tools'
import { browser } from '$app/env'
import { goto } from '$app/navigation'

export let validToken : boolean

const redirect = decodeURIComponent($page.url.searchParams.get('redirect') || '/')
if (validToken && browser)
    goto(redirect)

let username = ''
let password = ''
let message  = ''

const submit = async () => {
    const loginStatus = await login(username, password)

    if (loginStatus.ok)
        window.location.href = redirect
    else {
        const response = await loginStatus.json()
        message = response.message
    }
}

setTitle('Login')
</script>

<h1>Login</h1>
<form id="login" on:submit|preventDefault={submit}>
    <p>
        <span>Username</span>
        <input name="username" bind:value={username} type="text" required>
    </p>
    <p>
        <span>Password</span>
        <input name="password" bind:value={password} type="password" required>
    </p>
    <button class="click-move-down" type="submit">Login</button>
</form>
<p style="color: red">{ message }</p>

<style>
form input {
    color: var(--color);
}
</style>