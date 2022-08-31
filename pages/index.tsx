import type { NextPage } from "next";
import { Values } from "../models/index";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { v4 as uuid } from "uuid";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
          resetForm();
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="youremail@test.com" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" placeholder="Secretpass-123" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Home;
