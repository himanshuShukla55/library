import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  //navigate
  const navigate = useNavigate();
  //form state
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        role: "VIEW_ALL",
      },
      //form validations
      validationSchema: Yup.object().shape({
        name: Yup.string()
          .required("name is required!")
          .matches(
            /^[A-Za-z ]{2,20}$/,
            "name should be 2-20 characters long and should not cointain any special characters or digits!"
          ),
        email: Yup.string()
          .required("Email is required")
          .email("Enter a valid email address!"),
        password: Yup.string()
          .required("password is required!")
          .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@!&%])[A-Za-z0-9$@!&%]{8,}$/,
            "password length should be atleast 8, should have one capital, small and special {@,$,%,&,!} character, should not contain white spaces!"
          ),
      }),
      //function to handle form submit
      onSubmit: async (values, { resetForm }) => {
        try {
          const res = await axios.post("/api/users/signup", values);
          resetForm({
            values: { name: "", email: "", password: "", role: "VIEW_ALL" },
          });
          navigate("/login");
        } catch (error) {
          console.log("error in signing up!");
          console.error(error);
        }
      },
    });
  const { name, email, password, role } = values;
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black max-w-[400px] flex flex-col gap-5 text-xl shadow-lg p-8 rounded-lg mx-auto"
    >
      <h2 className="text-center text-3xl font-semibold mb-10">Sign Up Form</h2>
      <div>
        <div className="flex gap-4 items-center border border-gray-200 rounded-lg p-3">
          <FaUser />
          <input
            className="outline-none bg-black text-white"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.name && errors.name && (
          <p className="text-sm text-red-600">{errors.name}</p>
        )}
      </div>

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
      <div className="flex gap-4 items-center border border-gray-200 rounded-lg p-3">
        <h3>ROLE</h3>
        <select
          className="outline-none bg-black text-white"
          name="role"
          value={role}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="VIEW_ALL">VIEW ALL</option>
          <option value="CREATOR">CREATOR & VIEWER</option>
        </select>
      </div>
      <input
        className="p-3 bg-[#00df9a] text-white rounded-lg cursor-pointer"
        type="submit"
        value="SIGN UP"
      />
    </form>
  );
};

export default SignUp;
