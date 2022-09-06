import type { NextPage } from "next";
import { User } from "../models/index";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { useGetUsers, useLoginUser, useUser } from "../hooks/users";
import * as Yup from "yup";
import { AxiosError } from "axios";

const Login: NextPage = () => {
  const user = useGetUsers();
  const userAuth = useUser();
  const mutation = useLoginUser();
  console.log(userAuth.error);
  console.log(userAuth.data);
  console.log(userAuth.isSuccess);
  return (
    <div>
      <h1>Login</h1>
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
      {user.isSuccess && userAuth?.isSuccess &&(
        <>
          <a href="/api/logout">Logout</a>
          <ul>
            {user.data?.map(({ email }, i) => (
              <li key={i}>{email}</li>
            ))}
          </ul>
          {/* {user.isFetching && <div>Updating in background...</div>} */}
        </>
      )}
      {user.isLoading && "Loading"}
      {user.error instanceof AxiosError && user.error.message}
      {userAuth.error instanceof AxiosError && userAuth.error.response?.data.message }
    </div>
  );
};

export default Login;
