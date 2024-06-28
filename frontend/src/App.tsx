import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
