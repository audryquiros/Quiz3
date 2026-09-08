import { BrowserRouter, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/NavBar/NavBar";
import AppRouter from "./routes/AppRouter";

function AppContent() {
  const location = useLocation();

  const mostrarNavbar =
    location.pathname !== "/login";

  return (
    <>
      {mostrarNavbar && <Navbar />}

      <AppRouter />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;