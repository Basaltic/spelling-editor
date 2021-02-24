import { wrappingInputRule } from "prosemirror-inputrules";
import { MarkType, Node, NodeType } from "prosemirror-model";
import { NodeExtension } from "../../extension";

export default class OrderedList extends NodeExtension {
  name = "ordered_list";
  schema = {
    content: "list_item+",
    group: "block",
    attrs: { order: { default: 1 } },
    parseDOM: [
      {
        tag: "ol",
        getAttrs(dom: any) {
          const start = dom.getAttribute("start") || "0";
          return {
            order: dom.hasAttribute("start") ? +start : 1,
          };
        },
      },
    ],
    toDOM(node: Node) {
      return node.attrs.order == 1
        ? ["ol", 0]
        : (["ol", { start: node.attrs.order }, 0] as any);
    },
  };

  inputRules(options: { type: NodeType }) {
    const { type } = options;
    return [
      wrappingInputRule(
        /^(\d+)\.\s$/,
        type,
        (match) => ({ order: +match[1] }),
        (match, node) => node.childCount + node.attrs.order === +match[1]
      ),
    ];
  }
}
