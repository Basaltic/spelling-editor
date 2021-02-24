import { chainCommands, exitCode } from "prosemirror-commands";
import { Schema } from "prosemirror-model";
import { NodeExtension } from "../../extension";

/**
 * 换行
 */
export default class HardBreak extends NodeExtension {
  name = "hard_break";
  schema = {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{ tag: "br" }],
    toDOM() {
      return ["br"] as any;
    },
  };

  static commands = {};

  keymap = (schema: Schema) => {
    const type = schema.nodes.hard_break;
    const cmd = chainCommands(exitCode, (state, dispatch) => {
      if (dispatch)
        dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
      return true;
    });
    return {
      "Mod-Enter": cmd,
      "Shift-Enter": cmd,
      "Ctrl-Enter": cmd,
    };
  };
}
