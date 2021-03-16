<template>
    <section class="w-full h-full flex pt-14 bg-navy">
        <line-numbers />
        <!-- Editor contained in grid to overlap source textarea -->
        <div class="w-full h-full grid items-start justify-items-start bg-navy">
            <textarea
                class="row-start-1 col-start-1 fc w-128 p-2 whitespace-pre-wrap overflow-x-hidden overflow-y-hidden bg-transparent text-transparent"
                spellcheck="false"
                ref="inputfieldarea"
                :value="editorText"
                @keydown.tab.prevent="enableTabber($event)"
                @input.stop="typing($event)"
            >
            </textarea>
            <pre
                class="row-start-1 col-start-1 w-full h-full overflow-y-hidden"
                v-hljs="editorText"
                ref="hlsourcecode"
                @click="focusEditor()"
            ><code class="python fc w-full h-full"></code></pre>

        </div>

        <widgets />
    </section>
</template>

<script>
import hljs from "@/assets/highlight.pack.js";

import LineNumbers from "@/components/userterminal/LineNumbers.vue";
import EditorWidgets from "@/components/userterminal/EditorWidgets.vue";

export default {
    name: "TextEditor",
    components: {
        lineNumbers: LineNumbers,
        widgets: EditorWidgets,
    },
    data() {
        return {
            cursorPosition: 0,
            editorText:
                "print('Hello world! Welcome to my humble and incomplete editor')",
            history: [],
        };
    },

    methods: {
        typing(e) {
            this.enableTabber(e);
            console.log(this.editorText);
            this.editorText = e.target.value;
            this.cursorPosition = e.target.selectionStart;

            e.returnValue = true;
        },

        enableTabber(e) {
            if (
                e.code === "Tab" ||
                e.keyCode === 9 ||
                e.which === 9 ||
                e.key === "Tab"
            ) {
                console.log("in tabber");
                console.log(e.returnValue);

                e.preventDefault();
                const tab = "    ";
                this.editorText = this.editorText.concat(tab);
                // this.cursorPosition = this.cursorPosition + 4;
                this.cursorPosition = e.target.selectionStart;
            }
        },

        focusEditor() {
            this.$refs.inputfieldarea.focus();
        },

        parsePythonToGraph() {
            console.log("IMPLEMENT ME");
        },

        highlightRainbowTabs() {
            console.log("IMPLEMENT ME");
        },

        recordHistory(event) {
            console.log("IMPLEMENT ME", event);
        },

        typingText(typemsg, timeout) {
            var msg = typemsg;
            var i = timeout;

            if (i < msg.length) {
                this.editorText += msg.charAt(i);
                i++;
                var y = this.typingText(msg, i);
                setTimeout(y, 6000);
            }
        },

        // clearEditor() {
        //     this.editorText = "";
        //     this.focusEditor();
        // },
    },

    directives: {
        hljs: {
            deep: true,
            bind: function (el, binding) {
                // on first bind, highlight all targets
                let targets = el.querySelectorAll("code");
                targets.forEach(function (target) {
                    // if a value is directly assigned to the directive, use this
                    // instead of the element content.
                    if (binding.value) {
                        // console.log(
                        //     "binding.value exists assiging to textContent:" +
                        //         binding.value
                        // );
                        target.textContent = binding.value;
                    }
                    hljs.highlightBlock(target);
                });
            },
            componentUpdated: function (el, binding, editorText) {
                // after an update, re-fill the content and then highlight
                let targets = el.querySelectorAll("code");
                targets.forEach((target) => {
                    if (binding.value) {
                        console.log("==========Logging editorText==========");
                        console.log(editorText);
                        target.textContent = binding.value;
                        hljs.highlightBlock(target);
                    }
                });
            },
        },
    },

    mounted() {},
};
</script>

<style>
.hljs {
    overflow-wrap: break-word;
    white-space: pre-wrap;
    display: block;
    overflow-x: auto;
    overflow-y: auto;
    padding: 0.5rem;
    background: var(--bg-navy);
    color: var(--white-0);
}

.hljs-comment,
.hljs-quote {
    color: #586e75;
}

/* Solarized Green */
.hljs-keyword,
.hljs-selector-tag,
.hljs-addition {
    color: var(--keyword-fg);
}

/* Solarized Cyan */
.hljs-number {
    color: var(--number-fg);
}

.hljs-string,
.hljs-meta .hljs-meta-string,
.hljs-literal,
.hljs-doctag,
.hljs-regexp {
    color: var(--string-fg);
}

/* Solarized Blue */
.hljs-title,
.hljs-section,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
    color: #268bd2;
}

/* Solarized Yellow */
.hljs-attribute,
.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-class .hljs-title,
.hljs-type {
    color: var(--class-fg);
}

/* Solarized Orange */
.hljs-symbol,
.hljs-bullet,
.hljs-subst,
.hljs-meta,
.hljs-meta .hljs-keyword,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-link {
    color: #cb4b16;
}

/* Solarized Red */
.hljs-built_in,
.hljs-deletion {
    color: #dc322f;
}

.hljs-formula {
    background: #073642;
}

.hljs-emphasis {
    font-style: italic;
}

.hljs-strong {
    font-weight: bold;
}
</style>