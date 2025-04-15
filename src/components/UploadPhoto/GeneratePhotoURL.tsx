import axios from "axios";
import { toast } from "sonner";

const GeneratePhotoURL = async (image: File) => {
  if (!image?.name) {
    toast.error("Please provide an image");
    return null;
  }
  const preset = import.meta.env.VITE_PRESET
  const cloud = import.meta.env.VITE_CLOUD_NAME
  try {
    const newFormData = new FormData();
    newFormData.append("file", image);
    newFormData.append("upload_preset", preset);
    newFormData.append("cloud_name", cloud);

    const response = await axios.post(
      `${import.meta.env.VITE_IMAGE_UPLOAD_URL}`,
      newFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data)
    const imageUrl = response.data.secure_url;
    console.log("Image URL:", imageUrl);
    return imageUrl;
  } catch {
    toast.error("Failed to upload image");
    return null;
  }
};

export default GeneratePhotoURL;
