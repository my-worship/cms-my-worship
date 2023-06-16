import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { MainCard } from "./MainCard";
import { assets } from "../../constants/assets";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export function ImagePreview(props: IProps) {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  return (
    <>
      <Modal
        open={!!preview}
        onClose={() => setPreview(undefined)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MainCard className={"m-auto"}>
            {preview && (
              <img src={preview} alt={props?.alt ?? "modal_image_preview"} />
            )}
          </MainCard>
        </Box>
      </Modal>
      <img
        style={{
          width: 80,
          height: 80,
        }}
        className={`object-cover border border-transparent  rounded-md ${
          props.src
            ? "hover:scale-105 hover:border-primary-main duration-200 cursor-pointer"
            : ""
        }`}
        onClick={() => props.src && setPreview(props.src)}
        alt={props.alt ?? "imag_my_worship"}
        src={props.src ? props.src : assets.img.default_img}
      />
    </>
  );
}

interface IProps {
  src?: string;
  alt?: string;
}
