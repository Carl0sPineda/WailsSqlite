import { useForm } from "react-hook-form";
import { useGetUsers } from "../hooks/queries";
import { useAddUser, useDeleteUser } from "../hooks/mutations";
import PassGeneration from "./PassGeneration";

interface UserForm {
  Name: string;
  Email: string;
  Password: string;
}

const Home = () => {
  const { data: users } = useGetUsers();
  const { register, handleSubmit, reset } = useForm<UserForm>();
  const addUserMutation = useAddUser();
  const deleteUserMutation = useDeleteUser();

  const onSubmit = async (data: UserForm) => {
    try {
      await addUserMutation.mutateAsync(data);
      reset();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
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
          type="password"
          {...register("Password")}
          placeholder="Password"
          autoComplete="off"
        />
        <button className="bg-slate-500 px-1 mt-2 ml-2 text-gray-200">
          Add User
        </button>
      </form>
      {users?.map((user) => (
        <ul key={user.ID} className="mt-4 flex justify-center">
          <li>
            ID {user.ID} - NAME {user.Name} - EMAIL {user.Email}
            <button
              className="bg-slate-500 px-1 ml-2 text-gray-200"
              onClick={() => onDelete(user.ID)}
            >
              Delete
            </button>
          </li>
        </ul>
      ))}
      <PassGeneration />
    </div>
  );
};

export default Home;
