<template>
    <section class="flex w-full h-full pt-10">
        <div class="w-full grid shadow-real rounded-lg my-6">
            <textarea
                class="py-2 row-start-1 col-start-1 rounded-lg resize-none fc w-128 p-2 whitespace-pre-wrap overflow-x-hidden overflow-y-hidden bg-transparent text-transparent"
                spellcheck="false"
                ref="inputfieldarea"
                :value="editorText"
                @keydown.tab.prevent="enableTabber($event)"
                @input.stop="typing($event)"
            >
            </textarea>
            <pre
                class="py-2 row-start-1 col-start-1 w-full h-full overflow-y-hidden rounded-lg "
                v-hljs="editorText"
                ref="hlsourcecode"
                @click="focusEditor()"
            ><code class="python fc w-full h-full"></code></pre>

        </div>
    </section>
</template>

<script>
import filbert from "filbert";
import hljs from "@/assets/js/highlight.pack.js";
// TODO: Pass current number of lines occupied into linenumbers and bind scroll position of editor
// import LineNumbers from "@/components/userterminal/LineNumbers.vue";
// import EditorWidgets from "@/components/userterminal/EditorWidgets.vue";

export default {
    name: "TextEditor",
    components: {
        // lineNumbers: LineNumbers,
        // widgets: EditorWidgets,
    },
    data() {
        return {
            cursorPosition: 0,
            editorText: `
# hi there
m = (12, 1)            
l = 3.14159            
u = 1
x = "hello"
z = [1, 2, 3, 4.0, "5"]            
y = {"hello": "world"}            

g = [{"hello": 1}, {2: [1, 2, 3]}, 123321]
if x == "hello":
    x = "hello world"
    print(x)
else:
    print("ast")`,
            history: [],
        };
    },

    methods: {
        typing(e) {
            this.enableTabber(e);
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
                e.preventDefault();
                const tab = "    ";
                this.editorText = this.editorText.concat(tab);
                this.cursorPosition = e.target.selectionStart;
            }
        },

        focusEditor() {
            this.$refs.inputfieldarea.focus();
        },

        parsePythonToGraph() {
            var source = this.editorText;
            var parse_results = filbert.parse(source);
            console.log(parse_results);
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
                        target.textContent = binding.value;
                    }
                    hljs.highlightBlock(target);
                });
            },
            componentUpdated: function (el, binding) {
                // after an update, re-fill the content and then highlight
                let targets = el.querySelectorAll("code");
                targets.forEach((target) => {
                    if (binding.value) {
                        target.textContent = binding.value;
                        hljs.highlightBlock(target);
                    }
                });
            },
        },
    },

    mounted() {
        this.parsePythonToGraph();
    },
};
</script>

<style>
.hljs {
    border-radius: 0.375rem;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    display: block;
    overflow-x: auto;
    overflow-y: auto;
    padding: 0.5rem;
    background: #282b2e;
}
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-selector-id {
    color: #93c763;
}

.hljs-number {
    color: #ffcd22;
}

.hljs {
    color: #e0e2e4;
}

.hljs-attribute {
    color: #668bb0;
}

.hljs-code,
.hljs-class .hljs-title,
.hljs-section {
    color: white;
}

.hljs-regexp,
.hljs-link {
    color: #d39745;
}

.hljs-meta {
    color: #557182;
}

.hljs-tag,
.hljs-name,
.hljs-bullet,
.hljs-subst,
.hljs-emphasis,
.hljs-type,
.hljs-built_in,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
    color: #8cbbad;
}

.hljs-string,
.hljs-symbol {
    color: #ec7600;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion {
    color: #818e96;
}

.hljs-selector-class {
    color: #a082bd;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-doctag,
.hljs-title,
.hljs-section,
.hljs-type,
.hljs-name,
.hljs-strong {
    font-weight: bold;
}
</style>