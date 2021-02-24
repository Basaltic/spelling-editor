import "prosemirror-view/style/prosemirror.css";
import { MarkType, NodeType, Node } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { Extension } from "./extension";
import { EditorState } from "prosemirror-state";
import EventEmitter from "eventemitter3";
import { Parser, Serializer } from "./types";
import ExtensionsManager from "./extension-manager";
import { chainCommands, Command } from "prosemirror-commands";
import { findParentNode, findSelectedNodeOfType } from "prosemirror-utils";

type EditorEventTypes = "change" | "change:doc";

/**
 * 编辑器配置
 */
export interface EditorConfig {
  /**
   * 编辑器依赖的扩展列表，用于增强丰富编辑器的能力
   */
  extensions: Extension[];
  /**
   * 设置编辑器是否可以编辑
   * @default true
   */
  editable?: boolean;
  /**
   * 执行命令之后自动聚焦编辑区域
   * @default true
   */
  focusAfterExecuteCommands?: boolean;
  /**
   * 是否开启 输入规则自动格式化的功能
   * @default true
   */
  inputFormatting?: boolean;
  /**
   * 是否开启快捷键功能
   * @default true
   */
  keymapsSettings?: boolean;
}

/**
 * 编辑器实例
 * 对于扩展的处理、api暴露
 */
export class Editor extends EventEmitter<EditorEventTypes> {
  private extensionManager: ExtensionsManager;
  private configs: EditorConfig;

  public view: EditorView;

  constructor(place: HTMLElement, configs: EditorConfig) {
    super();

    const {
      extensions,
      editable = true,
      inputFormatting = true,
      keymapsSettings = true,
    } = configs;

    // --- 初始化各种扩展、插件 --- //

    const extManager = new ExtensionsManager(extensions);

    const schema = extManager.createSchema();
    let plugins = extManager.createPlugins();

    if (keymapsSettings) {
      const keymaps = extManager.createKeymaps(schema);
      plugins.push(...keymaps);
    }

    if (inputFormatting) {
      const inputRules = extManager.buildInputRules(schema);
      plugins.push(inputRules);
    }

    // --- 初始化编辑器状态和视图 --- //

    const state = EditorState.create({ schema, plugins });
    const view = new EditorView(place, {
      state,
      editable: () => editable,
      dispatchTransaction: (transaction) => {
        const newState = view.state.apply(transaction);
        view.updateState(newState);

        this.emit("change", this);
      },
      attributes: {},
    });

    // 为了把编辑器实例注入到节点视图中， 自定义节点视图的初始化延后
    const nodeViews: any = extManager.createNodeViews(this);
    view.update({ ...view.props, nodeViews });

    this.view = view;
    this.extensionManager = extManager;
    this.configs = configs;
  }

  /**
   * 是否处于使用输入法输入中
   */
  get isComposing() {
    return this.view.composing;
  }

  /**
   * 检测是否编辑器处于聚焦的状态
   */
  get isFocusing(): boolean {
    return this.view.hasFocus();
  }

  /**
   * 是否可编辑
   */
  get isEditable(): boolean {
    return this.view.editable;
  }

  /**
   * 创建编辑器实例
   */
  static async create(
    place: HTMLElement,
    configs: EditorConfig
  ): Promise<Editor> {
    return new Editor(place, configs);
  }

  /**
   * 获取某个Mark
   *
   * @param {string} name mark名称
   */
  public getMark(name: string): MarkType | null {
    try {
      const mark = this.view.state.schema.marks[name];
      if (mark) return mark;
    } catch (e) {}
    return null;
  }

  /**
   * 获取某个节点
   *
   * @param {string} name 节点名称
   */
  public getNode(name: string): NodeType | null {
    try {
      const node = this.view.state.schema.nodes[name];
      if (node) return node;
    } catch (e) {}
    return null;
  }

  /**
   * 执行命令
   *
   * @param {Command[]} commands 需要执行的命令，如果传入多个命令，会按顺序一一执行
   */
  public execute(...commands: Command<any>[]) {
    let result = true;
    if (commands && commands.length > 0) {
      const cmd = chainCommands(...commands);
      result = cmd(this.view.state, this.view.dispatch);
    }

    if (this.configs.focusAfterExecuteCommands) {
      this.focus();
    }

    return result;
  }

  /**
   * 获取编辑器的数据
   *
   * @param {Serializer} serializer 序列化编辑器默认数据的函数
   * @returns {Node | any} 默认返回文档结构， 传入序列化函数的话，返回序列化后的数据结构
   */
  public getData(serializer?: Serializer) {
    if (serializer) {
      const data = serializer(this.view.state.doc);
      return data;
    } else {
      return this.view.state.doc;
    }
  }

  /**
   * 设置编辑器的数据
   *
   * @param data    需要设置的编辑器数据，会替换已有的数据
   * @param {Parser} parser 设置了解析器，会自动调用解析函数来解析传入的数据
   */
  public setData(data: any | Node, parser?: Parser) {
    if (parser) {
      data = parser(data)(this.view.state.schema);
    }
    const newState = EditorState.create({
      schema: this.view.state.schema,
      plugins: this.view.state.plugins,
      doc: data,
    });
    this.view.updateState(newState);
  }

  /**
   * 开关编辑器是否可以编辑
   *
   * @param {boolean} editable
   */
  public toggleEditable(editable: boolean) {
    this.view.update({ ...this.view.props, editable: () => editable });
  }

  /**
   * 替换所有扩展
   *
   * @param {Extension[]} extensions
   */
  public replaceExtension(extensions: Extension[]) {
    const { inputFormatting = true, keymapsSettings = true } = this.configs;

    this.extensionManager.setExtensions(extensions);

    const schema = this.extensionManager.createSchema();
    let plugins = this.extensionManager.createPlugins();

    if (keymapsSettings) {
      const keymaps = this.extensionManager.createKeymaps(schema);
      plugins.push(...keymaps);
    }

    if (inputFormatting) {
      const inputRules = this.extensionManager.buildInputRules(schema);
      plugins.push(inputRules);
    }

    const newState = EditorState.fromJSON(
      { schema: schema, plugins },
      this.view.state.toJSON()
    );
    this.view.updateState(newState);
  }

  /**
   * 聚焦编辑器
   */
  public focus() {
    this.view.focus();
  }

  /**
   * 销毁编辑器实例
   */
  public destroy() {
    this.removeAllListeners();
    this.view.destroy();
  }

  // ----------- Query Utils ------------- //

  /**
   * 检测某个mark是否处于激活状态
   *
   * @param {MarkType} markType mark的类型
   */
  public isMarkActive(type: MarkType): boolean {
    const state = this.view.state;
    let { from, $from, to, empty } = state.selection;
    if (empty)
      return type.isInSet(state.storedMarks || $from.marks()) ? true : false;
    else return state.doc.rangeHasMark(from, to, type);
  }

  /**
   * 检测某个符合条件的节点是否激活
   *
   * @param {NodeType} type 节点类型
   * @param {Record<string, any>} attrs 符合的节点属性
   */
  public isNodeActive(type: NodeType, attrs: Record<string, any>): boolean {
    const state = this.view.state;
    const node =
      findSelectedNodeOfType(type)(state.selection) ||
      findParentNode((node) => node.type === type)(state.selection);

    if (!Object.keys(attrs).length || !node) {
      return !!node;
    }

    return node.node.hasMarkup(type, { ...node.node.attrs, ...attrs });
  }
}
