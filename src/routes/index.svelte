<script lang="ts">
import Social from '$lib/components/Social.svelte'
import { /* beginNavigation, finishNavigation, */ setTitle } from '$lib/js/tools'

// beginNavigation()
setTitle('Home')
// finishNavigation()
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
            I'm Deneb, a maned wolf and hobbyist developer from 🇦🇹&nbsp;Austria,
            currently studying comp-sci in Innsbruck.
        </p><p>
            This is mostly a place for me to put my personal pet projects, but
            you'll also find my ref and other art I've received here. Still under
            construction, so check back later for more!
        </p>
        <hr />
        <Social />
    </section>
</div>