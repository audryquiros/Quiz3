import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Home from "../pages/Home/Home.jsx";
import CreateInvoiceForm from "../pages/CreateInvoiceForm/CreateInvoiceForm.jsx";
import InvoiceDetail from "../pages/InvoiceDetail/InvoiceDetail.jsx";
import Login from "../pages/Login/Login.jsx";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard.jsx";

function ProtectedRoute({ children }) {
  const { usuarioActual } = useAuth();
  const location = useLocation();

  if (!usuarioActual) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

function AdminRoute({ children }) {
  const { usuarioActual } = useAuth();

  if (!usuarioActual) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (usuarioActual.rol !== "admin") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

function AppRouter() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/crear"
        element={
          <ProtectedRoute>
            <CreateInvoiceForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/factura/:id"
        element={
          <ProtectedRoute>
            <InvoiceDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AppRouter;