import React from "react";
import Head from "next/head";
import Link from "next/link";
import style from "../styles/Form.module.css";
import { useFormik } from "formik";
import { signup_validation } from "@/validation/validate";
import { useRouter } from "next/router";
const Signup = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: signup_validation,
    onSubmit: async (values) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };

      await fetch("http://localhost:3000/api/auth/Signup", options)
        .then((res) => res.json())
        .then((data) => {
          if (data) router.push("http://localhost:3000");
        });
    },
  });

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <section className="w-[40vw] mx-auto mt-10 flex flex-col rounded-lg justify-items-center bg-slate-100">
        <form onSubmit={formik.handleSubmit} className="w-[30vw] mx-auto mt-12">
          <div className="mb-6">
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formik.errors.username && formik.touched.username ? (
            <span>{formik.errors.username}</span>
          ) : (
            <></>
          )}
          <div className="mb-6">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter Your Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <span>{formik.errors.email}</span>
          ) : (
            <></>
          )}

          <div className="mb-6">
            <input
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
              placeholder="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span>{formik.errors.password}</span>
          ) : (
            <></>
          )}
          <div className="mb-6">
            <input
              type="password"
              name="cpassword"
              {...formik.getFieldProps("cpassword")}
              placeholder="Confirm password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span>{formik.errors.cpassword}</span>
          ) : (
            <></>
          )}

          <button type="submit" className={style.input_button}>
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 my-4 ">
          Have an account?
          <Link href={"/login"}>
            <span className="text-blue-700 cursor-pointer">Sign In</span>
          </Link>
        </p>
      </section>
    </>
  );
};

export default Signup;
