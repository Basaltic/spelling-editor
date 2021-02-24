import { toggleMark } from "prosemirror-commands";
import { MarkSpec, MarkType, Schema } from "prosemirror-model";
import { MarkExtension } from "../../extension";
import markInputRule from "../../markInputRule";

export default class Underline extends MarkExtension {
  name = "underline";

  schema: MarkSpec = {
    parseDOM: [
      { tag: "u" },
      {
        style: "text-decoration",
        getAttrs: (value) => (value === "underline" ? null : false),
      },
    ],
    toDOM: () => ["u", 0],
  };

  inputRules(options: { type: MarkType }) {
    const { type } = options;
    return [markInputRule(/(?:__)([^_]+)(?:__)$/, type)];
  }

  keymap = (schema: Schema) => {
    return {
      "Mod-u": toggleMark(schema.marks.underline),
    };
  };

  get toMarkdown() {
    return {
      open: "__",
      close: "__",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  parseMarkdown() {
    return { mark: "underline" };
  }
}
