<template>
    <header class="w-11/12 fixed w-full flex items-center justify-between h-10 px-3  z-50">

        <!-- <h1 class="text-2xl font-bold logo-shadow-sm">derustPy</h1> -->
        <section>

            <font-awesome-icon
                class="t-white-0"
                :icon="['fa', 'bars']"
            />
        </section>
        <nav class="flex">
            <router-link
                class=""
                v-for="(link, index) in links"
                :key="index"
                :to="link.path"
                :class="link.klass"
            >
                <font-awesome-icon :icon="link.icon" />
            </router-link>
        </nav>

    </header>
</template>

<style scoped>
</style>

<script>
export default {
    name: "NavigationBar",
    data() {
        return {
            links: [
                {
                    path: "/syntax-theme",
                    icon: ["fas", "palette"],
                    klass: "py-1.5 px-1 mx-2 my-2 t-white-0 rounded",
                },
                {
                    path: "/settings",
                    icon: ["fas", "cog"],
                    klass: "py-1.5 px-1 mx-2 my-2 t-white-0 rounded",
                },
            ],
        };
    },

    methods: {
        toggleDrawer() {},
    },
};
</script>

