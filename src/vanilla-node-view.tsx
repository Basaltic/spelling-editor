import { Node } from "prosemirror-model";
import { Decoration, EditorView, NodeView } from "prosemirror-view";
import { Editor } from "./editor";

export default class VanillaNodeView implements NodeView {
  dom: HTMLElement | null;
  contentDOM: HTMLElement | null;
  view: EditorView;
  node: Node;
  decorations: Decoration[] = [];
  editor: Editor;
  getPos: () => number;

  // 是否选中
  isSelected: boolean = false;

  constructor(
    node: Node,
    view: EditorView,
    getPos: () => number,
    editor: Editor
  ) {
    this.node = node;
    this.view = view;

    this.getPos = getPos;
    this.editor = editor;

    this.dom = null;
    this.contentDOM = null;
  }

  update(node: Node, decorations: Decoration[]) {
    return true;
  }

  selectNode() {
    if (this.view.editable) {
      this.isSelected = true;
    }
  }

  deselectNode() {
    if (this.view.editable) {
      this.isSelected = false;
    }
  }

  destroy() {
    this.dom = null;
  }

  stopEvent() {
    return true;
  }
}
