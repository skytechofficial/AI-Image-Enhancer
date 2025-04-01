import axios from "axios";

const API_KEY = "wx3m5prfand83jla2";
const BASE_URL = "https://techhk.aoscdn.com/";
const MAXIMUM_RETRIES = 20;
export const enhancedImageAPI = async (file) => {
  try {
    const taskId = await uploadImage(file);
    const enhancedImageData = await PollForEnhancedImage(taskId);
    return enhancedImageData;
  } catch (error) {
    console.log("Error in enhancing Image : ", error.message);
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);
  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! Task ID not found");
  }
  // "/api/tasks/visual/scale"
  return data.data.task_id;
};
const PollForEnhancedImage = async (taskId, retries = 0) => {
  const result = await fetchEnhancedImage(taskId);
  if (result.state === 4) {
    console.log("Processing...");

    if (MAXIMUM_RETRIES) {
      throw new Error("Max retires reached. Please try again later.");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return PollForEnhancedImage(taskId, retries + 1);
  }
  return result;
};
const fetchEnhancedImage = async (taskId) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  if (!data?.data) {
    throw new Error("Failed to fetch enhanced image! Image not found.");
  }
  return data.data;
  // "/api/tasks/visual/scale/{task_id}"
};

// {status: 200, message: 'success', data: {…}}data: {task_id: 'c250a2c9-44a9-466b-be15-01915ac83698'}message: "success"status: 200[[Prototype]]: Object
