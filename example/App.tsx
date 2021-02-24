import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import {
  Editor,
  Doc,
  Paragraph,
  Text,
  Heading,
  ListItem,
  OrderedList,
  BulletList,
  Blockquote,
  CodeBlock,
  HardBreak,
  Bold,
  CodeInline,
  Italic,
  Strikethrough,
  Underline,
  History,
  Placeholder,
} from "../src/index";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const editor = new Editor(containerRef.current, {
        extensions: [
          new Doc(),
          new Paragraph(),
          new Text(),
          new Heading(),
          new ListItem(),
          new OrderedList(),
          new BulletList(),
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Bold(),
          new CodeInline(),
          new Italic(),
          new Strikethrough(),
          new Underline(),
          new History(),
          new Placeholder({
            placeholder: "创作从这里开始",
            emptyNodeClass: "placeholder",
          }),
        ],
      });

      setEditor(editor);
      editor.focus();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "16px",
        overflow: "auto",
        position: "relative",
      }}
    >
      <div style={{ display: "flex" }}>
        <BoldMenu editor={editor} />
      </div>
      <div
        ref={containerRef}
        style={{
          width: 500,
          minHeight: 200,
          marginTop: 20,
          border: "1px solid #ddd",
        }}
      ></div>
    </div>
  );
}

/**
 * 加粗按钮
 */
function BoldMenu(props: { editor: Editor | null }) {
  const { editor } = props;

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (editor) {
      editor.on("change", (editor: Editor) => {
        const isActive = editor.isMarkActive(
          editor.view.state.schema.marks.bold
        );
        setActive(isActive);
      });
    }
  }, [editor]);

  const onClick = () => {
    editor.execute();
  };

  return <button style={{ backgroundColor: active ? "red" : "" }}>加粗</button>;
}
