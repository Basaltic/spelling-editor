import './placeholder.css'
import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { Extension } from '../../extension'

export default class Placeholder extends Extension {
  name = 'empty-placeholder'

  constructor(options: { emptyNodeClass: string; placeholder: string } = { emptyNodeClass: 'placeholder', placeholder: '' }) {
    super(options)
  }

  plugins = [
    new Plugin({
      props: {
        decorations: state => {
          const { doc } = state
          const decorations: Decoration[] = []
          const completelyEmpty = doc.textContent === '' && doc.childCount <= 1 && doc.content.size <= 2

          doc.descendants((node, pos) => {
            if (!completelyEmpty) {
              return
            }
            if (pos !== 0 || node.type.name !== 'paragraph') {
              return
            }

            const decoration = Decoration.node(pos, pos + node.nodeSize, {
              class: this.options.emptyNodeClass,
              'data-empty-text': this.options.placeholder,
            })
            decorations.push(decoration)
          })

          return DecorationSet.create(doc, decorations)
        },
      },
    }),
  ]
}
