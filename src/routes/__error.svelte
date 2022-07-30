<script lang="ts" context="module">
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url, params, error, status }) => {
    if (url.pathname.startsWith('/ftpdir') && (status === 401 || status === 403)) {
        return {
            // doesn't work in SSR, which is dumb
            status: 307,
            redirect: `/login?redirect=${encodeURIComponent('/ftpdir' + params.path)}`,
            // so I have to do this, which is also dumb
            props: {
                redirect: `/login?redirect=${encodeURIComponent('/ftpdir' + params.path)}`
            }
        }
    }

    return { props: { error, status } }
}
</script>

<script lang="ts">
import { goto } from '$app/navigation'
import { browser } from '$app/env'

export let status: number
export let error: Error

export let redirect: string
if (redirect && browser)
    goto(redirect)
</script>

<h1>{status}</h1>
<p>{error ? error.message : 'Unknown error'}</p>

<style>
h1 {
    font-size: 3em;
}
</style>