# Spelling-Editor

> 基于Prosemirror可扩展、易用的富文本编辑器

- 开箱即用
- 内置丰富的功能扩展
- 功能可扩展、积木式搭建

## Get Start

```bash
npm install --save spelling-editor
```

### Exmaple

```bash
npm run dev
```

## Examples

```javascript

import { Editor, Extensions Commands } from 'spelling-editor'

const { Doc, Paragraph, Text, Heading } = Extensions

const dom = document.getElementById('edit-area')
const editor = Editor.create(dom, [new Doc(), new Paragraph(), new Text(), new Heading()], { })

const boldMark = editor.getMark('bold')
editor.execute(Commands.toggleMark(boldMark))

```

## Editor Api

### Create an Instance

##### Editor.create(place, extensiongs, configs)

```js
const { Doc, Paragraph, Text, Heading } = Extensions
const dom = document.getElementById('edit-area')
const exts = [new Doc(), new Paragraph(), new Text(), new Heading()]
const instance = await Editor.create(dom, exts, {})

```
## Editor Configs

```typescript
  interface EditorConfig {
    /**
     * 编辑器依赖的扩展列表，用于增强丰富编辑器的能力
     */
    extensions?: Extension[];
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

```

### Instance Vairables

##### isComposing
##### isFocusing
##### isEditable

### Instance methods
##### instance.getMark(name: string)

##### instance.getNode(name: string)

##### instance.getData(serializer?: Serializer)

Get Editor Content

##### instance.setData(data: any | Node, parse?: Parser)

Set Editor Content

##### instance.execute(...commands: Command[])

Execute a set of commands in a row


##### instance.toggleEditable(editable: boolean)


##### instance.replaceExtension(extensions: Extension[])


##### instance.focus()


##### instance.destroy()


##### instance.isMarkActive(type: MarkType): boolean


##### instance.isNodeActive(type: NodeType, attrs: Record<string, any>): boolean


## Extension
