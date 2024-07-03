import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary";
const HomeScreen = lazy(() => import("./Screens/HomeScreen"));
const NotFound = lazy(() => import("./Screens/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
