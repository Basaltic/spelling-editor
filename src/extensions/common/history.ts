import { Extension } from '../../extension';
import { history, redo, undo } from 'prosemirror-history';

/**
 * 支持历史记录，undo，redo的扩展
 */
export default class History extends Extension {
  plugins = [history()];

  keymap = () => {
    return {
      'Mod-z': undo,
      'Mod-y': redo,
    };
  };
}
