import React from "react";
import Head from "next/head";
import Link from "next/link";
import style from "../styles/Form.module.css";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { signin_validation } from "@/validation/validate";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: signin_validation,
    onSubmit: async (values) => {
      const status = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      if (status.ok) router.push(status.url);
    },
  });

  const handleGoogleSignin = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  const handleGithubLogin = async () => {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-[40vw] mx-auto mt-10 flex flex-col rounded-lg justify-items-center bg-slate-100">
        <form onSubmit={formik.handleSubmit} className="w-[30vw] mx-auto m-10">
          <div className="mb-6">
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter Your Email"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
            />
          </div>
          {formik.errors.email ? <span>{formik.errors.email}</span> : <></>}
          <div className="mb-6">
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          {formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : (
            <></>
          )}
          <button type="submit" className={style.input_button}>
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleSignin}
            className={style.input_button}
          >
            Sign In with Google
          </button>
          <button
            type="button"
            onClick={handleGithubLogin}
            className={style.input_button}
          >
            Sign In with Github
          </button>
        </form>
        <p className="text-center text-gray-400 my-4">
          dont have an account yet?{" "}
          <Link href={"/signup"}>
            {" "}
            <span className="text-blue-400 cursor-pointer ">Sign up</span>{" "}
          </Link>
        </p>
      </section>
    </>
  );
};

export default Login;
