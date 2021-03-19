<template>
    <section class="w-full h-full flex pt-14 bg-navy">
        <!-- <line-numbers /> -->
        <!-- Editor contained in grid to overlap source textarea -->
        <div class="w-full h-full grid items-start justify-items-start bg-navy">
            <textarea
                class="row-start-1 col-start-1 resize-none fc w-128 p-2 whitespace-pre-wrap overflow-x-hidden overflow-y-hidden bg-transparent text-transparent"
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
import filbert from "filbert";
import hljs from "@/assets/js/highlight.pack.js";
// TODO: Pass current number of lines occupied into linenumbers and bind scroll position of editor
// import LineNumbers from "@/components/userterminal/LineNumbers.vue";
import EditorWidgets from "@/components/userterminal/EditorWidgets.vue";

export default {
    name: "TextEditor",
    components: {
        // lineNumbers: LineNumbers,
        widgets: EditorWidgets,
    },
    data() {
        return {
            cursorPosition: 0,
            editorText: 'print("hello world")',
            history: [],
            x: `def extract_refexpr_names(expr: RefExpr) -> Set[str]:
    """Recursively extracts all module references from a reference expression.
    Note that currently, the only two subclasses of RefExpr are NameExpr and
    MemberExpr."""
    output = set()  # type: Set[str]
    while isinstance(expr.node, MypyFile) or expr.fullname is not None:
        if isinstance(expr.node, MypyFile) and expr.fullname is not None:
            # If it's None, something's wrong (perhaps due to an
            # import cycle or a suppressed error).  For now we just
            # skip it.
            output.add(expr.fullname)

        if isinstance(expr, NameExpr):
            is_suppressed_import = isinstance(expr.node, Var) and expr.node.is_suppressed_import
            if isinstance(expr.node, TypeInfo):
                # Reference to a class or a nested class
                output.update(split_module_names(expr.node.module_name))
            elif expr.fullname is not None and '.' in expr.fullname and not is_suppressed_import:
                # Everything else (that is not a silenced import within a class)
                output.add(expr.fullname.rsplit('.', 1)[0])
            break
        elif isinstance(expr, MemberExpr):
            if isinstance(expr.expr, RefExpr):
                expr = expr.expr
            else:
                break
        else:
            raise AssertionError("Unknown RefExpr subclass: {}".format(type(expr)))
    return output`,
        };
    },

    methods: {
        typing(e) {
            this.enableTabber(e);
            this.editorText = e.target.value;
            this.cursorPosition = e.target.selectionStart;
            this.parsePythonToGraph();
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
            /* parses the code found in editor into list of objects for further processing */

            const source = this.editorText;

            // ?? if less than 20 characters of code don't bother parsing??
            if (typeof source === String) {
                // otherwise get abstract syntax tree
                var parse_results = filbert.parse(source);
                console.log(parse_results);
            }
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