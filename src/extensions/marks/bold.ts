import { toggleMark } from "prosemirror-commands";
import { MarkSpec, MarkType, Schema } from "prosemirror-model";
import { MarkExtension } from "../../extension";
import markInputRule from "../../markInputRule";

/**
 * 加粗
 */
export default class Bold extends MarkExtension {
  public name = "bold";

  public schema: MarkSpec = {
    parseDOM: [
      { tag: "b" },
      { tag: "strong" },
      {
        style: "font-style",
        getAttrs: (value) => (value === "bold" ? null : false),
      },
    ],
    toDOM: () => ["strong"],
  };

  keymap = (schema: Schema) => {
    return {
      "Mod-b": toggleMark(schema.marks.strong),
      "Mod-B": toggleMark(schema.marks.strong),
      "Cmd-b": toggleMark(schema.marks.strong),
      "Cmd-B": toggleMark(schema.marks.strong),
    };
  };

  inputRules(options: { type: MarkType }) {
    const { type } = options;
    return [markInputRule(/(?:\*\*)([^*]+)(?:\*\*)$/, type)];
  }

  get toMarkdown() {
    return {
      open: "**",
      close: "**",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  parseMarkdown() {
    return { mark: "strong" };
  }
}
