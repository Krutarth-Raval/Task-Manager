import { API_PATHS } from "./apiPaths";
import { axiosInstance } from "./apiClient";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", //set header for full upload
        },
      }
    );
    return response.data; //return response data
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error; //rethrow error for handling in calling function
  }
};

export default uploadImage;
