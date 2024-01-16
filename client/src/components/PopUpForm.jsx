import React from "react";
import { FaUser } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const PopUpForm = ({
  bookId = "",
  formName,
  bookName,
  setVisibility,
  handleFormSubmit,
}) => {
  //navigate
  const navigate = useNavigate();
  //form state
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        name: bookName,
      },
      //form validations
      validationSchema: Yup.object().shape({
        name: Yup.string().required("name is required!"),
      }),
      //function to handle form submit
      onSubmit: (values) => {
        handleFormSubmit(values, bookId);
      },
    });
  const { name } = values;
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-300/50 text-white">
      <form
        onSubmit={handleSubmit}
        className="relative bg-black max-w-[400px] flex flex-col gap-5 text-xl shadow-lg p-8 rounded-lg z-10 mx-auto mt-[40%] sm:mt-[13%]"
      >
        <h2 className="text-center text-3xl font-semibold mb-10">{formName}</h2>
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

        <input
          className="bg-[#00df9a] text-white p-3"
          type="submit"
          value="Submit"
        />
        <button
          className="absolute right-0 top-0 p-3"
          onClick={() => setVisibility(false)}
        >
          <ImCross />
        </button>
      </form>
    </div>
  );
};

export default PopUpForm;
