import {
  ListUsers,
  AddUser,
  DeleteUser,
  GeneratePassword,
  EditUser,
} from "../../../wailsjs/go/main/App";

interface User {
  ID: number;
  Name: string;
  Email: string;
  Password: string;
}

interface UserForm {
  Name: string;
  Email: string;
  Password: string;
}

export const allUsers = async (): Promise<User[]> => {
  try {
    return await ListUsers();
  } catch (error) {
    throw new Error("Failed to get posts");
  }
};

export const addUser = async (user: UserForm): Promise<void> => {
  try {
    return await AddUser(user.Name, user.Email, user.Password);
  } catch (error) {
    throw new Error("Failed to get posts");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    return await DeleteUser(id);
  } catch (error) {
    throw new Error("Failed to get posts");
  }
};

export const editUser = async (user: User): Promise<void> => {
  try {
    return await EditUser(user.ID, user.Name, user.Email, user.Password);
  } catch (error) {
    throw new Error("Failed to edit user");
  }
};

export const generatePassword = async () => {
  try {
    return await GeneratePassword();
  } catch (error) {
    console.error("Error generating password:", error);
  }
};
