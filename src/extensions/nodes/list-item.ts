import { Schema } from "prosemirror-model";
import {
  splitListItem,
  sinkListItem,
  liftListItem,
} from "prosemirror-schema-list";
import { NodeExtension } from "../../extension";

export default class ListItem extends NodeExtension {
  name = "list_item";
  schema = {
    content: "paragraph block*",
    defining: true,
    draggable: true,
    parseDOM: [{ tag: "li" }],
    toDOM() {
      return ["li", 0] as any;
    },
  };

  keymap = (schema: Schema) => {
    const type = schema.nodes.list_item;
    return {
      Enter: splitListItem(type),
      Tab: sinkListItem(type),
      "Shift-Tab": liftListItem(type),
      "Mod-]": sinkListItem(type),
      "Mod-[": liftListItem(type),
    };
  };
}
