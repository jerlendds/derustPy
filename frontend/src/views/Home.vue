<template>
    <main class="h-full w-full flex">
        <section class="pt-14 bg-body-gradient flex-grow">
            <header class=" ">
                <h2 class="text-2xl t-white-0">Welcome to derustPy!</h2>
                <p class="t-white-0 text-lg">Let's learn from your mistakes.</p>
            </header>
        </section>
        <section class="">
            <code-editor />
        </section>
    </main>
</template>

<script>
import TextEditor from "@/components/userterminal/TextEditor.vue";

export default {
    name: "Home",
    components: {
        codeEditor: TextEditor,
    },
};
</script>

