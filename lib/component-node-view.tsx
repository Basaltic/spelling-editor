// import React from 'react';
// import { Node } from 'prosemirror-model';
// import { NodeView, EditorView, Decoration } from 'prosemirror-view';
// import ReactDOM from 'react-dom';
// import { Editor } from './editor';

// export interface ComponentNodeProps {
//   node: Node;
//   editor: Editor;
//   isSelected: Boolean;
//   decorations: Decoration[];
//   getPos: () => number;
// }

// /**
//  * React 组件节点视图
//  */
// export abstract class ComponentNodeView implements NodeView {
//   dom: HTMLElement | null;
//   view: EditorView;
//   node: Node;
//   decorations: Decoration[] = [];
//   editor: Editor;
//   getPos: () => number;

//   // 是否选中
//   isSelected: boolean = false;

//   constructor(node: Node, view: EditorView, getPos: () => number, editor: Editor, as: string = 'div') {
//     this.node = node;
//     this.view = view;

//     this.getPos = getPos;
//     this.editor = editor;

//     this.dom = document.createElement(as);
//     this.render();
//   }

//   private render() {
//     const { node, editor, isSelected, decorations, getPos } = this;

//     const component = this.component({
//       node,
//       decorations,
//       editor,
//       isSelected,
//       getPos,
//     });

//     ReactDOM.render(<>{component}</>, this.dom);
//   }

//   abstract component(props: ComponentNodeProps): React.ReactElement;

//   update(node, decorations: Decoration[]) {
//     if (node.type !== this.node.type) {
//       return false;
//     }
//     this.decorations = decorations;
//     this.node = node;
//     this.render();
//     return true;
//   }

//   selectNode() {
//     if (this.view.editable) {
//       this.isSelected = true;
//       this.render();
//     }
//   }

//   deselectNode() {
//     if (this.view.editable) {
//       this.isSelected = false;
//       this.render();
//     }
//   }

//   destroy() {
//     if (this.dom) {
//       ReactDOM.unmountComponentAtNode(this.dom);
//     }
//     this.dom = null;
//   }

//   stopEvent() {
//     return true;
//   }
// }
