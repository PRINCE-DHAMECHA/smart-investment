import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import MarketView from "./pages/MarketView";
import Utilities from "./pages/Utilities";
import ProtectedRoute from "./pages/ProtectedRoute";
import ColorPicker from "./pages/ColorPicker";
import BuyStock from "./components/BuyStock";
import Portfolio from "./pages/Portfolio";
import { useAppContext } from "./context/appContext";

function App() {
  const { currentMode } = useAppContext();
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Utilities />
              </ProtectedRoute>
            }
          >
            <Route index element={<Portfolio />}></Route>
            <Route path="marketView" element={<MarketView />}></Route>
            <Route path="themePicker" element={<ColorPicker />}></Route>
            <Route path="buyStock" element={<BuyStock />}></Route>
            <Route path="Portfolio" element={<Portfolio />}></Route>
          </Route>
          <Route path="/color" element={<ColorPicker />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
