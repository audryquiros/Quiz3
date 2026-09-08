import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

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

export function AuthProvider({ children }) {
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

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}