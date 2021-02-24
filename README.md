# Spelling-Editor

> 基于Prosemirror可扩展、易用的富文本编辑器

- 开箱即用
- 内置丰富的功能扩展
- 功能可扩展、积木式搭建

## 开始使用

```bash
tnpm install spelling-editor
```

## 快速开始

```javascript

import { Editor, Extensions Commands } from 'spelling-editor'

const { Doc, Paragraph, Text, Heading } = Extensions

const dom = document.getElementById('edit-area')
const editor = Editor.create(dom, { extensions: [new Doc(), new Paragraph(), new Text(), new Heading()] })

const boldMark = editor.getMark('bold')
editor.execute(Commands.toggleMark(boldMark))

```

## 通用命令
