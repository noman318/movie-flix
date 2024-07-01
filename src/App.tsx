import Navbar from "./components/NavBar";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Screens/NotFound";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
