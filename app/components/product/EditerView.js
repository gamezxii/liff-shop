import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unordered-list-item",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "6348gr",
      text: "test",
      type: "unordered-list-item",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

const EditerView = ({ content }) => {
  const [contentstate, setContentstate] = useState(null);

  useEffect(() => {
    if (content) {
      const parse = JSON.parse(content);
      setContentstate(parse);
    }
    console.log(content)
  }, [content]);
  
  const handleEditor = (contentState) => {
    setContentstate(contentState)
  }

  return (
    <div>
      {/* <Editor
        initialContentState={contentstate}
        onContentStateChange={handleEditor}
        wrapperClassName="document-wrapper"
        editorClassName="document-editor"
        toolbarClassName="document-toolbar"
        readOnly
        toolbarHidden
      /> */}
    </div>
  );
};

export default EditerView;
