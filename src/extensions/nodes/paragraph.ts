import { NodeExtension } from '../../extension';

export default class Paragraph extends NodeExtension {
  name = 'paragraph';
  schema = {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', 0] as any;
    },
  };
}
