import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const EditerView = ({ description }) => {
 /*  const [contentstate, setContentstate] = useState({});

  useEffect(() => {
    if (description) {
      const parse = JSON.parse(description);
      setContentstate(parse);
    }
    console.log(description)
  }, [description]); */
  return (
    <Editor
      initialContentState={description}
      wrapperClassName="document-wrapper"
      editorClassName="document-editor"
      toolbarClassName="document-toolbar"
      readOnly
      toolbarHidden
    />
  );
};

export default EditerView;
