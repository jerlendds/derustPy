<template>
    <div
        id="app"
        class="flex flex-col h-screen"
    >
        <navbar />
        <router-view />
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
    name: "App",
    components: {
        navbar: NavigationBar,
    },
};
</script>

<style>
::-moz-focus-inner {
    border: 0;
}

:focus {
    outline: none;
}

@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Heebo:wght@300;400;500;600;700&display=swap");
#app {
    font-family: "Heebo", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--bg-gradient-top);
    max-height: 100vh;
}

/* 
   remove dotted outline/border in Firefox
   TODO: improve UX and implement custom focus styles 
*/
textarea:focus,
textarea:active,
button:focus,
a:focus,
a:active,
button::-moz-focus-inner,
input[type="reset"]::-moz-focus-inner,
input[type="button"]::-moz-focus-inner,
input[type="submit"]::-moz-focus-inner,
select::-moz-focus-inner,
input[type="file"] > input[type="button"]::-moz-focus-inner {
    outline: none !important;
}
select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
}

/* 
    TODO: Clean this mess up and use tailwind correctl
    COLORS
 */
:root {
    --fg-dark: #0f1e29;
    --bg-dark: #000c18;
    --grey-0: #6d7479;
    --white-0: #cfd8dc;
    --white-1: #a1b3e4a8;
    --green-0: #a5ff90;

    --comment-fg: #fd971f;
    --string-fg: #e6db74;
    --number-fg: #ae81ff;
    --keyword-fg: #f92672;
    --class-fg: #a6e22e;
    --function-fg: #2f9bda;

    --bg-gradient-top: #2b3556;
    --bg-gradient-bottom: #182038;
    --bg-header: #1d2746;
    --bg-terminal: #11172d;
    --bg-terminal-0: #11172dbe;
    --cta: #45a754;
    --accent-navy: #2a3455;
    --btn-bg-active: #2a3455;
}

.border-ghost-btn {
    box-shadow: inset 0px 0px 0px 2px var(--white-1);
}

.bg-btn {
    background: var(--btn-bg-active);
}

.bg-body-gradient {
    background: var(--bg-gradient-bottom);
    background: linear-gradient(
        to bottom,
        var(--bg-gradient-top) -25%,
        var(--bg-gradient-bottom) 90%
    );
}
.bg-green {
    background: var(--cta);
}
.bg-navy {
    background: var(--bg-terminal);
}
.bg-navy-0 {
    background: var(--bg-header);
}

.bg-dark-0 {
    background: var(--bg-dark);
}
.bg-dark-1 {
    background: var(--fg-dark);
}
.t-grey-0 {
    color: var(--grey-0);
}
.t-white-0 {
    color: var(--white-0);
}

.fc {
    font-family: "Fira Code", sans-serif;
}
</style>
