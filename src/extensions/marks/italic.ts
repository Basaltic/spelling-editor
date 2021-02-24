import { toggleMark } from "prosemirror-commands";
import { MarkSpec, MarkType, Schema } from "prosemirror-model";
import { MarkExtension } from "../../extension";
import markInputRule from "../../markInputRule";

export default class Italic extends MarkExtension {
  public name = "italic";

  public schema: MarkSpec = {
    parseDOM: [
      { tag: "i" },
      { tag: "em" },
      {
        style: "font-style",
        getAttrs: (value) => (value === "italic" ? null : false),
      },
    ],
    toDOM: () => ["em"],
  };

  keymap = (schema: Schema) => {
    return {
      "Mod-i": toggleMark(schema.marks.italic),
      "Mod-I": toggleMark(schema.marks.italic),
    };
  };

  inputRules(options: { type: MarkType }) {
    const { type } = options;
    return [
      markInputRule(/(?:^|[^_])(_([^_]+)_)$/, type),
      markInputRule(/(?:^|[^*])(\*([^*]+)\*)$/, type),
    ];
  }

  get toMarkdown() {
    return {
      open: "*",
      close: "*",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  parseMarkdown() {
    return { mark: "em" };
  }
}
