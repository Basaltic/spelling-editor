import { toggleMark } from "prosemirror-commands";
import { MarkType, Schema } from "prosemirror-model";
import { MarkExtension } from "../../extension";
import markInputRule from "../../markInputRule";

/**
 * 内联代码区块
 */
export default class CodeInline extends MarkExtension {
  name = "code_inline";

  schema: any = {
    excludes: "_",
    parseDOM: [{ tag: "code" }],
    toDOM: () => ["code", { spellCheck: false }],
  };

  inputRules(options: { type: MarkType }) {
    const { type } = options;
    return [markInputRule(/(?:^|[^`])(`([^`]+)`)$/, type)];
  }

  keymap = (schema: Schema) => {
    return {
      "Mod`": toggleMark(schema.marks.code_inline),
    };
  };
}
