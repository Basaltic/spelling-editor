import { toggleMark } from 'prosemirror-commands';
import { MarkExtension } from '../../extension';
import markInputRule from '../../markInputRule';

export default class CodeInline extends MarkExtension {
  name = 'code_inline';

  schema: any = {
    excludes: '_',
    parseDOM: [{ tag: 'code' }],
    toDOM: () => ['code', { spellCheck: false }],
  };

  inputRules({ type }) {
    return [markInputRule(/(?:^|[^`])(`([^`]+)`)$/, type)];
  }

  keys({ type }) {
    return {
      'Mod`': toggleMark(type),
    };
  }

  get toMarkdown() {
    return {
      open(_state, _mark, parent, index) {
        return backticksFor(parent.child(index), -1);
      },
      close(_state, _mark, parent, index) {
        return backticksFor(parent.child(index - 1), 1);
      },
      escape: false,
    };
  }

  parseMarkdown() {
    return { mark: 'code_inline' };
  }
}

function backticksFor(node, side) {
  const ticks = /`+/g;
  let match: RegExpMatchArray | null;
  let len = 0;

  if (node.isText) {
    while ((match = ticks.exec(node.text))) {
      len = Math.max(len, match[0].length);
    }
  }

  let result = len > 0 && side > 0 ? ' `' : '`';
  for (let i = 0; i < len; i++) {
    result += '`';
  }
  if (len > 0 && side < 0) {
    result += ' ';
  }
  return result;
}
