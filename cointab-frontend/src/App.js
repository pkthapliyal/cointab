import "./App.css";
import { Routes, Route } from "react-router-dom";
import Post from "./pages/Post";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:userId" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
