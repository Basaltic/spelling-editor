import { toggleMark } from 'prosemirror-commands';
import { MarkSpec } from 'prosemirror-model';
import { MarkExtension } from '../../extension';
import markInputRule from '../../markInputRule';

export default class Strikethrough extends MarkExtension {
  name = 'strikethrough';

  schema: MarkSpec = {
    parseDOM: [
      {
        tag: 's',
      },
      {
        tag: 'del',
      },
      {
        tag: 'strike',
      },
    ],
    toDOM: () => ['del', 0],
  };

  keys({ type }) {
    return {
      'Mod-d': toggleMark(type),
    };
  }

  inputRules({ type }) {
    return [markInputRule(/~([^~]+)~$/, type)];
  }

  get toMarkdown() {
    return {
      open: '~~',
      close: '~~',
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  get markdownToken() {
    return 's';
  }

  parseMarkdown() {
    return { mark: 'strikethrough' };
  }
}
