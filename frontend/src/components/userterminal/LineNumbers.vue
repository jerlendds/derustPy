<template>
    <div class="pt-2 bg-navy">
        <ul
            class="flex flex-col"
            :key="x"
            v-for="x in 33"
        >
            <li class="px-1 h-4 flex justify-end">
                <p class="fc t-white-0 opacity-60">{{ x }}</p>
            </li>

        </ul>
    </div>
</template>

<script>
export default {
    name: "LineNumbers",
};
</script>