import { setBlockType } from 'prosemirror-commands';
import { textblockTypeInputRule } from 'prosemirror-inputrules';
import { NodeExtension } from '../../extension';

/**
 * Code Block Node
 */
export default class CodeBlock extends NodeExtension {
  name = 'code_block';
  schema = {
    content: 'text*',
    group: 'block',
    marks: '',
    code: true,
    defining: true,
    parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }] as any,
    toDOM() {
      return ['pre', 0] as any;
    },
  };

  keymap = schema => {
    const type = schema.nodes.code_block;
    return {
      'Shift-Ctrl-\\': setBlockType(type),
    };
  };

  inputRules({ type }) {
    return [textblockTypeInputRule(/^```$/, type)];
  }
}
