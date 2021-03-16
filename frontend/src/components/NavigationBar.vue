<template>
    <header class="fixed blue-purple shadow-sm  w-full flex items-center justify-between h-14 px-3 flex-shrink-0 z-50">
        <h1 class="text-2xl t-white-0 font-bold">derustPy</h1>
        <nav class="flex">
            <router-link
                class=""
                v-for="(link, index) in links"
                :key="index"
                :to="link.path"
                :class="link.klass"
            >{{link.text}}</router-link>
        </nav>
    </header>
</template>

<style scoped>
.blue-purple {
    background: var(--bg-gradient-top);
}
</style>

<script>
export default {
    name: "NavigationBar",
    data() {
        return {
            links: [
                {
                    path: "/signup",
                    text: "Create Account",
                    klass:
                        "py-1.5 px-3 mx-2 my-2 font-semibold shadow-sm t-white-0 bg-green rounded",
                },
                {
                    path: "/login",
                    text: "Login",
                    klass:
                        "py-1.5 px-4 mx-2 my-2 font-medium t-white-0 rounded border-ghost-btn",
                },
            ],
        };
    },
};
</script>

