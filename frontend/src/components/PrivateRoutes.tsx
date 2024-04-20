import { useState } from "react";
import { Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (password === import.meta.env.VITE_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setErrorMessage("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
    }
  };

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <div className="flex flex-col items-center mt-8">
      <h1>Ingresar el código</h1>
      <input
        className="text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Introduce tu contraseña"
      />
      {errorMessage && <p>{errorMessage}</p>}
      <button
        className="bg-slate-500 px-1 py-2 mt-2 ml-2 text-gray-200"
        onClick={handleLogin}
      >
        Ingresa
      </button>
    </div>
  );
};

export default PrivateRoutes;
