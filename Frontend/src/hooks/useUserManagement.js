import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext.jsx";
const useUserManagement = () => {
  const { login, logout } = useAuth();
  const loginUser = async (userData) => {
    try {
      await axios.post("/api/v1/user/login", userData);
      const token = Cookies.get("accessToken");
      login(token);
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post("/api/v1/user/logout");
      logout();
    } catch (error) {
      throw error;
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await axios.post("/api/v1/user/register", userData);
      console.log(response.data.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (userData) => {
    try {
      console.log("Recieved: ", userData);
      const response = await axios.put(`/api/v1/user`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`/api/v1/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/user`, userId);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    loginUser,
    logoutUser,
    createUser,
    updateUser,
    deleteUser,
    getUser,
  };
};

export default useUserManagement;
