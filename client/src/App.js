import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import MarketView from "./pages/MarketView";
import Utilities from "./pages/Utilities";
import ProtectedRoute from "./pages/ProtectedRoute";
import ColorPicker from "./pages/ColorPicker";
import BuyStock from "./components/BuyStock";
import Portfolio from "./pages/Portfolio";
import CreateNote from "./pages/createNote";
import { useAppContext } from "./context/appContext";
import Notes from "./pages/Notes";

function App() {
  const { currentMode } = useAppContext();
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Utilities />}>
            <Route index path="" element={<Landing />} />
            <Route index path="/landing" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ThemePicker" element={<ColorPicker />}></Route>
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Utilities />
              </ProtectedRoute>
            }
          >
            <Route element={<Portfolio />}></Route>
            <Route path="marketView" element={<MarketView />}></Route>
            <Route path="buyStock" element={<BuyStock />}></Route>
            <Route path="Portfolio" element={<Portfolio />}></Route>
            <Route path="createNote" element={<CreateNote />}></Route>
            <Route path="/notes" element={<Notes />}></Route>
          </Route>
          <Route path="/" element={<Utilities />}>
            <Route path="*" element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
