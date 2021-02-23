import { toggleMark } from 'prosemirror-commands';
import { MarkSpec } from 'prosemirror-model';
import { MarkExtension } from '../../extension';
import markInputRule from '../../markInputRule';

export default class Underline extends MarkExtension {
  name = 'underline';

  schema: MarkSpec = {
    parseDOM: [
      { tag: 'u' },
      {
        style: 'text-decoration',
        getAttrs: value => (value === 'underline' ? null : false),
      },
    ],
    toDOM: () => ['u', 0],
  };

  inputRules({ type }) {
    return [markInputRule(/(?:__)([^_]+)(?:__)$/, type)];
  }

  keys({ type }) {
    return {
      'Mod-u': toggleMark(type),
    };
  }

  get toMarkdown() {
    return {
      open: '__',
      close: '__',
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  parseMarkdown() {
    return { mark: 'underline' };
  }
}
