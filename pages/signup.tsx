import type { NextPage } from "next";
import { User } from "../models/index";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { useGetUsers, useSignupUser,  } from "../hooks/users";
import * as Yup from "yup";

const Signup: NextPage = () => {
  const user = useGetUsers();
  const mutation = useSignupUser()
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(7, "Must grather than 7 characters")
            .required("Required"),
        })}
        onSubmit={(
          values: User,
          { setSubmitting, resetForm }: FormikHelpers<User>
        ) => {
          mutation.mutate(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="youremail@test.com" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" placeholder="Secretpass-123" />
          <ErrorMessage name="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <br />
      {user.isSuccess && (
        <>
          <ul>
            {user.data?.map(({ email }, i) => (
              <li key={i}>{email}</li>
            ))}
          </ul>
          {/* {user.isFetching && <div>Updating in background...</div>} */}
        </>
      )}
      {user.isLoading && "Loading"}
      {user.error instanceof Error && user.error.message}
    </div>
  );
};

export default Signup;