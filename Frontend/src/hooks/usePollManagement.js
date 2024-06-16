import axios from "axios";
const usePollManagement = () => {
  const getAllPolls = async () => {
    try {
      const response = await axios.get("/api/v1/poll");
      return response.data.polls;
    } catch (error) {
      throw error;
    }
  };
  const getPolls = async (role) => {
    try {
      const response = await axios.get(`/api/v1/poll/${role}`);
      return response.data.polls;
    } catch (error) {
      throw error;
    }
  };
  const createPoll = async (pollData) => {
    try {
      const response = await axios.post("/api/v1/poll", pollData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { getAllPolls, getPolls, createPoll };
};
export default usePollManagement;
