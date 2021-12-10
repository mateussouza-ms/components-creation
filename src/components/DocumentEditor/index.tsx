import React, { useCallback, useMemo, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./styles.scss";
import styled from "styled-components";

const EditorContainer = styled.div`
  height: 100%;
  .ck-editor {
    width: 100%;
  }
  .ck-content {
    min-height: 200px;
    max-height: 400px;
    overflow: auto;
  }
`;

interface ChangeFunction {
  (fieldName: string, value: any): void;
}

interface DocumentEditorProps {
  config: { name: string; validation: any; label: string; size: number };
  touched?: boolean;
  errors?: string;
  value: string;
  setFormikValue: ChangeFunction;
  setFieldTouched: ChangeFunction;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  config,
  touched,
  errors,
  setFormikValue,
  setFieldTouched,
  value,
}) => {
  const handleEditorBlur = useCallback(() => {
    setFieldTouched(config.name, true);
    //eslint-disable-next-line
  }, []);

  const handleEditorChange = useCallback((content: string, editor) => {
    const linearizedContent = content.replace(/(\r\n|\n|\r)/gm, "");
    console.log("handleEditorChange.linearizedContent", linearizedContent);
    console.log("handleEditorChange.editor", editor);

    const body = editor
      // if (!linearizedContent.startsWith("<div><p>")) {
      //   setFormikValue(config.name, `<div><p>${content}</p></div>`);
      //   return;
      // }

      // if (!linearizedContent.startsWith("<div>")) {
      //   setFormikValue(config.name, `<div>${content}</div>`);
      //   return;
      // }

      .setFormikValue(config.name, content);

    //eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        background: "#e6e6e6",
        padding: "0.5cm",
      }}
    >
      <div
        id="editor"
        contentEditable={true}
        style={{
          margin: "0.5cm auto",
          padding: "2cm 2cm 3cm 3cm",
          width: "210mm",
          height: "297mm",
          background: "#fff",
          border: "1px solid #c8c8c8",
          outline: "none",
        }}
        onKeyUp={(e) => {
          const state = document.queryCommandValue("bold");
          console.log("state", state);
          const editableElement = e.target as HTMLElement;
          const innerHTML = editableElement.innerHTML;
          const innerText = editableElement.innerText?.replace(
            /(\r\n|\n|\r)/gm,
            ""
          );

          if (innerHTML !== value) {
            setFormikValue(config.name, !innerText ? "" : innerHTML);
          }
        }}
      ></div>
    </div>
  );

  return (
    <div
      className={`form-group position-relative col-lg-${config.size} ${
        config.validation.required && "required"
      }`}
      style={{ height: "100%" }}
    >
      <label>{config.label}</label>
      <EditorContainer
        className={`input-group ${errors && touched && "border-danger"}`}
      >
        <Editor
          onBlur={handleEditorBlur}
          apiKey="qu5oslr6k3o9fu9nixliyjd6dt3bd3llbpdx7mc8tlzy1e17"
          value={value}
          // initialValue="<div><p></p></div>"

          init={{
            height: "100%",
            min_height: 150,
            branding: false,
            width: "100%",
            // menubar: false,
            language: "pt_BR",
            block_formats: "Parágrafo=p; Titulo=h3; Subtitulo=h4;",
            plugins: [
              "advlist autolink lists link charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter | \
              bullist numlist | link | fullscreen | customInsertButton customDateButton",
            content_style: `
              // body { 
              //   background: #e6e6e6;                
              // } 
              
              body  {
                margin: 0.5cm auto;
                padding: 3cm;
                width: 210mm; 
                height: 297mm;
                background: #fff;
                border: 1px solid #c8c8c8;
              }`,
            setup: (editor) => {
              editor.ui.registry.addButton("customInsertButton", {
                text: "My Button",
                onAction: () => {
                  console.log("editor", editor);
                  const content = `<div style="margin: 5cm">${editor.contentDocument?.body.innerHTML}</div>`;

                  editor.setContent(content);
                  // editor.insertContent(
                  //   "&nbsp;<strong>It's my button!</strong>&nbsp;"
                  // );
                },
              });

              var toTimeHtml = function (date: any) {
                return (
                  '<time datetime="' +
                  date.toString() +
                  '">' +
                  date.toDateString() +
                  "</time>"
                );
              };

              editor.ui.registry.addButton("customDateButton", {
                icon: "insert-time",
                tooltip: "Insert Current Date",
                disabled: true,
                onAction: () => {
                  editor.insertContent(toTimeHtml(new Date()));
                },
                onSetup: (buttonApi: any) => {
                  var editorEventCallback = (eventApi: any) => {
                    buttonApi.setDisabled(
                      eventApi.element.nodeName.toLowerCase() === "time"
                    );
                  };
                  editor.on("NodeChange", editorEventCallback);

                  /* onSetup should always return the unbind handlers */
                  return (buttonApi: any) => {
                    editor.off("NodeChange", editorEventCallback);
                  };
                },
              });
            },
          }}
          onBeforePaste={(event, editor) => {
            console.log("onBeforePaste.event", event);
          }}
          onPaste={(event, editor) => {
            console.log("onPaste.event", event);
          }}
          onEditorChange={(content: string, editor) => {
            console.log("editor.container", editor.container);

            const linearizedContent = content.replace(/(\r\n|\n|\r)/gm, "");
            // console.log(
            //   "handleEditorChange.linearizedContent",
            //   linearizedContent
            // );
            // console.log("handleEditorChange.editor", editor);

            const body = editor.contentDocument?.body;

            // console.log("body.scrollHeight", body.scrollHeight);

            // if (!linearizedContent.startsWith("<div><p>")) {
            //   setFormikValue(config.name, `<div><p>${content}</p></div>`);
            //   return;
            // }

            // if (!linearizedContent.startsWith("<div>")) {
            //   setFormikValue(config.name, `<div>${content}</div>`);
            //   return;
            // }

            setFormikValue(config.name, content);

            //eslint-disable-next-line
          }}
        />
        {errors && touched && (
          <div className="position-absolute top-error">{errors}</div>
        )}
      </EditorContainer>
    </div>
  );
};
