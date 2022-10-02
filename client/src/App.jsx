import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/static/Navbar";

function App() {
  return (
    <div className=" bg-gray-100 h-screen">
      <Navbar />
      <Register />
    </div>
  );
}

export default App;
