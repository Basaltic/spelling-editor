import { baseKeymap } from "prosemirror-commands";
import { InputRule, inputRules } from "prosemirror-inputrules";
import { keymap } from "prosemirror-keymap";
import { Schema } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import { Editor } from "./editor";
import { Extension } from "./extension";

/**
 * 插件管理器
 */
export default class ExtensionsManager {
  private extensions: Extension[] = [];

  constructor(extensions: Extension[]) {
    this.extensions = extensions;
  }

  /**
   * 替换所有插件
   */
  public setExtensions(extensions: Extension[]) {
    this.extensions = extensions;
  }

  /**
   * 创建schema
   */
  public createSchema(defaultNodes: any = {}, defaultMarks: any = {}) {
    const nodes = { ...defaultNodes };
    const marks: any = {};

    for (const ext of this.extensions) {
      if (ext.type === "node" && ext.schema) {
        nodes[ext.name] = ext.schema;
      }
      if (ext.type === "mark" && ext.schema) {
        marks[ext.name] = ext.schema;
      }
    }

    return new Schema({
      nodes,
      marks,
    });
  }

  /**
   * 创建节点view展示
   */
  public createNodeViews(editor: Editor) {
    const views: any = {};
    for (const ext of this.extensions) {
      if (ext.type === "node" && ext.view) {
        views[ext.name] = ext.view(editor);
      }
    }

    return views;
  }

  /**
   * 聚合扩展中 prosemirror 的插件
   */
  public createPlugins() {
    let plugins: Plugin[] = [];
    for (const ext of this.extensions) {
      if (ext.plugins && ext.plugins.length > 0) {
        plugins.push(...ext.plugins);
      }
    }

    return plugins;
  }

  /**
   * 创建
   */
  public createKeymaps(schema: Schema) {
    let keymaps: Plugin[] = [];
    for (const ext of this.extensions) {
      if (ext.keymap) {
        const keys = ext.keymap(schema);
        keymaps.push(keymap(keys));
      }
    }

    keymaps.push(keymap(baseKeymap));

    return keymaps;
  }

  /**
   * 创建 input rules
   */
  public buildInputRules(schema: Schema) {
    let rules: InputRule[] = [];
    for (const ext of this.extensions) {
      if (ext.type === "node") {
        const rawRules = ext.inputRules({ type: schema.nodes[ext.name] });
        rules = [...rules, ...rawRules];
      } else if (ext.type === "mark") {
        const rawRules = ext.inputRules({ type: schema.marks[ext.name] });
        rules = [...rules, ...rawRules];
      }
    }

    console.log(rules);

    return inputRules({ rules });
  }
}
