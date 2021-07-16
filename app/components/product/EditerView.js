import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const EditerView = ({ description }) => {
  const [contentstate, setContentstate] = useState(null);

  useEffect(() => {
    if (description) {
      const parse = JSON.parse(description);
      setContentstate(parse);
    }
  }, [description]);
  return (
    <Editor
      initialContentState={contentstate}
      wrapperClassName="document-wrapper"
      editorClassName="document-editor"
      toolbarClassName="document-toolbar"
      readOnly
      toolbarHidden
    />
  );
};

export default EditerView;
