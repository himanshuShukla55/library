import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import PopUpForm from "../components/PopUpForm";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const isCreator = user.role === "CREATOR";
  const [books, setBooks] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState();
  const [seeBooks, setSeeBooks] = useState("");
  //* function to fetch books
  const getBooks = async () => {
    try {
      let url = "/api/books";
      if (seeBooks === "new") url += "?new=1";
      else if (seeBooks === "old") url += "?old=1";
      const { data } = await axios.get(url);
      if (data.success) setBooks(data.data);
    } catch (error) {}
  };
  //* function to delete book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/delete/${id}`);
      getBooks();
    } catch (error) {}
  };
  //* function to add new book
  const handleAdd = async (values) => {
    try {
      await axios.post("/api/books", values);
      setShowAddForm(false);
      getBooks();
    } catch (error) {}
  };
  //* function to edit book
  const handleEdit = async (values, id) => {
    try {
      await axios.put(`/api/books/edit/${id}`, values);
      setShowEditForm(false);
      getBooks();
    } catch (error) {}
  };
  useEffect(() => {
    getBooks();
  }, [seeBooks]);
  return (
    <>
      <div className="flex justify-center m-1 p-3 text-xl lg:text-3xl font-semibold items-center gap-36 lg:gap-x-[400px]">
        Dashboard
        {isCreator && (
          <button
            className="bg-[#00df9a] text-white p-3 rounded-lg"
            onClick={() => setShowAddForm(true)}
          >
            Add Book
          </button>
        )}
      </div>
      <div className="flex justify-center p-3 text-md lg:text-2xl items-center">
        <h3>SEE BOOKS:</h3>
        <select
          className="outline-none bg-black text-center border border-gray-200 p-2 rounded-lg lg:ml-[215px]"
          value={seeBooks}
          onChange={({ target: { value } }) => {
            setSeeBooks(value);
          }}
        >
          <option value="">Select an option</option>
          <option value="new">CREATED WITHIN 10 minutes</option>
          <option value="old">CREATED BEFORE 10 minutes</option>
        </select>
      </div>
      {books.length > 0 ? (
        <table className="text-center w-[90%] mx-auto border border-white">
          <thead>
            <tr className="bg-[#00df9a] text-white text-xl lg:text-3xl">
              <th className="p-3">S.No</th>
              <th className="p-3">Book Name</th>
              {isCreator && (
                <>
                  <th className="p-3">Edit</th>
                  <th className="p-3">Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="text-lg lg:text-xl p-5">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{book.name}</td>
                {isCreator && (
                  <>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setBookToEdit({ name: book.name, id: book._id });
                          setShowEditForm(true);
                        }}
                      >
                        <MdEdit />
                      </button>
                    </td>
                    <td className="p-3">
                      <button onClick={() => deleteBook(book._id)}>
                        <MdDelete />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center border border-gray-200 rounded-lg m-5 h-[200px] lg:h-[400px]">
          No Books available
        </div>
      )}
      {showAddForm && (
        <PopUpForm
          formName="Add Book"
          bookName=""
          setVisibility={setShowAddForm}
          handleFormSubmit={handleAdd}
        />
      )}
      {showEditForm && (
        <PopUpForm
          bookId={bookToEdit.id}
          formName="Edit Book"
          bookName={bookToEdit.name}
          setVisibility={setShowEditForm}
          handleFormSubmit={handleEdit}
        />
      )}
    </>
  );
};

export default Dashboard;
