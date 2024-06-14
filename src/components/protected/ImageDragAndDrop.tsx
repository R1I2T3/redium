import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
const ImageDragAndDrop = () => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ""
  );
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      // imageSelectCallback(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="w-[100%] h-[220px] md:h-[320px] lg:h-[370px]  flex justify-center items-center  my-10 lg:my-0 border-2"
    >
      <input {...getInputProps()} />
      {previewImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewImage as string}
          alt="This is image"
          className="size-[200px] md:size-[300px] lg:size-[350px] "
        />
      ) : (
        <div className="size-[200px] md:size-[300px] lg:size-[350px] flex justify-center items-center">
          {"Drag and Drop image here for cover image"}
        </div>
      )}
    </div>
  );
};

export default ImageDragAndDrop;
