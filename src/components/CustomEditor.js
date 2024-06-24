// components/custom-editor.js

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

// Dynamically import CKEditor and the custom build, with SSR disabled
// const CKEditor = dynamic(
//   () => import("@ckeditor/ckeditor5-react").then((module) => module.CKEditor),
//   {
//     ssr: false, // This line is important. It disables server-side rendering for CKEditor.
//   }
// );

// const Editor = dynamic(() => import("ckeditor5-custom-build"), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
    "sourceEditing",
  ],
  htmlEmbed: {
    showPreviews: true,
  },
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
    disallow: [
      {
        attributes: [
          { key: /.*/, value: /data:(?!image\/(png|jpeg|gif|webp))/i },
        ],
      },
    ],
  },
};

function CustomEditor(props) {
  const [hasLoaded, setHasLoaded] = React.useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasLoaded(true);
      window.CKEDITOR_VERSION = "37.0.0";
    }
  }, []);
  useEffect(() => {
    console.log("CustomEditor loaded ", Editor);
  }, []);
  return (
    <>
      {hasLoaded ? (
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={props.data}
          onChange={(event, editor) => {
            const data = editor.getData();
            props.setData(data);
            console.log({ event, editor, data });
            console.log(data);
          }}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default CustomEditor;
