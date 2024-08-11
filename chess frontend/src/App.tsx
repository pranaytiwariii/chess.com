import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { LandingPage } from "./Pages/LandingPage";
import { Game } from "./Pages/Game";

function App() {

  return (
    <>
    welcome to #homemade chess.com
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
