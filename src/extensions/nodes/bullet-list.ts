import { wrappingInputRule } from "prosemirror-inputrules";
import { NodeType } from "prosemirror-model";
import { NodeExtension } from "../../extension";

export default class BulletList extends NodeExtension {
  name = "bullet_list";
  schema = {
    content: "list_item+",
    group: "block",
    parseDOM: [{ tag: "ul" }],
    toDOM() {
      return ["ul", 0] as any;
    },
  };

  inputRules(options: { type: NodeType }) {
    const { type } = options;
    return [wrappingInputRule(/^\s*([-+*])\s$/, type)];
  }
}
