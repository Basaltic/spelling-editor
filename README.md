# Spelling-Editor

> 基于Prosemirror可扩展、易用的富文本编辑器

- 拿来即用
- 内置丰富的功能扩展
- 功能扩展可以任意的搭建

## 开始使用

```bash
tnpm install spelling-editor
```

## 快速开始

```javascript

import { Editor, Doc, Paragraph, Text, Heading } from 'spelling-editor'

const dom = document.getElementById('edit-area')
Editor.create(dom, { extensions: [new Doc(), new Paragraph(), new Text(), new Heading()] })

```