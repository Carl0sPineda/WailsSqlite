import { useForm } from "react-hook-form";
import { useEditUser } from "../hooks/mutations";
import { toast } from "sonner";

interface User {
  ID: number;
  Name: string;
  Email: string;
  Password: string;
}

interface EditProps {
  userId: User;
}

const EditForm = ({ userId }: EditProps) => {
  const editUserMutation = useEditUser();
  const { register, handleSubmit } = useForm<User>({
    defaultValues: userId,
  });

  const onSubmit = async (data: User) => {
    try {
      await editUserMutation.mutateAsync(data);
      toast.success("Datos actualizados con exito");
    } catch (error) {
      toast.error("Ha ocurrido un error");
    }
  };

  return (
    <form
      className="flex flex-col items-center mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="text-black mt-3"
        type="text"
        {...register("Name")}
        placeholder="Name"
        autoComplete="off"
      />
      <input
        className="text-black mt-3"
        type="text"
        {...register("Email")}
        placeholder="Email"
        autoComplete="off"
      />
      <input
        className="text-black mt-3"
        type="text"
        {...register("Password")}
        placeholder="Password"
        autoComplete="off"
      />
      <button className="bg-slate-500 px-1 mt-2 ml-2 text-gray-200">
        Edit User
      </button>
    </form>
  );
};

export default EditForm;
