import React from "react";
/* import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
); */

const EditerView = (props) => {
 /*  const [contentstate, setContentstate] = useState({});

  useEffect(() => {
    if (description) {
      const parse = JSON.parse(description);
      setContentstate(parse);
    }
    console.log(description)
  }, [description]); */

  {/* <Editor
      initialContentState={props.description}
      wrapperClassName="document-wrapper"
      editorClassName="document-editor"
      toolbarClassName="document-toolbar"
      readOnly
      toolbarHidden
    /> */}
  return (
    <div>
      {JSON.stringify(props.description)}
    </div>
  );
};

export default EditerView;
