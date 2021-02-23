import { wrappingInputRule } from 'prosemirror-inputrules';
import { NodeExtension } from '../../extension';

export default class OrderedList extends NodeExtension {
  name = 'ordered_list';
  schema = {
    content: 'list_item+',
    group: 'block',
    attrs: { order: { default: 1 } },
    parseDOM: [
      {
        tag: 'ol',
        getAttrs(dom) {
          return { order: dom.hasAttribute('start') ? +dom.getAttribute('start') : 1 };
        },
      },
    ],
    toDOM(node) {
      return node.attrs.order == 1 ? ['ol', 0] : (['ol', { start: node.attrs.order }, 0] as any);
    },
  };

  inputRules({ type }) {
    return [
      wrappingInputRule(
        /^(\d+)\.\s$/,
        type,
        match => ({ order: +match[1] }),
        (match, node) => node.childCount + node.attrs.order === +match[1],
      ),
    ];
  }
}
