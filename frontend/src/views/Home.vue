<template>
    <main class="h-full w-full flex justify-center">
        <section>

        </section>
        <section class="w-11/12">
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

