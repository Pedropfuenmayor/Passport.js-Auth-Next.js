import type { NextPage } from "next";
import { User } from "../models/index";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useGetUsers, usePostUser } from "lib/utils/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home: NextPage = () => {
  const { isFetching, ...queryInfo } = useGetUsers()
  const mutation = usePostUser()
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
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

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" placeholder="Secretpass-123" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <br />
      {queryInfo.isSuccess && (
        <>
          <ul>
            {queryInfo.data.map(({email, id}) => (
              <li key={id}>{email}</li>
            ))}
          </ul>
          {isFetching && <div>Updating in background...</div>}
        </>
      )}
      {queryInfo.isLoading && 'Loading'}
      {queryInfo.error instanceof Error && queryInfo.error.message}
    </div>
  )
}

export default Home;
