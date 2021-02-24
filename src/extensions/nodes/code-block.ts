import { setBlockType } from "prosemirror-commands";
import { textblockTypeInputRule } from "prosemirror-inputrules";
import { NodeType, Schema } from "prosemirror-model";
import { NodeExtension } from "../../extension";

/**
 * Code Block Node
 */
export default class CodeBlock extends NodeExtension {
  name = "code_block";
  schema = {
    content: "text*",
    group: "block",
    marks: "",
    code: true,
    defining: true,
    parseDOM: [{ tag: "pre", preserveWhitespace: "full" }] as any,
    toDOM() {
      return ["pre", 0] as any;
    },
  };

  keymap = (schema: Schema) => {
    const type = schema.nodes.code_block;
    return {
      "Shift-Ctrl-\\": setBlockType(type),
    };
  };

  inputRules(options: { type: NodeType }) {
    const { type } = options;
    return [textblockTypeInputRule(/^```$/, type)];
  }
}
