import "./App.css";
import { Routes, Route } from "react-router-dom";
import Post from "./pages/Post";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./pages/User.context";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:userId" element={<Post />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
