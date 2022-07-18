<script lang="ts" context="module">
import type { Load } from '@sveltejs/kit';

export const load : Load = async ({ url, params, error, status }) => {
    if (url.pathname.startsWith('/ftpdir') && status === 403) {
        return {
            status: 302,
            redirect: `/login?redirect=${encodeURIComponent('/ftpdir' + params.path)}`
        }
    }

    return { props: { error, status } }
}
</script>

<script lang="ts">
export let status : number
export let error : Error
</script>

<style>
h1 {
    font-size: 3em;
}
</style>

<h1>{status}</h1>
<p>{error ? error.message : 'Unknown error'}</p>