import { Content, EditorContent, useEditor } from "@tiptap/react";
import { defaultExtensions } from "@tiptap/starter-kit";
import styled from "styled-components";

import { Spacer } from "../Spacer";
import { Menu } from "./Menu";

interface Props {
  initialContent: Content;
  onUpdate: (state: Content) => void;
}

export const Editor = (props: Props) => {
  const { initialContent, onUpdate } = props;
  const editor = useEditor({
    extensions: defaultExtensions({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    content: initialContent,
    onUpdate({ editor }) {
      const json = editor.getJSON();
      onUpdate(json);
    },
  });

  return (
    <Container>
      <Menu editor={editor} />
      <Spacer spacing="12" />
      <EditorContent editor={editor} />
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
  box-sizing: border-box;
  background: white;
  border-radius: 4px;

  .ProseMirror {
    color: ${(p) => p.theme.text.main};

    > * + * {
      margin-top: 0.75em;
    }

    &:focus {
      outline: none;
    }

    h1,
    h2,
    h3 {
      line-height: 1.1;
    }

    ol {
      counter-reset: list-counter;
      list-style: none;
      padding-left: 0;
      margin-top: 1.25em;
      margin-bottom: 1.25em;

      li {
        counter-increment: list-counter;
        position: relative;
        padding-left: 1.75em;

        &::before {
          content: counter(list-counter) ". ";
          position: absolute;
          left: 6px;
          color: ${(p) => p.theme.color.primary};
        }
      }
    }

    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 1.25em;
      margin-bottom: 1.25em;

      li {
        position: relative;
        padding-left: 1.75em;

        &::before {
          content: "";
          position: absolute;
          background-color: ${(p) => p.theme.color.primary};
          border-radius: 50%;
          width: 6px;
          height: 6px;
          top: 7px;
          left: 8px;
        }
      }
    }

    code {
      padding: 0.2em 0.4em;
      border-radius: 3px;
      color: ${(p) => p.theme.color.primary};
      background: rgba(135, 131, 120, 0.15);
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    blockquote {
      padding-left: 1rem;
      border-left: 3px solid ${(p) => p.theme.color.primary};
    }

    hr {
      border-top: 2px solid ${(p) => p.theme.color.primary};
      margin: 1rem 0;
    }
  }
`;
