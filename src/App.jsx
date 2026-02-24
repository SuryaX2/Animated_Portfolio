import Home from "./pages/Home";
import { useLenis } from "./hooks/useLenis";
import { LenisContext } from "./context/LenisContext";

function App() {
  const lenisRef = useLenis();

  return (
    <LenisContext.Provider value={lenisRef}>
      <div className="min-h-screen">
        <Home />
      </div>
    </LenisContext.Provider>
  );
}

export default App;
