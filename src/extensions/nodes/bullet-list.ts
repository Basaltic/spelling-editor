import { wrappingInputRule } from 'prosemirror-inputrules';
import { NodeExtension } from '../../extension';

export default class BulletList extends NodeExtension {
  name = 'bullet_list';
  schema = {
    content: 'list_item+',
    group: 'block',
    parseDOM: [{ tag: 'ul' }],
    toDOM() {
      return ['ul', 0] as any;
    },
  };

  inputRules({ type }) {
    return [wrappingInputRule(/^\s*([-+*])\s$/, type)];
  }
}
