import axios from "axios";
import { toast } from "sonner";

const GeneratePhotoURL = async (image: File) => {
    if(!image?.name){
        toast.error("Please provide an image");
        return null;
    }
  try {
    const newFormData = new FormData();
    newFormData.append("file", image);
    newFormData.append("upload_preset", "cfzfnkte");
    newFormData.append("cloud_name", "dairs3nkn");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dairs3nkn/image/upload",
      newFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const imageUrl = response.data.url;
    return imageUrl;
  } catch (error) {
    toast.error("Failed to upload image");
    return null;
  }
};

export default GeneratePhotoURL;
