<template>
    <main class="h-full w-full flex">
        <section class="pt-14 bg-body-gradient flex-grow">
            <!-- <header class=" ">
                <h2 class="text-2xl t-white-0">Welcome to derustPy!</h2>
                <p class="t-white-0 text-lg">Let's learn from your mistakes.</p>
                <p class="t-white-0 text-lg">TODO: Retrieve and render markdown challenges here or control flow graph if toggled</p>
            </header> -->
            <codecanvas />
        </section>
        <section class="">
            <code-editor />
        </section>
    </main>
</template>

<script>
import TextEditor from "@/components/userterminal/TextEditor.vue";
import CodeScene from "@/components/canvas/CodeScene.vue";

export default {
    name: "Home",
    components: {
        codeEditor: TextEditor,
        codecanvas: CodeScene,
    },
};
</script>

