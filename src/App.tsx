import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameProvider from "./context/GameProvider";

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
