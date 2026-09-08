import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home/Home.jsx";
import CreateInvoiceForm from "../pages/CreateInvoiceForm/CreateInvoiceForm.jsx";
import InvoiceDetail from "../pages/InvoiceDetail/InvoiceDetail.jsx";

function AppRouter() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/crear"
        element={<CreateInvoiceForm />}
      />

      <Route
        path="/factura/:id"
        element={<InvoiceDetail />}
      />

    </Routes>
  );
}

export default AppRouter;