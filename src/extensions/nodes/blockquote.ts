import { wrappingInputRule } from "prosemirror-inputrules";
import { NodeType } from "prosemirror-model";
import { NodeExtension } from "../../extension";

/**
 * 引用区块
 */
export default class Blockquote extends NodeExtension {
  name = "blockquote";
  schema = {
    content: "block+",
    group: "block",
    defining: true,
    parseDOM: [{ tag: "blockquote" }],
    toDOM() {
      return ["blockquote", 0] as any;
    },
  };

  inputRules(options: { type: NodeType }) {
    const { type } = options;
    return [wrappingInputRule(/^\s*>\s$/, type)];
  }
}
