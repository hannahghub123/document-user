import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Cover from "./components/cover/Cover";
import Documents from "./components/documents/Documents";
import MyDocuments from "./components/home/mydocument/MyDocuments";
import { ToastContainer } from "react-toastify";
import RegisterOTP from "./components/register/RegisterOTP";
import EmailEnter from "./components/login/EmailEnter";
import ResetPassword from "./components/login/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Cover />} />
            <Route path="documents/" element={<Documents />} />
            <Route path="register/" element={<Register />} />
            <Route path="otp-register/" element={<RegisterOTP />} />
            <Route path="email-enter/" element={<EmailEnter />} />
            <Route path="reset-password/" element={<ResetPassword />} />
            <Route path="login/" element={<Login />} />
            <Route path="home/" element={<Home />} />
            <Route path="mydocuments/" element={<MyDocuments />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
