import { useGeneratePassword } from "../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";

const PassGeneration = () => {
  const { data: ramdon_key } = useGeneratePassword();
  const queryClient = useQueryClient();

  const handlePassword = () => {
    queryClient.invalidateQueries({ queryKey: ["generate"] });
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <button
        className="bg-slate-500 px-1 ml-2 text-gray-200"
        onClick={handlePassword}
      >
        Generar contraseña
      </button>
      <span className="block mt-2">{ramdon_key}</span>
    </div>
  );
};

export default PassGeneration;
