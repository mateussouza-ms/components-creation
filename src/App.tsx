import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { DocumentEditor } from "./components/DocumentEditor";
import { Formik, Form } from "formik";

function App() {
  const campo = {
    name: "document",
    label: "Editor",
    validation: {
      required: true,
    },
    size: 12,
  };

  return (
    <Formik
      initialValues={{ document: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {(formik) => (
        <Form style={{ height: "100vh" }}>
          <DocumentEditor
            config={campo}
            setFormikValue={(fieldName: string, value: any) =>
              formik.setFieldValue(fieldName, value)
            }
            value={formik.values.document}
            errors={formik.errors.document}
            touched={formik.touched.document}
            setFieldTouched={formik.setFieldTouched}
          />
        </Form>
      )}
    </Formik>
  );
}

export default App;
