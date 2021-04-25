import { Editor } from "@tiptap/react";
import { Button } from "antd";
import styled from "styled-components";

import { ReactComponent as Cb } from "../../assets/noteIcons/code-view.svg";
import { ReactComponent as Bq } from "../../assets/noteIcons/double-quotes-l.svg";
import { ReactComponent as H1 } from "../../assets/noteIcons/h1.svg";
import { ReactComponent as H2 } from "../../assets/noteIcons/h2.svg";
import { ReactComponent as H3 } from "../../assets/noteIcons/h3.svg";
import { ReactComponent as Ol } from "../../assets/noteIcons/list-ordered.svg";
import { ReactComponent as Ul } from "../../assets/noteIcons/list-unordered.svg";
import { ReactComponent as Hr } from "../../assets/noteIcons/separator.svg";
import { ReactComponent as Note } from "../../assets/noteIcons/sticky-note-2-line.svg";

interface Props {
  editor: Editor | null;
}

export const Menu = (props: Props) => {
  const { editor } = props;

  return (
    <div>
      <IconButton isActive={false} type="text" icon={<Note />} />
      <IconButton
        type="text"
        isActive={editor?.isActive("heading", { level: 1 }) ?? false}
        onClick={() =>
          editor?.chain().toggleHeading({ level: 1 }).focus().run()
        }
        icon={<H1 />}
      />
      <IconButton
        type="text"
        isActive={editor?.isActive("heading", { level: 2 }) ?? false}
        onClick={() =>
          editor?.chain().toggleHeading({ level: 2 }).focus().run()
        }
        icon={<H2 />}
      />
      <IconButton
        type="text"
        isActive={editor?.isActive("heading", { level: 3 }) ?? false}
        onClick={() =>
          editor?.chain().toggleHeading({ level: 3 }).focus().run()
        }
        icon={<H3 />}
      />
      <IconButton
        type="text"
        isActive={editor?.isActive("orderedList") ?? false}
        onClick={() => editor?.chain().toggleOrderedList().focus().run()}
        icon={<Ol />}
      />
      <IconButton
        type="text"
        isActive={editor?.isActive("bulletList") ?? false}
        onClick={() => editor?.chain().toggleBulletList().focus().run()}
        icon={<Ul />}
      />
      <IconButton
        type="text"
        isActive={editor?.isActive("codeBlock") ?? false}
        onClick={() => editor?.chain().toggleCodeBlock().focus().run()}
        icon={<Cb />}
      />
      <IconButton
        type="text"
        isActive={editor?.isActive("blockquote") ?? false}
        onClick={() => editor?.chain().toggleBlockquote().focus().run()}
        icon={<Bq />}
      />
      <IconButton
        type="text"
        isActive={editor?.isActive("horizontalRule") ?? false}
        onClick={() => editor?.chain().setHorizontalRule().focus().run()}
        icon={<Hr />}
      />
    </div>
  );
};

const IconButton = styled(Button)<{ isActive: boolean }>`
  fill: ${(p) => (p.isActive ? p.theme.color.primary : p.theme.text.main)};
`;
