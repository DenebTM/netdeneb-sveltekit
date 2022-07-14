<script lang="ts">
import Social from '$lib/components/Social.svelte'
import { setTitle } from '$lib/js/tools';

setTitle('Home')
</script>
<style>
#me {
    width: 160px;
    border-radius: 120px;
}
</style>

<div class="grid">
    <section>
        <img id="me" src="/img/gayneb.png" alt="Art of Deneb, by twitter.com/fl0zz0" />
        <h1>Hi!</h1>
        <p>
            I'm Deneb, a maned wolf, comp-sci student and hobbyist developer from 🇦🇹&nbsp;Austria.
        </p><p>
            This is mostly a place for me to put my personal pet projects, but
            you'll also find my ref and other art I've received here.
        </p>
        <hr />
        <Social />
    </section>
</div>