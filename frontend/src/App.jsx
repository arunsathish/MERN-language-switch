import { Routes, Route } from "react-router-dom";
import Pages from "./pages";
import Home from "./pages/Home";
import ProductAll from "./pages/ProductAll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pages />}>
        <Route index element={<Home />} />
        <Route path="product" element={<ProductAll />} />
      </Route>
    </Routes>
  );
}

export default App;
