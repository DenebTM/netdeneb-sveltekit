<script lang="ts" context="module">
import type { Load } from "@sveltejs/kit"
import { isLoggedIn } from "$lib/js/auth"

export const load : Load = ({ session, url: { searchParams } }) => {
    const redirect = decodeURIComponent(searchParams.get('redirect') || '/')

    if (isLoggedIn(session)) {
        return {
            status: 302,
            redirect
        }
    }

    return {
        status: 200
    }
}
</script>

<script lang="ts">
import { login } from '$lib/js/auth'
import { page } from '$app/stores'
import { setTitle } from '$lib/js/tools'

const redirect = decodeURIComponent($page.url.searchParams.get('redirect') || '/')

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
    color: black;
}
</style>