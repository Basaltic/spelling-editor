import { textblockTypeInputRule } from 'prosemirror-inputrules';
import { NodeExtension } from '../../extension';

export default class Heading extends NodeExtension {
  name = 'heading';
  schema: any = {
    content: 'inline*',
    group: 'block',
    attrs: {
      level: { default: 1 },
    },
    defining: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } },
    ],
    toDOM(node) {
      return ['h' + node.attrs.level, 0];
    },
  };

  inputRules({ type }) {
    return [textblockTypeInputRule(new RegExp('^(#{1,6})\\s$'), type, match => ({ level: match[1].length }))];
  }
}
