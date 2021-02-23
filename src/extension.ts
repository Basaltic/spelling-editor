import { InputRule } from 'prosemirror-inputrules';
import { NodeSpec, Node, MarkSpec, Schema, NodeType, MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Decoration, EditorView, NodeView } from 'prosemirror-view';
import { Editor } from './editor';
import { RawCommand } from './types';

/**
 * 扩展
 * 对于prosemirror的schema,view,plugin,command,keymap等，以及其他自定义的一些统一封装，方便统一处理
 */
export class Extension {
  //  插件的类型
  public type: string = 'ext';
  // 插件的名称
  public name: string = '';
  // schema定义
  public schema?: NodeSpec | MarkSpec;

  // 定义command
  public static commands?: Record<string, RawCommand>;

  // 节点视图展示定义
  public view?: (editor: Editor) => (node: Node, view: EditorView, getPos: (() => number) | boolean, decorations: Decoration[]) => NodeView;

  // prosemirror的插件
  public plugins: Plugin[] = [];

  // 快捷键
  public keymap?: (schema: Schema) => Record<string, any>;

  // Input Rule
  public inputRules(options: { type: NodeType | MarkType }): InputRule[] {
    return [];
  }

  // 扩展所需的参数
  public options: any;

  constructor(options: any = {}) {
    this.options = options;
  }
}

/**
 * Node类型的扩展
 */
export class NodeExtension extends Extension {
  public type: string = 'node';
  public schema?: NodeSpec;
}

/**
 * Mark类型的扩展
 */
export class MarkExtension extends Extension {
  public type: string = 'mark';
  public schema?: MarkSpec;
}
