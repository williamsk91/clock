import { useState } from "react";

import { Editor } from "../../components/Note/Editor";

export default {
  title: "Note / Editor",
  component: Editor,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "sidebar",
    },
  },
};

export const base = () => (
  <Editor initialContent={initialContent} onUpdate={() => null} />
);

const WithDataStory = () => {
  const [content, setContent] = useState<Object>(initialContent);
  return (
    <div>
      <Editor initialContent={initialContent} onUpdate={setContent} />
      <pre>
        <code
          dangerouslySetInnerHTML={{ __html: JSON.stringify(content, null, 4) }}
        />
      </pre>
    </div>
  );
};

export const WithData = () => <WithDataStory />;

const initialContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "H1 title",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "H2 title",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "H3 title",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Wow, this ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "editor",
        },
        {
          type: "text",
          text: " ",
        },
        {
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
          text: "instance",
        },
        {
          type: "text",
          text: " ",
        },
        {
          type: "text",
          marks: [
            {
              type: "strike",
            },
          ],
          text: "exports",
        },
        {
          type: "text",
          text: " its content as JSON. very cool paragraph",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "orderedList",
      attrs: {
        start: 1,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "list 1",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "list 2",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "list 1",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "list 2",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "inline ",
        },
        {
          type: "text",
          marks: [
            {
              type: "code",
            },
          ],
          text: "code",
        },
        {
          type: "text",
          text: " is cool",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "Code blocks are better\nif you then me",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Dream big, adjust later",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "hard",
        },
      ],
    },
    {
      type: "horizontalRule",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "break",
        },
      ],
    },
    {
      type: "paragraph",
    },
  ],
};
