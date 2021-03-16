<template>
    <aside class="row-start-1 col-start-5 h-full bg-navy-0">
        <ul class="flex flex-col h-full">
            <li class="py-2 px-3 w-full flex justify-center">
                <font-awesome-icon
                    class="fill-current text-xl"
                    style="color: var(--function-fg)"
                    :icon="['fas', 'question']"
                />
            </li>
            <li class="py-2 px-3 w-full flex justify-center">
                <!-- Themer -->
                <font-awesome-icon
                    class="fill-current text-xl"
                    style="color: var(--white-0)"
                    :icon="['fas', 'palette']"
                />
            </li>
            <li class="py-2 px-3 w-full flex justify-center">
                <font-awesome-icon
                    class="fill-current text-xl"
                    style="color: var(--white-0)"
                    :icon="['fas', 'bug']"
                />
            </li>
            <li class="py-2 px-3 w-full flex justify-center">
                <font-awesome-icon
                    class="fill-current text-xl"
                    style="color: var(--white-0)"
                    :icon="['fas', 'project-diagram']"
                />
            </li>
            <li class="py-2 px-3 w-full flex justify-center flex-grow">
                <font-awesome-icon
                    class="fill-current text-xl"
                    style="color: var(--white-0)"
                    :icon="['fas', 'list-ol']"
                />
            </li>
            <!-- flex-grow used to be below -->
            <li class="py-2 px-3 w-full flex justify-center">
                <font-awesome-icon
                    class="fill-current text-xl"
                    style="color: var(--white-0)"
                    :icon="['fas', 'cogs']"
                />
            </li>

            <li class="py-2 px-3 w-full flex justify-center">
                <font-awesome-icon
                    class="fill-current text-xl"
                    style="color: var(--white-0)"
                    :icon="['fas', 'trash-alt']"
                />
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: "EditorWidgets",
};
</script>

<style scoped>
/* div ul li:nth-child(odd) {
    background: var(--bg-terminal);
}
div ul li:nth-child(even) {
    background: var(--bg-terminal-0);
} */
</style>