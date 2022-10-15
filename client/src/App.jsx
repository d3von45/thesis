import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/static/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Activate from "./components/Auth/Activate";

function App() {
  return (
    <div className=" bg-gray-100 h-screen">
      <Navbar />
      <Link to="/auth/login">Login</Link>
      <br />
      <Link to="/auth/register">Register</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/activate/:token" element={<Activate />} />
      </Routes>
    </div>
  );
}

export default App;
