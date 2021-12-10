import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import { DocumentEditor } from "./components/DocumentEditor";
import { Formik, Form } from "formik";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Print,
  DocumentEditor,
} from "@syncfusion/ej2-react-documenteditor";
import pt_br from "@syncfusion/ej2-locale/src/pt-BR.json";

import { L10n } from "@syncfusion/ej2-base";
L10n.load(pt_br);

DocumentEditorContainerComponent.Inject(Toolbar, Print);

function App() {
  const campo = {
    name: "document",
    label: "Editor",
    validation: {
      required: true,
    },
    size: 12,
  };
  const [documentEditor, setDocumentEditor] = useState<any>();

  return (
    <DocumentEditorContainerComponent
      ref={(scope) => {
        if (scope?.documentEditor) setDocumentEditor(scope.documentEditor);
      }}
      id="container"
      serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
      enableToolbar={true}
      height="100%"
      locale="pt-BR"
      toolbarClick={(e) => {
        const id = e.item.id;

        if (id === "print") documentEditor.print();
      }}
      toolbarItems={[
        "New",
        "Open",
        "Separator",
        "Undo",
        "Redo",
        "Separator",
        "Image",
        "Table",
        "Hyperlink",
        "TableOfContents",
        "Separator",
        "Header",
        "Footer",
        "PageSetup",
        "PageNumber",
        "Break",
        "InsertFootnote",
        "Separator",
        "Find",
        "Separator",
        "Comments",
        {
          id: "print",
          text: "Imprimir",
          prefixIcon:
            "e-btn-icon e-de-icon-Print e-de-padding-right e-icon-left",
          tooltipText: "Clique para imprimir o documento",
        },
      ]}
    />
  );

  // return (
  //   <Formik
  //     initialValues={{ document: "" }}
  //     onSubmit={(values) => console.log(values)}
  //   >
  //     {(formik) => (
  //       <Form style={{ height: "100vh" }}>
  //         <DocumentEditor
  //           config={campo}
  //           setFormikValue={(fieldName: string, value: any) =>
  //             formik.setFieldValue(fieldName, value)
  //           }
  //           value={formik.values.document}
  //           errors={formik.errors.document}
  //           touched={formik.touched.document}
  //           setFieldTouched={formik.setFieldTouched}
  //         />
  //       </Form>
  //     )}
  //   </Formik>
  // );
}

export default App;
