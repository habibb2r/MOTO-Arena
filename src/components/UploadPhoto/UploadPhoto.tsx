/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface UploadPhotoProps {
  fileList: any;
  setFileList: (newFileList: any) => void;
}
const UploadPhoto: React.FC<UploadPhotoProps> = ({ fileList, setFileList }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    const file = selectedFile ? e.target.files : [];
    if (selectedFile) {
      setFileList(file);
      setPreviewUrl(URL.createObjectURL(selectedFile)); 
    }
  };

  return (
    <>
      <div>
        {fileList.length === 0 && (
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-neutral"
            onChange={onChange}
          />
        )}

        {fileList.length && previewUrl  ?(
          <div className="flex justify-start items-center">
            <img
              src={previewUrl}
              alt="Image Preview"
              className="rounded-md h-[150px] shadow-md"
            />

            <button
              onClick={() => {
                setFileList([]);
                setPreviewUrl(null);
              }}
              type="button"
              className="btn border-none btn-sm btn-circle btn-error text-white"
            >
              x
            </button>
          </div>
        ):<></>}
      </div>
    </>
  );
};

export default UploadPhoto;
