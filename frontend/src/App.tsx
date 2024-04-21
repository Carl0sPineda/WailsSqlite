import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
