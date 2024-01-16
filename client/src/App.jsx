import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Login, SignUp } from "./Routes";
import Navbar from "./components/Navbar";
import PrivateComponent from "./components/PrivateComponent";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateComponent>
              <Dashboard />
            </PrivateComponent>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
