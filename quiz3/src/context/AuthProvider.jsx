import { useState } from "react";
import AuthContext from "./authContextValue.js";

const usuarios = [
  {
    usuario: "admin",
    contraseña: "admin123",
    rol: "admin",
  },
  {
    usuario: "empleado",
    contraseña: "1234",
    rol: "empleado",
  },
];

function AuthProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const sesionGuardada = sessionStorage.getItem(
      "factuflow_usuario"
    );

    return sesionGuardada
      ? JSON.parse(sesionGuardada)
      : null;
  });

  const login = (usuario, contraseña) => {
    const usuarioEncontrado = usuarios.find(
      (item) =>
        item.usuario === usuario &&
        item.contraseña === contraseña
    );

    if (!usuarioEncontrado) {
      return false;
    }

    const datosUsuario = {
      usuario: usuarioEncontrado.usuario,
      rol: usuarioEncontrado.rol,
    };

    sessionStorage.setItem(
      "factuflow_usuario",
      JSON.stringify(datosUsuario)
    );

    setUsuarioActual(datosUsuario);

    return true;
  };

  const logout = () => {
    sessionStorage.removeItem("factuflow_usuario");
    setUsuarioActual(null);
  };

  const valorContexto = {
    usuarioActual,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valorContexto}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;