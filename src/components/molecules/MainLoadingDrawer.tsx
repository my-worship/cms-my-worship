import { Modal } from "@mui/material";
import React from "react";

export function MainLoadingDrawer(props: IProps) {
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={"flex h-screen w-screen items-center justify-center"}>
        <h1>LOADING</h1>
      </div>
    </Modal>
  );
}

interface IProps {
  open: boolean;
}
