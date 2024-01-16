import React, { useContext } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  //navigate
  const navigate = useNavigate();

  //context
  const { setAuth, setLoading, setError, setUser, error } =
    useContext(UserContext);

  //form state
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      //form validations
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .required("Email is required")
          .email("Enter a valid email address!"),
        password: Yup.string().required("password is required!"),
      }),
      //function to handle form submit
      onSubmit: async (values, { resetForm }) => {
        try {
          setLoading(true);
          setError(null);
          const { data } = await axios.post("/api/users/login", values);
          setLoading(false);
          if (data.success) {
            setUser(data.data);
            setAuth(true);
            resetForm({
              values: { email: "", password: "" },
            });
            navigate("/");
          } else setError(data);
        } catch (error) {
          setError(error);
        }
      },
    });
  const { email, password } = values;
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black max-w-[400px] flex flex-col gap-5 text-xl shadow-lg p-8 rounded-lg mx-auto"
    >
      <h2 className="text-center text-3xl font-semibold mb-10">Login</h2>
      <div>
        <div className="flex gap-4 items-center border border-gray-200 rounded-lg p-3">
          <MdEmail />
          <input
            className="outline-none bg-black text-white"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.email && errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <div className="flex gap-4 items-center border border-gray-200 rounded-lg p-3">
          <RiLockPasswordFill />
          <input
            className="outline-none bg-black text-white"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.password && errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <input
        className="p-3 bg-[#00df9a] text-white rounded-lg cursor-pointer"
        type="submit"
        value="Login"
      />
      {error && <p className="text-sm text-red-600 mt-5">{error.message}</p>}
    </form>
  );
};

export default Login;
