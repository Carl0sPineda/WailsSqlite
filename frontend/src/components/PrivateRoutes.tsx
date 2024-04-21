import { useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schemaPassword = z.object({
  password: z
    .string()
    .min(1, "Este campo es requerido")
    .trim()
    .max(20, "Debe ser menos a 20 caracteres")
    .regex(/^[^<>&]*$/, "Scripts o caracteres especiales no son permitidos"),
});

interface Password {
  password: string;
}

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Password>({
    resolver: zodResolver(schemaPassword),
  });

  const handleLogin = (data: { password: string }) => {
    if (data.password === import.meta.env.VITE_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("Ingreso exitoso");
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <div className="flex flex-col items-center mt-8">
      <h1>Ingresar el código</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          className={`text-black border outline-none ${
            errors.password ? "border-red-500" : ""
          }`}
          type="password"
          {...register("password")}
          placeholder="Introduce tu contraseña"
        />
        {errors.password && (
          <span className="text-red-500 block">{errors.password.message}</span>
        )}
        <button className="bg-slate-500 px-1 py-2 mt-2 ml-2 text-gray-200">
          Ingresa
        </button>
      </form>
    </div>
  );
};

export default PrivateRoutes;
