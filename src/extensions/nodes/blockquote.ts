import { wrappingInputRule } from 'prosemirror-inputrules';
import { NodeExtension } from '../../extension';

export default class Blockquote extends NodeExtension {
  name = 'blockquote';
  schema = {
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return ['blockquote', 0] as any;
    },
  };

  inputRules({ type }) {
    return [wrappingInputRule(/^\s*>\s$/, type)];
  }
}
