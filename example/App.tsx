import "./app.css";
import React, { useEffect, useRef, useState } from "react";
import { Editor, Extensions, Commands } from "../src/index";

const {
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
} = Extensions;

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (containerRef.current && !editor) {
      const editor = new Editor(
        containerRef.current,
        [
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
        {}
      );

      setEditor(editor);
      editor.focus();
    }

    return () => {
      if (editor) {
        editor.destroy();
        setEditor(null);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="left">1</div>
      <div className="editor-container">
        {/* <div style={{ display: "flex" }}>
        <BoldMenu editor={editor} />
      </div> */}
        <div className="editor">
          <div ref={containerRef}></div>
        </div>
      </div>
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
    editor.execute(Commands.toggleMark(editor.getMark("bold")));
    editor.focus();
  };

  return (
    <button style={{ backgroundColor: active ? "red" : "" }} onClick={onClick}>
      加粗
    </button>
  );
}
