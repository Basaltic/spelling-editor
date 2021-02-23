import { chainCommands, exitCode } from 'prosemirror-commands';
import { NodeExtension } from '../../extension';

/**
 * A Hard Line Break.
 */
export default class HardBreak extends NodeExtension {
  name = 'hard_break';
  schema = {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{ tag: 'br' }],
    toDOM() {
      return ['br'] as any;
    },
  };

  static commands = {};

  keymap = schema => {
    const type = schema.nodes.hard_break;
    const cmd = chainCommands(exitCode, (state, dispatch) => {
      if (dispatch) dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
      return true;
    });
    return {
      'Mod-Enter': cmd,
      'Shift-Enter': cmd,
      'Ctrl-Enter': cmd,
    };
  };

  toMarkdown(state) {
    state.write(' \\n ');
  }

  parseMarkdown() {
    return { node: 'br' };
  }
}
